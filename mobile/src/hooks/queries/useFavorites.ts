/**
 * useFavorites Hook
 * React Query hooks for favorites-related queries and mutations
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { getFavoriteGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { FavoriteWithHotel } from '@/mappers';
import { showToast } from '@/utils';

/**
 * Hook to fetch user's favorite hotels
 */
export const useFavorites = (
  options?: Omit<UseQueryOptions<FavoriteWithHotel[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.favorites.user(),
    queryFn: () => getFavoriteGateway().getUserFavorites(),
    ...options,
  });
};

/**
 * Hook to add a hotel to favorites (mutation)
 */
export const useAddFavorite = (
  options?: Omit<UseMutationOptions<{ message: string }, Error, number>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hotelId: number) => getFavoriteGateway().addFavorite(hotelId),
    onSuccess: () => {
      // Invalidate favorites to refetch updated list
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      showToast.success('Hotel adicionado aos favoritos ❤️');
    },
    onError: () => {
      showToast.error('Não foi possível adicionar aos favoritos');
    },
    ...options,
  });
};

/**
 * Hook to remove a hotel from favorites (mutation)
 */
export const useRemoveFavorite = (
  options?: Omit<UseMutationOptions<{ message: string }, Error, number>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hotelId: number) => getFavoriteGateway().removeFavorite(hotelId),
    onSuccess: () => {
      // Invalidate favorites to refetch updated list
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      showToast.info('Hotel removido dos favoritos');
    },
    onError: () => {
      showToast.error('Não foi possível remover dos favoritos');
    },
    ...options,
  });
};

/**
 * Hook to toggle favorite status with optimistic updates
 */
export const useToggleFavorite = (
  options?: Omit<
    UseMutationOptions<
      { message: string },
      Error,
      { hotelId: number; isFavorite: boolean },
      { previousFavorites: FavoriteWithHotel[] | undefined }
    >,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string },
    Error,
    { hotelId: number; isFavorite: boolean },
    { previousFavorites: FavoriteWithHotel[] | undefined }
  >({
    mutationFn: ({ hotelId, isFavorite }: { hotelId: number; isFavorite: boolean }) =>
      getFavoriteGateway().toggleFavorite(hotelId, isFavorite),
    onMutate: async ({ hotelId, isFavorite }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.user() });

      // Snapshot previous value for rollback
      const previousFavorites = queryClient.getQueryData<FavoriteWithHotel[]>(
        queryKeys.favorites.user()
      );

      // Optimistically update favorites list
      if (previousFavorites) {
        if (isFavorite) {
          // Remove from favorites
          queryClient.setQueryData<FavoriteWithHotel[]>(
            queryKeys.favorites.user(),
            previousFavorites.filter((fav) => fav.hotelId !== hotelId)
          );
        }
      }

      return { previousFavorites };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(queryKeys.favorites.user(), context.previousFavorites);
      }
      showToast.error('Não foi possível atualizar favoritos');
    },
    onSuccess: () => {
      // Refetch to get complete data
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
    },
    ...options,
  });
};
