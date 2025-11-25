/**
 * Filter Types
 * Type definitions for hotel search filters
 */

export interface FilterState {
  priceRange: [number, number];
  propertyTypes: string[];
  amenities: string[];
  minRating: number;
  guestCapacity?: number;
  specialFeatures: string[];
}

export interface QuickFilter {
  id: string;
  label: string;
  filterKey: keyof FilterState;
  value: any;
}

export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  group?: string;
}

export interface PropertyType {
  id: string;
  label: string;
  emoji: string;
}

export interface AmenityCategory {
  id: string;
  label: string;
  amenities: FilterOption[];
}

export const DEFAULT_FILTERS: FilterState = {
  priceRange: [0, 600000],
  propertyTypes: [],
  amenities: [],
  minRating: 0,
  guestCapacity: undefined,
  specialFeatures: [],
};
