/**
 * useHotels Hook
 * React Query hooks for hotel-related queries
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getHotelGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { Hotel } from '@/types';
import { HotelsSearchParamsDTO } from '@/types/dto';

/**
 * Hook to fetch hotels list with optional filters
 */
export const useHotels = (
  params?: HotelsSearchParamsDTO,
  options?: Omit<UseQueryOptions<{ hotels: Hotel[]; meta?: any }>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.hotels.list(params),
    queryFn: () => getHotelGateway().getHotels(params),
    ...options,
  });
};

/**
 * Hook to fetch single hotel by ID
 */
export const useHotel = (
  id: number,
  options?: Omit<UseQueryOptions<Hotel>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.hotels.detail(id),
    queryFn: () => getHotelGateway().getHotelById(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * Hook to fetch featured hotels
 */
export const useFeaturedHotels = (
  options?: Omit<UseQueryOptions<Hotel[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.hotels.featured(),
    queryFn: () => getHotelGateway().getFeaturedHotels(),
    ...options,
  });
};

/**
 * Hook to fetch popular hotels
 */
export const usePopularHotels = (
  options?: Omit<UseQueryOptions<Hotel[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.hotels.popular(),
    queryFn: () => getHotelGateway().getPopularHotels(),
    ...options,
  });
};

/**
 * Hook to search hotels by location
 */
export const useSearchHotels = (
  location: string,
  otherParams?: Omit<HotelsSearchParamsDTO, 'location'>,
  options?: Omit<UseQueryOptions<Hotel[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.hotels.search(location, otherParams),
    queryFn: () => getHotelGateway().searchHotels(location, otherParams),
    enabled: !!location,
    ...options,
  });
};

/**
 * Hook to check room availability
 */
export const useRoomAvailability = (
  hotelId: number,
  checkIn: string,
  checkOut: string,
  guests: number,
  options?: Omit<UseQueryOptions<{ available: boolean; rooms: any[] }>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.hotels.availability(hotelId, checkIn, checkOut),
    queryFn: () =>
      getHotelGateway().checkRoomAvailability({
        hotelId,
        checkIn,
        checkOut,
        guests,
      }),
    enabled: !!hotelId && !!checkIn && !!checkOut,
    ...options,
  });
};
