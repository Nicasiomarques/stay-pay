/**
 * Data Transfer Objects (DTOs) for Promotions API responses
 * These types represent the raw data structure from the API
 */

export interface DealDTO {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  image: string;
  backgroundColor: string;
  validUntil?: string;
}

export interface TrendingDestinationDTO {
  id: string;
  name: string;
  province: string;
  image: string;
  hotelsCount: number;
  trending: boolean;
}

export interface LastMinuteDealDTO {
  id: number;
  hotelId: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  expiresIn: string;
  expiresAt: string;
}

// API Response types
export interface DealsListResponseDTO {
  deals: DealDTO[];
}

export interface DealDetailResponseDTO {
  deal: DealDTO;
}

export interface TrendingDestinationsResponseDTO {
  destinations: TrendingDestinationDTO[];
}

export interface LastMinuteDealsResponseDTO {
  deals: LastMinuteDealDTO[];
}

export interface LastMinuteDealDetailResponseDTO {
  deal: LastMinuteDealDTO;
}
