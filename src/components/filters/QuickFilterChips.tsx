/**
 * QuickFilterChips Component
 * Horizontal scrollable quick filter chips
 */

import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { QUICK_FILTERS } from '@/config/constants/filters';
import { FilterState } from '@/types/filters';

interface QuickFilterChipsProps {
  filters: FilterState;
  onApplyQuickFilter: (filterId: string) => void;
}

export function QuickFilterChips({ filters, onApplyQuickFilter }: QuickFilterChipsProps) {
  const isQuickFilterActive = (filterId: string) => {
    const quickFilter = QUICK_FILTERS.find(f => f.id === filterId);
    if (!quickFilter) return false;

    // Check if this quick filter is currently active
    switch (quickFilter.filterKey) {
      case 'amenities':
        const amenityValues = quickFilter.value as string[];
        return amenityValues.every(amenity => filters.amenities.includes(amenity));

      case 'minRating':
        return filters.minRating === quickFilter.value;

      case 'priceRange':
        const [min, max] = quickFilter.value as [number, number];
        return filters.priceRange[0] === min && filters.priceRange[1] === max;

      case 'propertyTypes':
        const typeValues = quickFilter.value as string[];
        return typeValues.every(type => filters.propertyTypes.includes(type));

      default:
        return false;
    }
  };

  return (
    <View className="py-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-1 gap-2"
      >
        {QUICK_FILTERS.map((filter) => {
          const isActive = isQuickFilterActive(filter.id);
          return (
            <Pressable
              key={filter.id}
              className={`py-2 px-4 rounded-[20px] border-[1.5px] ${
                isActive
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-300'
              }`}
              onPress={() => onApplyQuickFilter(filter.id)}
            >
              <Text
                className={`text-sm ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-900 font-medium'
                }`}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
