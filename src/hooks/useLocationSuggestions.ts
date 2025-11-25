/**
 * useLocationSuggestions Hook
 * Provides autocomplete suggestions for location search
 */

import { useMemo } from 'react';
import { useHotels } from './queries';

export interface LocationSuggestion {
  name: string;
  hotelCount: number;
  type: 'location' | 'popular';
}

export function useLocationSuggestions(query: string): LocationSuggestion[] {
  const { data: hotelsData } = useHotels();
  const hotels = Array.isArray(hotelsData) ? hotelsData : (hotelsData?.hotels || []);

  // Extract unique locations with hotel counts
  const allLocations = useMemo(() => {
    const locationMap = new Map<string, number>();

    hotels.forEach(hotel => {
      const loc = hotel.location;
      if (loc) {
        locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
      }
    });

    return Array.from(locationMap.entries()).map(([name, count]) => ({
      name,
      hotelCount: count,
      type: 'location' as const,
    }));
  }, [hotels]);

  // Filter locations based on query
  const suggestions = useMemo(() => {
    if (!query || query.trim().length === 0) {
      // Return popular locations when no query
      return allLocations
        .sort((a, b) => b.hotelCount - a.hotelCount)
        .slice(0, 8);
    }

    const normalizedQuery = query.toLowerCase().trim();

    // Filter and rank locations
    const filtered = allLocations
      .filter(location =>
        location.name.toLowerCase().includes(normalizedQuery)
      )
      .sort((a, b) => {
        // Prioritize exact starts
        const aStarts = a.name.toLowerCase().startsWith(normalizedQuery);
        const bStarts = b.name.toLowerCase().startsWith(normalizedQuery);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        // Then by hotel count
        return b.hotelCount - a.hotelCount;
      });

    // Limit to 6 suggestions for optimal mobile UX
    return filtered.slice(0, 6);
  }, [query, allLocations]);

  return suggestions;
}
