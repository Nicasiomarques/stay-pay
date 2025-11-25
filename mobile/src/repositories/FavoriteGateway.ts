import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapFavoritesResponseToFavoritesWithHotels,
  FavoriteWithHotel,
} from '@/mappers';

export const createFavoriteGateway = (httpClient: IHttpClient) => {
  const getUserFavorites = async (): Promise<FavoriteWithHotel[]> => {
    const response = await httpClient.get<DTOs.UserFavoritesResponseDTO>('/users/favorites');
    // Handle empty or undefined favorites
    if (!response.data.favorites || response.data.favorites.length === 0) {
      return [];
    }
    return mapFavoritesResponseToFavoritesWithHotels(response.data.favorites);
  };

  const addFavorite = async (hotelId: number): Promise<{ message: string }> => {
    const response = await httpClient.post<DTOs.AddFavoriteResponseDTO>(
      `/users/favorites/${hotelId}`
    );
    return { message: response.data.message };
  };

  const removeFavorite = async (hotelId: number): Promise<{ message: string }> => {
    const response = await httpClient.delete<DTOs.RemoveFavoriteResponseDTO>(
      `/users/favorites/${hotelId}`
    );
    return { message: response.data.message };
  };

  const toggleFavorite = async (hotelId: number, isFavorite: boolean): Promise<{ message: string }> => {
    if (isFavorite) {
      return removeFavorite(hotelId);
    } else {
      return addFavorite(hotelId);
    }
  };

  return {
    getUserFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};

export type FavoriteGateway = ReturnType<typeof createFavoriteGateway>;
