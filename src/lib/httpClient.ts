/**
 * HTTP Client abstraction layer
 * Provides a clean interface for making HTTP requests with:
 * - Type safety
 * - Request/Response interceptors
 * - Error handling
 * - Authentication token injection
 */

// Type for query parameters
export type QueryParams = Record<string, string | number | boolean | string[] | undefined>;

export interface RequestConfig extends RequestInit {
  params?: QueryParams;
  timeout?: number;
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface HttpError extends Error {
  status?: number;
  statusText?: string;
  data?: unknown;
}

export type RequestInterceptor = (
  config: RequestConfig
) => RequestConfig | Promise<RequestConfig>;

export type ResponseInterceptor = <T>(
  response: HttpResponse<T>
) => HttpResponse<T> | Promise<HttpResponse<T>>;

export type ErrorInterceptor = (error: HttpError) => Promise<never>;

/**
 * HTTP Client interface
 * Can be implemented by different HTTP clients (fetch, axios, etc.)
 */
export interface IHttpClient {
  get<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;

  setBaseURL(baseURL: string): void;
  setAuthToken(token: string | null): void;
  addRequestInterceptor(interceptor: RequestInterceptor): void;
  addResponseInterceptor(interceptor: ResponseInterceptor): void;
  addErrorInterceptor(interceptor: ErrorInterceptor): void;
}

/**
 * Fetch-based HTTP Client implementation
 */
export class FetchHttpClient implements IHttpClient {
  private baseURL: string = '';
  private authToken: string | null = null;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  constructor(baseURL?: string) {
    if (baseURL) {
      this.baseURL = baseURL;
    }
  }

  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  async get<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'POST', body: JSON.stringify(data) });
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PATCH', body: JSON.stringify(data) });
  }

  async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PUT', body: JSON.stringify(data) });
  }

  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  private async request<T = unknown>(url: string, config: RequestConfig = {}): Promise<HttpResponse<T>> {
    try {
      // Apply request interceptors
      let finalConfig = config;
      for (const interceptor of this.requestInterceptors) {
        finalConfig = await interceptor(finalConfig);
      }

      // Build full URL
      const fullURL = this.buildURL(url, finalConfig.params);

      // Build headers
      const headers = this.buildHeaders(finalConfig.headers);

      // Make request with timeout support
      const response = await this.fetchWithTimeout(fullURL, {
        ...finalConfig,
        headers,
      }, finalConfig.timeout);

      // Parse response
      let data: T;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as T;
      }

      // Check for HTTP errors
      if (!response.ok) {
        const error: HttpError = new Error(response.statusText) as HttpError;
        error.status = response.status;
        error.statusText = response.statusText;
        error.data = data;
        throw error;
      }

      // Build response object
      let httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        httpResponse = await interceptor(httpResponse);
      }

      return httpResponse;
    } catch (error) {
      // Apply error interceptors
      const httpError = this.normalizeError(error);

      for (const interceptor of this.errorInterceptors) {
        await interceptor(httpError);
      }

      throw httpError;
    }
  }

  private buildURL(url: string, params?: QueryParams): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;

    if (!params) {
      return fullURL;
    }

    const queryString = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .flatMap(([key, value]) => {
        // Handle arrays by creating multiple params with the same key
        if (Array.isArray(value)) {
          return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .join('&');

    return queryString ? `${fullURL}?${queryString}` : fullURL;
  }

  private buildHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers(customHeaders);

    // Set default content type if not provided
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Add auth token if available
    if (this.authToken) {
      headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  private async fetchWithTimeout(
    url: string,
    config: RequestInit,
    timeout: number = 30000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private normalizeError(error: unknown): HttpError {
    if (error instanceof Error) {
      const httpError = error as HttpError;
      if (!httpError.status) {
        httpError.status = 0;
        httpError.statusText = 'Network Error';
      }
      return httpError;
    }

    const httpError = new Error('Unknown error occurred') as HttpError;
    httpError.status = 0;
    httpError.statusText = 'Unknown Error';
    return httpError;
  }
}

/**
 * Create a default HTTP client instance
 */
export const createHttpClient = (baseURL?: string): IHttpClient => {
  return new FetchHttpClient(baseURL);
};
