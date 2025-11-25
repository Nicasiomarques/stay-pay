/**
 * Filter Constants
 * Predefined filter options and categories
 */

import { PropertyType, AmenityCategory, QuickFilter } from '@/types/filters';

export const PROPERTY_TYPES: PropertyType[] = [
  { id: 'luxury', label: 'Luxury', emoji: '👑' },
  { id: 'resort', label: 'Resort', emoji: '🏖️' },
  { id: 'business', label: 'Business', emoji: '🏢' },
  { id: 'budget', label: 'Budget', emoji: '💰' },
  { id: 'boutique', label: 'Boutique', emoji: '✨' },
];

export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: 'essentials',
    label: 'Essentials',
    amenities: [
      { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
      { id: 'parking', label: 'Parking', icon: 'car' },
      { id: 'air-conditioning', label: 'Air Conditioning', icon: 'wind' },
    ],
  },
  {
    id: 'leisure',
    label: 'Leisure',
    amenities: [
      { id: 'pool', label: 'Pool', icon: 'waves' },
      { id: 'gym', label: 'Gym', icon: 'dumbbell' },
      { id: 'spa', label: 'Spa', icon: 'sparkles' },
      { id: 'beach', label: 'Beach Access', icon: 'palm-tree' },
    ],
  },
  {
    id: 'dining',
    label: 'Dining',
    amenities: [
      { id: 'restaurant', label: 'Restaurant', icon: 'utensils' },
      { id: 'bar', label: 'Bar', icon: 'wine' },
      { id: 'room-service', label: 'Room Service', icon: 'concierge-bell' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    amenities: [
      { id: 'concierge', label: 'Concierge', icon: 'bell-concierge' },
      { id: 'laundry', label: 'Laundry', icon: 'shirt' },
      { id: 'airport-shuttle', label: 'Airport Shuttle', icon: 'plane' },
    ],
  },
];

export const SPECIAL_FEATURES = [
  { id: 'pet-friendly', label: 'Pet Friendly', icon: 'dog' },
  { id: 'family-friendly', label: 'Family Friendly', icon: 'users' },
  { id: 'romantic', label: 'Romantic', icon: 'heart' },
  { id: 'eco-friendly', label: 'Eco Friendly', icon: 'leaf' },
];

export const QUICK_FILTERS: QuickFilter[] = [
  { id: 'beach', label: 'Beach Access', filterKey: 'amenities', value: ['beach'] },
  { id: 'top-rated', label: '4+ Stars', filterKey: 'minRating', value: 4 },
  { id: 'budget', label: 'Under 150K', filterKey: 'priceRange', value: [0, 150000] },
  { id: 'luxury', label: 'Luxury', filterKey: 'propertyTypes', value: ['luxury'] },
];

export const PRICE_RANGE_CONFIG = {
  min: 0,
  max: 600000,
  step: 10000,
  currency: 'Kz',
};

export const RATING_OPTIONS = [
  { value: 0, label: 'All' },
  { value: 3, label: '3+ Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 4.5, label: '4.5+ Stars' },
];

export const GUEST_CAPACITY_OPTIONS = [
  { value: 1, label: '1+ Guest' },
  { value: 2, label: '2+ Guests' },
  { value: 4, label: '4+ Guests' },
  { value: 6, label: '6+ Guests' },
];
