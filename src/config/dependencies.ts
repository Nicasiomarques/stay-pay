/**
 * Dependency Injection Container
 * Creates and manages singleton instances of gateways and services
 */

import { createHttpClient, IHttpClient } from '@/lib/httpClient';
import {
  createHotelGateway,
  createBookingGateway,
  createFavoriteGateway,
  createAuthGateway,
  HotelGateway,
  BookingGateway,
  FavoriteGateway,
  AuthGateway,
} from '@/repositories';

/**
 * Dependency container that holds all singleton instances
 */
class DependencyContainer {
  private static instance: DependencyContainer;

  private _httpClient: IHttpClient | null = null;
  private _hotelGateway: HotelGateway | null = null;
  private _bookingGateway: BookingGateway | null = null;
  private _favoriteGateway: FavoriteGateway | null = null;
  private _authGateway: AuthGateway | null = null;

  private constructor() {}

  /**
   * Get singleton instance of DependencyContainer
   */
  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  /**
   * Get or create HTTP Client
   */
  get httpClient(): IHttpClient {
    if (!this._httpClient) {
      // Base URL is /api to work with MirageJS namespace
      this._httpClient = createHttpClient('/api');
    }
    return this._httpClient;
  }

  /**
   * Set custom HTTP Client (useful for testing)
   */
  setHttpClient(httpClient: IHttpClient): void {
    this._httpClient = httpClient;
    // Reset gateways when HTTP client changes
    this._hotelGateway = null;
    this._bookingGateway = null;
    this._favoriteGateway = null;
    this._authGateway = null;
  }

  /**
   * Get or create Hotel Gateway
   */
  get hotelGateway(): HotelGateway {
    if (!this._hotelGateway) {
      this._hotelGateway = createHotelGateway(this.httpClient);
    }
    return this._hotelGateway;
  }

  /**
   * Get or create Booking Gateway
   */
  get bookingGateway(): BookingGateway {
    if (!this._bookingGateway) {
      this._bookingGateway = createBookingGateway(this.httpClient);
    }
    return this._bookingGateway;
  }

  /**
   * Get or create Favorite Gateway
   */
  get favoriteGateway(): FavoriteGateway {
    if (!this._favoriteGateway) {
      this._favoriteGateway = createFavoriteGateway(this.httpClient);
    }
    return this._favoriteGateway;
  }

  /**
   * Get or create Auth Gateway
   */
  get authGateway(): AuthGateway {
    if (!this._authGateway) {
      this._authGateway = createAuthGateway(this.httpClient);
    }
    return this._authGateway;
  }

  /**
   * Reset all gateways (useful for testing or logout)
   */
  reset(): void {
    this._httpClient = null;
    this._hotelGateway = null;
    this._bookingGateway = null;
    this._favoriteGateway = null;
    this._authGateway = null;
  }
}

// Export singleton instance
export const dependencies = DependencyContainer.getInstance();

// Export convenience getters for direct access
export const getHotelGateway = () => dependencies.hotelGateway;
export const getBookingGateway = () => dependencies.bookingGateway;
export const getFavoriteGateway = () => dependencies.favoriteGateway;
export const getAuthGateway = () => dependencies.authGateway;
export const getHttpClient = () => dependencies.httpClient;
