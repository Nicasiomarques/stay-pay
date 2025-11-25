/**
 * Recent Searches Service
 * Manages user search history using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@staygo:recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const RecentSearchesService = {
  /**
   * Get recent searches from storage
   */
  get: async (): Promise<string[]> => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error getting recent searches:', error);
      return [];
    }
  },

  /**
   * Add a new search to recent searches
   * Removes duplicates and limits to MAX_RECENT_SEARCHES
   */
  add: async (search: string): Promise<void> => {
    try {
      if (!search.trim()) return;

      const searches = await RecentSearchesService.get();

      // Remove duplicate if exists
      const filtered = searches.filter(s => s !== search);

      // Add new search at the beginning
      const updated = [search, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error adding recent search:', error);
    }
  },

  /**
   * Clear all recent searches
   */
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  },

  /**
   * Remove a specific search from history
   */
  remove: async (search: string): Promise<void> => {
    try {
      const searches = await RecentSearchesService.get();
      const filtered = searches.filter(s => s !== search);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing recent search:', error);
    }
  },
};
