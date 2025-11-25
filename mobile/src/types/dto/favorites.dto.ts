/**
 * Data Transfer Objects (DTOs) for Favorites API responses
 * These types represent the raw data structure from the API
 */

import { HotelDTO } from './hotels.dto';

export interface FavoriteDTO {
  id: number;
  userId: string;
  hotelId: number;
  addedAt: string;
}

// API Response types
export interface UserFavoritesResponseDTO {
  favorites: Array<{
    id: number;
    userId: string;
    hotelId: number;
    addedAt: string;
    hotel: HotelDTO;
  }>;
}

export interface AddFavoriteResponseDTO {
  favorite: FavoriteDTO;
  message: string;
}

export interface RemoveFavoriteResponseDTO {
  message: string;
}
