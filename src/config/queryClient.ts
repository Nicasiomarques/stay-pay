/**
 * React Query Client Configuration
 * Centralizes all query client settings and default options
 */

import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * Default options for all queries and mutations
 */
const queryConfig: DefaultOptions = {
  queries: {
    // Refetch on window focus
    refetchOnWindowFocus: false,
    // Retry failed requests
    retry: 1,
    // Stale time - how long data stays fresh (5 minutes)
    staleTime: 5 * 60 * 1000,
    // Cache time - how long unused data stays in cache (10 minutes)
    gcTime: 10 * 60 * 1000,
    // Refetch on mount only if stale
    refetchOnMount: 'always',
  },
  mutations: {
    // Retry failed mutations
    retry: 0,
  },
};

/**
 * Create Query Client instance
 */
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

/**
 * Query Keys Factory
 * Centralized location for all query keys to ensure consistency
 */
export const queryKeys = {
  // Hotels
  hotels: {
    all: ['hotels'] as const,
    lists: () => [...queryKeys.hotels.all, 'list'] as const,
    list: (params?: unknown) => [...queryKeys.hotels.lists(), params] as const,
    details: () => [...queryKeys.hotels.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.hotels.details(), id] as const,
    featured: () => [...queryKeys.hotels.all, 'featured'] as const,
    popular: () => [...queryKeys.hotels.all, 'popular'] as const,
    search: (location: string, params?: unknown) =>
      [...queryKeys.hotels.all, 'search', location, params] as const,
    availability: (hotelId: number, checkIn: string, checkOut: string) =>
      [...queryKeys.hotels.all, 'availability', hotelId, checkIn, checkOut] as const,
  },

  // Destinations
  destinations: {
    all: ['destinations'] as const,
  },

  // Bookings
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (params?: unknown) => [...queryKeys.bookings.lists(), params] as const,
    details: () => [...queryKeys.bookings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bookings.details(), id] as const,
    upcoming: () => [...queryKeys.bookings.all, 'upcoming'] as const,
    completed: () => [...queryKeys.bookings.all, 'completed'] as const,
    cancelled: () => [...queryKeys.bookings.all, 'cancelled'] as const,
  },

  // Favorites
  favorites: {
    all: ['favorites'] as const,
    user: () => [...queryKeys.favorites.all, 'user'] as const,
  },

  // Auth
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
} as const;
