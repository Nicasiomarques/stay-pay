/**
 * Favorite Mapper
 * Transforms API DTOs to domain models used in components
 */

import { Hotel } from '@/types';
import { HotelDTO } from '@/types/dto';
import { mapHotelDTOToHotel } from './hotelMapper';

/**
 * Favorite with hotel details
 */
export interface FavoriteWithHotel {
  id: number;
  hotelId: number;
  addedAt: string;
  hotel: Hotel;
}

/**
 * Maps API favorite response to FavoriteWithHotel
 */
export const mapFavoriteResponseToFavoriteWithHotel = (favorite: {
  id: number;
  userId: string;
  hotelId: number;
  addedAt: string;
  hotel: HotelDTO;
}): FavoriteWithHotel => {
  return {
    id: favorite.id,
    hotelId: favorite.hotelId,
    addedAt: favorite.addedAt,
    hotel: mapHotelDTOToHotel(favorite.hotel),
  };
};

/**
 * Maps an array of favorites
 */
export const mapFavoritesResponseToFavoritesWithHotels = (
  favorites: Array<{
    id: number;
    userId: string;
    hotelId: number;
    addedAt: string;
    hotel: HotelDTO;
  }>
): FavoriteWithHotel[] => {
  return favorites.map(mapFavoriteResponseToFavoriteWithHotel);
};
