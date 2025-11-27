/**
 * useRecentlyViewed Hook
 * Manages recently viewed hotels with AsyncStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hotel } from '@types';

const STORAGE_KEY = '@staygo:recently_viewed';
const MAX_ITEMS = 10;

interface RecentlyViewedItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  viewedAt: string;
}

/**
 * Hook to manage recently viewed hotels
 * Persists data in AsyncStorage
 */
export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from AsyncStorage on mount
  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentlyViewedItem[];
        setRecentlyViewed(parsed);
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = async (items: RecentlyViewedItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving recently viewed:', error);
    }
  };

  /**
   * Add a hotel to recently viewed
   * Moves to front if already exists, limits to MAX_ITEMS
   */
  const addRecentlyViewed = useCallback((hotel: Hotel | RecentlyViewedItem) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== hotel.id);

      // Create new item
      const newItem: RecentlyViewedItem = {
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        rating: hotel.rating,
        price: hotel.price,
        viewedAt: new Date().toISOString(),
      };

      // Add to front and limit
      const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);

      // Save to storage
      saveToStorage(updated);

      return updated;
    });
  }, []);

  /**
   * Remove a hotel from recently viewed
   */
  const removeRecentlyViewed = useCallback((hotelId: number) => {
    setRecentlyViewed((prev) => {
      const updated = prev.filter((item) => item.id !== hotelId);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  /**
   * Clear all recently viewed
   */
  const clearRecentlyViewed = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    } catch (error) {
      console.error('Error clearing recently viewed:', error);
    }
  }, []);

  return {
    recentlyViewed,
    isLoading,
    addRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed,
  };
}
