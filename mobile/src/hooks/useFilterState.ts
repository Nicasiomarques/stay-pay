/**
 * useFilterState Hook
 * Manages filter state with helper functions
 */

import { useState, useCallback, useMemo } from 'react';
import { FilterState, DEFAULT_FILTERS } from '@/types/filters';

export function useFilterState(initialFilters?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleArrayFilter = useCallback((
    key: 'propertyTypes' | 'amenities' | 'specialFeatures',
    value: string
  ) => {
    setFilters(prev => {
      const array = prev[key];
      const exists = array.includes(value);

      return {
        ...prev,
        [key]: exists
          ? array.filter(item => item !== value)
          : [...array, value],
      };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;

    // Price range (not default)
    if (filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
        filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) {
      count++;
    }

    // Property types
    count += filters.propertyTypes.length;

    // Amenities
    count += filters.amenities.length;

    // Rating
    if (filters.minRating > 0) count++;

    // Guest capacity
    if (filters.guestCapacity) count++;

    // Special features
    count += filters.specialFeatures.length;

    return count;
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return activeFiltersCount > 0;
  }, [activeFiltersCount]);

  return {
    filters,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    activeFiltersCount,
    hasActiveFilters,
  };
}
