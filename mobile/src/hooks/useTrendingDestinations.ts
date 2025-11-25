/**
 * useTrendingDestinations Hook
 * Returns mock trending destinations data
 * In production, this would fetch from API with real trending analytics
 */

import { useMemo } from 'react';

export interface TrendingDestination {
  id: string;
  destination: string;
  country: string;
  hotelCount: number;
  image: string;
  trendPercentage: number;
  averagePrice: number;
}

export function useTrendingDestinations(): TrendingDestination[] {
  return useMemo(() => [
    {
      id: '1',
      destination: 'Luanda',
      country: 'Angola',
      hotelCount: 127,
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop',
      trendPercentage: 45,
      averagePrice: 180000,
    },
    {
      id: '2',
      destination: 'Benguela',
      country: 'Angola',
      hotelCount: 68,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      trendPercentage: 38,
      averagePrice: 120000,
    },
    {
      id: '3',
      destination: 'Lubango',
      country: 'Angola',
      hotelCount: 42,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      trendPercentage: 32,
      averagePrice: 95000,
    },
    {
      id: '4',
      destination: 'Huambo',
      country: 'Angola',
      hotelCount: 35,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      trendPercentage: 28,
      averagePrice: 85000,
    },
  ], []);
}
