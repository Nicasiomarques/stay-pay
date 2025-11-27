/**
 * Dependency Injection Container for React Native
 * Creates and manages singleton instances of gateways and services
 */

import { createHttpClient, IHttpClient } from '@/lib/httpClient';
import {
  createHotelGateway,
  createBookingGateway,
  createFavoriteGateway,
  createAuthGateway,
  createPromotionGateway,
  createProfileGateway,
  createNotificationGateway,
  createReviewGateway,
  createPaymentGateway,
  HotelGateway,
  BookingGateway,
  FavoriteGateway,
  AuthGateway,
  PromotionGateway,
  ProfileGateway,
  NotificationGateway,
  ReviewGateway,
  PaymentGateway,
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
  private _promotionGateway: PromotionGateway | null = null;
  private _profileGateway: ProfileGateway | null = null;
  private _notificationGateway: NotificationGateway | null = null;
  private _reviewGateway: ReviewGateway | null = null;
  private _paymentGateway: PaymentGateway | null = null;

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
      // In React Native, MirageJS runs on the same domain
      this._httpClient = createHttpClient('/api');

      // Set demo token for development (MirageJS)
      // In production, this would be handled by the auth flow
      if (__DEV__) {
        this._httpClient.setAuthToken('demo_token_123');
      }
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
    this._promotionGateway = null;
    this._profileGateway = null;
    this._notificationGateway = null;
    this._reviewGateway = null;
    this._paymentGateway = null;
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
   * Get or create Promotion Gateway
   */
  get promotionGateway(): PromotionGateway {
    if (!this._promotionGateway) {
      this._promotionGateway = createPromotionGateway(this.httpClient);
    }
    return this._promotionGateway;
  }

  /**
   * Get or create Profile Gateway
   */
  get profileGateway(): ProfileGateway {
    if (!this._profileGateway) {
      this._profileGateway = createProfileGateway(this.httpClient);
    }
    return this._profileGateway;
  }

  /**
   * Get or create Notification Gateway
   */
  get notificationGateway(): NotificationGateway {
    if (!this._notificationGateway) {
      this._notificationGateway = createNotificationGateway(this.httpClient);
    }
    return this._notificationGateway;
  }

  /**
   * Get or create Review Gateway
   */
  get reviewGateway(): ReviewGateway {
    if (!this._reviewGateway) {
      this._reviewGateway = createReviewGateway(this.httpClient);
    }
    return this._reviewGateway;
  }

  /**
   * Get or create Payment Gateway
   */
  get paymentGateway(): PaymentGateway {
    if (!this._paymentGateway) {
      this._paymentGateway = createPaymentGateway(this.httpClient);
    }
    return this._paymentGateway;
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
    this._promotionGateway = null;
    this._profileGateway = null;
    this._notificationGateway = null;
    this._reviewGateway = null;
    this._paymentGateway = null;
  }
}

// Export singleton instance
export const dependencies = DependencyContainer.getInstance();

// Export convenience getters for direct access
export const getHotelGateway = () => dependencies.hotelGateway;
export const getBookingGateway = () => dependencies.bookingGateway;
export const getFavoriteGateway = () => dependencies.favoriteGateway;
export const getAuthGateway = () => dependencies.authGateway;
export const getPromotionGateway = () => dependencies.promotionGateway;
export const getProfileGateway = () => dependencies.profileGateway;
export const getNotificationGateway = () => dependencies.notificationGateway;
export const getReviewGateway = () => dependencies.reviewGateway;
export const getPaymentGateway = () => dependencies.paymentGateway;
export const getHttpClient = () => dependencies.httpClient;
