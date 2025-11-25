/**
 * useDestinations Hook
 * React Query hook for destinations queries
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getHotelGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { Destination } from '@/mappers';

/**
 * Hook to fetch popular destinations
 */
export const useDestinations = (
  options?: Omit<UseQueryOptions<Destination[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.destinations.all,
    queryFn: () => getHotelGateway().getDestinations(),
    ...options,
  });
};
