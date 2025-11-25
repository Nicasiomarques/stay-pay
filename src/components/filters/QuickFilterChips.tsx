/**
 * QuickFilterChips Component
 * Horizontal scrollable quick filter chips
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors } from '@theme';
import { QUICK_FILTERS } from '@/constants/filters';
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
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {QUICK_FILTERS.map((filter) => {
          const isActive = isQuickFilterActive(filter.id);
          return (
            <Pressable
              key={filter.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onApplyQuickFilter(filter.id)}
            >
              <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.gray300,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  chipLabelActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
