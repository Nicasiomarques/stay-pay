/**
 * useBookings Hook
 * React Query hooks for booking-related queries and mutations
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  BookingDetail,
  BookingListItem,
  CreateBookingParams,
  mapCreateBookingParamsToDTO,
} from "@/mappers";
import { getBookingGateway } from "@/config/dependencies";
import { UserBookingsParamsDTO } from "@/types/dto";
import { queryKeys } from "@/config/queryClient";

/**
 * Hook to fetch user's bookings
 */
export const useBookings = (
  params?: UserBookingsParamsDTO,
  options?: Omit<
    UseQueryOptions<{ bookings: BookingListItem[]; meta?: any }>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: queryKeys.bookings.list(params),
    queryFn: () => getBookingGateway().getUserBookings(params),
    ...options,
  });
};

/**
 * Hook to fetch single booking by ID
 */
export const useBooking = (
  bookingId: string,
  options?: Omit<UseQueryOptions<BookingDetail>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: queryKeys.bookings.detail(bookingId),
    queryFn: () => getBookingGateway().getBookingById(bookingId),
    enabled: !!bookingId,
    ...options,
  });
};

/**
 * Hook to create a new booking
 */
export const useCreateBooking = (
  options?: UseMutationOptions<
    { booking: BookingDetail; message: string },
    Error,
    CreateBookingParams
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateBookingParams) => {
      const dto = mapCreateBookingParamsToDTO(params);
      return getBookingGateway().createBooking(dto);
    },
    onSuccess: () => {
      // Invalidate bookings queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
    },
    ...options,
  });
};

/**
 * Hook to cancel a booking
 */
export const useCancelBooking = (
  options?: UseMutationOptions<
    { booking: BookingDetail; message: string },
    Error,
    string
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) =>
      getBookingGateway().cancelBooking(bookingId),
    onSuccess: (data, bookingId) => {
      // Update specific booking in cache
      queryClient.setQueryData(
        queryKeys.bookings.detail(bookingId),
        data.booking
      );
      // Invalidate bookings list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.lists() });
    },
    ...options,
  });
};

/**
 * Hook to fetch upcoming bookings
 */
export const useUpcomingBookings = (
  options?: Omit<
    UseQueryOptions<{ bookings: BookingListItem[]; meta?: any }>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: queryKeys.bookings.upcoming(),
    queryFn: () => getBookingGateway().getUserBookings({ status: "upcoming" }),
    ...options,
  });
};

/**
 * Hook to fetch completed bookings
 */
export const useCompletedBookings = (
  options?: Omit<
    UseQueryOptions<{ bookings: BookingListItem[]; meta?: any }>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: queryKeys.bookings.completed(),
    queryFn: () => getBookingGateway().getUserBookings({ status: "completed" }),
    ...options,
  });
};

/**
 * Hook to fetch cancelled bookings
 */
export const useCancelledBookings = (
  options?: Omit<
    UseQueryOptions<{ bookings: BookingListItem[]; meta?: any }>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: queryKeys.bookings.cancelled(),
    queryFn: () => getBookingGateway().getUserBookings({ status: "cancelled" }),
    ...options,
  });
};
