import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapBookingDTOToBookingDetail,
  mapBookingListDTOsToBookingListItems,
  BookingDetail,
  BookingListItem,
} from '@/mappers';

export const createBookingGateway = (httpClient: IHttpClient) => {
  const getUserBookings = async (params?: DTOs.UserBookingsParamsDTO): Promise<{
    bookings: BookingListItem[];
    meta?: {
      total: number;
      upcoming: number;
      completed: number;
      cancelled: number;
    };
  }> => {
    const response = await httpClient.get<DTOs.UserBookingsResponseDTO>('/users/bookings', {
      params: params as Record<string, string | number | boolean | undefined>,
    });

    return {
      bookings: mapBookingListDTOsToBookingListItems(response.data.bookings),
      meta: response.data.meta,
    };
  };

  const getBookingById = async (bookingId: string): Promise<BookingDetail> => {
    const response = await httpClient.get<DTOs.BookingDetailResponseDTO>(`/bookings/${bookingId}`);
    return mapBookingDTOToBookingDetail(response.data.booking);
  };

  const createBooking = async (bookingData: DTOs.CreateBookingRequestDTO): Promise<{
    booking: BookingDetail;
    message: string;
  }> => {
    const response = await httpClient.post<DTOs.CreateBookingResponseDTO>(
      '/bookings',
      bookingData
    );

    return {
      booking: mapBookingDTOToBookingDetail(response.data.booking),
      message: response.data.message,
    };
  };

  const cancelBooking = async (bookingId: string): Promise<{
    booking: BookingDetail;
    message: string;
  }> => {
    const response = await httpClient.patch<DTOs.CancelBookingResponseDTO>(`/bookings/${bookingId}/cancel`);

    return {
      booking: mapBookingDTOToBookingDetail(response.data.booking),
      message: response.data.message,
    };
  };

  return {
    getUserBookings,
    getBookingById,
    createBooking,
    cancelBooking,
  };
};

export type BookingGateway = ReturnType<typeof createBookingGateway>;
