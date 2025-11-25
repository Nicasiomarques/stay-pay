/**
 * Filter Types
 * Type definitions for hotel search filters
 */

export interface FilterState {
  destinationType: string | null;
  priceRange: [number, number];
  propertyTypes: string[];
  amenities: string[];
  minRating: number;
  rooms: number;
  beds: number;
  guestCapacity?: number;
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
  destinationType: null,
  priceRange: [20, 680],
  propertyTypes: [],
  amenities: [],
  minRating: 0,
  rooms: 2,
  beds: 2,
  guestCapacity: undefined,
};
