/**
 * Data Transfer Objects (DTOs) for Hotel API responses
 * These types represent the raw data structure from the API
 */

export interface RoomDTO {
  id: string;
  type: string;
  price: number;
  capacity: number;
  available?: boolean;
  remainingRooms?: number;
}

export interface HotelDTO {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  image: string;
  description: string;
  amenities: string[];
  images: string[];
  rooms: RoomDTO[];
  category: string;
}

export interface DestinationDTO {
  name: string;
  hotelCount: number;
  image: string;
}

// API Response types
export interface HotelsListResponseDTO {
  hotels: HotelDTO[];
  meta?: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface HotelDetailResponseDTO {
  hotel: HotelDTO;
}

export interface FeaturedHotelsResponseDTO {
  hotels: HotelDTO[];
}

export interface PopularHotelsResponseDTO {
  hotels: HotelDTO[];
}

export interface DestinationsResponseDTO {
  destinations: DestinationDTO[];
}

export interface RoomAvailabilityResponseDTO {
  available: boolean;
  rooms: RoomDTO[];
}

// API Request types
export interface HotelsSearchParamsDTO {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  categories?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'distance';
  page?: number;
  perPage?: number;
}

export interface RoomAvailabilityParamsDTO {
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}
