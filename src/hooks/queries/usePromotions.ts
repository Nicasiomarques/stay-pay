/**
 * usePromotions Hook
 * React Query hooks for promotion-related queries
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPromotionGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { Deal, TrendingDestination, LastMinuteDeal } from '@/types';
import { TrendingDestinationsParams } from '@/repositories/PromotionGateway';

/**
 * Hook to fetch special deals
 */
export const useDeals = (
  limit?: number,
  options?: Omit<UseQueryOptions<Deal[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.promotions.deals(limit),
    queryFn: () => getPromotionGateway().getDeals(limit),
    ...options,
  });
};

/**
 * Hook to fetch trending destinations
 */
export const useTrendingDestinations = (
  params?: TrendingDestinationsParams,
  options?: Omit<UseQueryOptions<TrendingDestination[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.promotions.trendingDestinations(params),
    queryFn: () => getPromotionGateway().getTrendingDestinations(params),
    ...options,
  });
};

/**
 * Hook to fetch last minute deals
 * Refetches more frequently since deals expire
 */
export const useLastMinuteDeals = (
  limit?: number,
  options?: Omit<UseQueryOptions<LastMinuteDeal[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.promotions.lastMinuteDeals(limit),
    queryFn: () => getPromotionGateway().getLastMinuteDeals(limit),
    // Refetch more frequently since deals expire
    staleTime: 60 * 1000, // 1 minute
    ...options,
  });
};
