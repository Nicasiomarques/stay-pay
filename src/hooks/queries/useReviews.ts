/**
 * useReviews Hook
 * React Query hooks for review queries and mutations
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getReviewGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { HotelReviews } from '@/mappers';
import {
  GetReviewsParams,
  CreateReviewData,
  CreateReviewResult,
  MarkHelpfulResult,
} from '@/repositories/ReviewGateway';
import { showToast } from '@/utils';

/**
 * Hook to fetch hotel reviews
 */
export const useHotelReviews = (
  hotelId: number,
  params?: GetReviewsParams,
  options?: Omit<UseQueryOptions<HotelReviews>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.reviews.hotel(hotelId, params),
    queryFn: () => getReviewGateway().getHotelReviews(hotelId, params),
    enabled: hotelId > 0,
    ...options,
  });
};

/**
 * Hook to create a review
 */
export const useCreateReview = (
  hotelId: number,
  options?: UseMutationOptions<CreateReviewResult, Error, CreateReviewData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewData) => getReviewGateway().createReview(hotelId, data),
    onSuccess: () => {
      // Invalidate reviews queries for this hotel
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.hotel(hotelId) });
      // Also invalidate hotel detail to update rating
      queryClient.invalidateQueries({ queryKey: queryKeys.hotels.detail(hotelId) });
      showToast.success('Avaliação enviada com sucesso');
    },
    onError: () => {
      showToast.error('Erro ao enviar avaliação');
    },
    ...options,
  });
};

/**
 * Hook to mark a review as helpful
 */
export const useMarkReviewHelpful = (
  hotelId: number,
  options?: UseMutationOptions<MarkHelpfulResult, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => getReviewGateway().markReviewHelpful(reviewId),
    onSuccess: () => {
      // Invalidate reviews queries for this hotel
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.hotel(hotelId) });
    },
    onError: () => {
      showToast.error('Erro ao marcar avaliação como útil');
    },
    ...options,
  });
};
