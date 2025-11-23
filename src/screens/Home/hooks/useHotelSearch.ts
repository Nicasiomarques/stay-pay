import { useState, useCallback } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

/**
 * Custom hook for managing hotel search functionality
 * Screen-specific for Home screen
 */
export function useHotelSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query to prevent excessive filtering
  const debouncedQuery = useDebounce(searchQuery, 300);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    debouncedQuery,
    isSearching,
    handleSearch,
    clearSearch,
  };
}
