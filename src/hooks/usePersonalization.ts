/**
 * usePersonalization Hook
 * Manages user personalization data and recommendations
 * Uses AsyncStorage for persistence across sessions
 */

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  FIRST_VISIT: '@staygo:first_visit',
  SEARCH_HISTORY: '@staygo:search_history',
  LAST_SEARCH: '@staygo:last_search',
  FAVORITE_LOCATIONS: '@staygo:favorite_locations',
};

export interface SearchHistoryItem {
  location: string;
  guests: number;
  timestamp: number;
}

export interface PersonalizationData {
  isFirstVisit: boolean;
  lastSearch?: SearchHistoryItem;
  searchHistory: SearchHistoryItem[];
  favoriteLocations: string[];
  recommendedDestination?: string;
}

export function usePersonalization() {
  const [data, setData] = useState<PersonalizationData>({
    isFirstVisit: true,
    searchHistory: [],
    favoriteLocations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load personalization data on mount
  useEffect(() => {
    loadPersonalizationData();
  }, []);

  const loadPersonalizationData = async () => {
    try {
      const [firstVisit, searchHistory, lastSearch, favoriteLocations] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.FIRST_VISIT),
        AsyncStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY),
        AsyncStorage.getItem(STORAGE_KEYS.LAST_SEARCH),
        AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_LOCATIONS),
      ]);

      const isFirstVisit = firstVisit === null;
      const parsedHistory: SearchHistoryItem[] = searchHistory ? JSON.parse(searchHistory) : [];
      const parsedLastSearch: SearchHistoryItem | undefined = lastSearch ? JSON.parse(lastSearch) : undefined;
      const parsedFavorites: string[] = favoriteLocations ? JSON.parse(favoriteLocations) : [];

      // If first visit, mark as visited
      if (isFirstVisit) {
        await AsyncStorage.setItem(STORAGE_KEYS.FIRST_VISIT, 'false');
      }

      // Get recommended destination based on history
      const recommendedDestination = getRecommendedDestination(parsedHistory, parsedFavorites);

      setData({
        isFirstVisit,
        lastSearch: parsedLastSearch,
        searchHistory: parsedHistory,
        favoriteLocations: parsedFavorites,
        recommendedDestination,
      });
    } catch (error) {
      console.error('Error loading personalization data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSearchToHistory = async (location: string, guests: number) => {
    try {
      const newSearch: SearchHistoryItem = {
        location,
        guests,
        timestamp: Date.now(),
      };

      // Update last search
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_SEARCH, JSON.stringify(newSearch));

      // Update search history (keep last 10)
      const updatedHistory = [newSearch, ...data.searchHistory].slice(0, 10);
      await AsyncStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updatedHistory));

      // Update state
      setData(prev => ({
        ...prev,
        lastSearch: newSearch,
        searchHistory: updatedHistory,
        recommendedDestination: getRecommendedDestination(updatedHistory, prev.favoriteLocations),
      }));
    } catch (error) {
      console.error('Error adding search to history:', error);
    }
  };

  const addFavoriteLocation = async (location: string) => {
    try {
      const updatedFavorites = [...new Set([...data.favoriteLocations, location])];
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_LOCATIONS, JSON.stringify(updatedFavorites));

      setData(prev => ({
        ...prev,
        favoriteLocations: updatedFavorites,
        recommendedDestination: getRecommendedDestination(prev.searchHistory, updatedFavorites),
      }));
    } catch (error) {
      console.error('Error adding favorite location:', error);
    }
  };

  const clearPersonalizationData = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY),
        AsyncStorage.removeItem(STORAGE_KEYS.LAST_SEARCH),
        AsyncStorage.removeItem(STORAGE_KEYS.FAVORITE_LOCATIONS),
      ]);

      setData({
        isFirstVisit: false,
        searchHistory: [],
        favoriteLocations: [],
      });
    } catch (error) {
      console.error('Error clearing personalization data:', error);
    }
  };

  return {
    ...data,
    isLoading,
    addSearchToHistory,
    addFavoriteLocation,
    clearPersonalizationData,
  };
}

/**
 * Simple rule-based recommendation algorithm
 * In production, this would be ML-based
 */
function getRecommendedDestination(
  history: SearchHistoryItem[],
  favorites: string[]
): string | undefined {
  // Priority 1: Most searched location in last 30 days
  const recentSearches = history.filter(
    item => Date.now() - item.timestamp < 30 * 24 * 60 * 60 * 1000
  );

  if (recentSearches.length > 0) {
    const locationCounts = new Map<string, number>();
    recentSearches.forEach(search => {
      locationCounts.set(search.location, (locationCounts.get(search.location) || 0) + 1);
    });

    const mostSearched = Array.from(locationCounts.entries())
      .sort((a, b) => b[1] - a[1])[0];

    if (mostSearched) {
      return mostSearched[0];
    }
  }

  // Priority 2: Favorite location
  if (favorites.length > 0) {
    return favorites[Math.floor(Math.random() * favorites.length)];
  }

  // Priority 3: No recommendation
  return undefined;
}
