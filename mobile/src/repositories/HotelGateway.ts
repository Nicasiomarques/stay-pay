import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapHotelDTOsToHotels,
  mapHotelDTOToHotel,
  mapDestinationDTOsToDestinations,
  Destination,
} from '@/mappers';
import { Hotel, Room } from '@/types';

export const createHotelGateway = (httpClient: IHttpClient) => {
  const getHotels = async (params?: DTOs.HotelsSearchParamsDTO): Promise<{
    hotels: Hotel[];
    meta?: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    };
  }> => {
    const response = await httpClient.get<DTOs.HotelsListResponseDTO>('/hotels', {
      params: params ? { ...params } : undefined,
    });

    return {
      hotels: mapHotelDTOsToHotels(response.data.hotels),
      meta: response.data.meta,
    };
  };

  const getHotelById = async (id: number): Promise<Hotel> => {
    const response = await httpClient.get<DTOs.HotelDetailResponseDTO>(`/hotels/${id}`);
    return mapHotelDTOToHotel(response.data.hotel);
  };

  const getFeaturedHotels = async (): Promise<Hotel[]> => {
    const response = await httpClient.get<DTOs.FeaturedHotelsResponseDTO>('/hotels/featured');
    return mapHotelDTOsToHotels(response.data.hotels);
  };

  const getPopularHotels = async (): Promise<Hotel[]> => {
    const response = await httpClient.get<DTOs.PopularHotelsResponseDTO>('/hotels/popular');
    return mapHotelDTOsToHotels(response.data.hotels);
  };

  const getDestinations = async (): Promise<Destination[]> => {
    const response = await httpClient.get<DTOs.DestinationsResponseDTO>('/destinations');
    return mapDestinationDTOsToDestinations(response.data.destinations);
  };

  const checkRoomAvailability = async (params: DTOs.RoomAvailabilityParamsDTO): Promise<{
    available: boolean;
    rooms: Room[];
  }> => {
    const response = await httpClient.get<DTOs.RoomAvailabilityResponseDTO>(
      `/hotels/${params.hotelId}/rooms/availability`,
      {
        params: {
          checkIn: params.checkIn,
          checkOut: params.checkOut,
          guests: params.guests,
        },
      }
    );

    return {
      available: response.data.available,
      rooms: response.data.rooms.map((room: DTOs.RoomDTO) => ({
        id: room.id,
        type: room.type,
        price: room.price,
        capacity: room.capacity,
      })),
    };
  };

  const searchHotels = async (
    location: string,
    otherParams?: Omit<DTOs.HotelsSearchParamsDTO, 'location'>
  ): Promise<Hotel[]> => {
    const response = await httpClient.get<DTOs.HotelsListResponseDTO>('/hotels', {
      params: {
        location,
        ...otherParams,
      },
    });

    return mapHotelDTOsToHotels(response.data.hotels);
  };

  return {
    getHotels,
    getHotelById,
    getFeaturedHotels,
    getPopularHotels,
    getDestinations,
    checkRoomAvailability,
    searchHotels,
  };
};

export type HotelGateway = ReturnType<typeof createHotelGateway>;
