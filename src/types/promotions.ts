/**
 * Domain types for promotions
 * These are the clean types used in the UI components
 */

export interface Deal {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  image: string;
  backgroundColor: string;
  validUntil?: Date;
}

export interface TrendingDestination {
  id: string;
  name: string;
  province: string;
  image: string;
  hotelsCount: number;
  trending: boolean;
}

export interface LastMinuteDeal {
  id: number;
  hotelId: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  expiresIn: string;
}
