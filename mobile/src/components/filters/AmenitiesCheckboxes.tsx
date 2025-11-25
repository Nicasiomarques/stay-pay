/**
 * AmenitiesCheckboxes Component
 * Grouped checkboxes for amenities selection
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Check,
  Wifi,
  Car,
  Wind,
  Waves,
  Dumbbell,
  Sparkles as SparklesIcon,
  Palmtree,
  UtensilsCrossed,
  Wine,
  BellRing,
  ShirtIcon,
  Plane,
  ChevronDown,
  ChevronRight,
} from 'lucide-react-native';
import { colors } from '@theme';
import { AMENITY_CATEGORIES } from '@/constants/filters';
import { haptics } from '@/utils/haptics';

interface AmenitiesCheckboxesProps {
  selected: string[];
  onToggle: (amenityId: string) => void;
}

const getAmenityIcon = (amenityId: string, isSelected: boolean) => {
  const iconColor = isSelected ? colors.white : colors.text.secondary;
  const iconSize = 18;
  const strokeWidth = 2;

  switch (amenityId) {
    case 'wifi':
      return <Wifi size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'parking':
      return <Car size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'air-conditioning':
      return <Wind size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'pool':
      return <Waves size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'gym':
      return <Dumbbell size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'spa':
      return <SparklesIcon size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'beach':
      return <Palmtree size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'restaurant':
      return <UtensilsCrossed size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'bar':
      return <Wine size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'room-service':
    case 'concierge':
      return <BellRing size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'laundry':
      return <ShirtIcon size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'airport-shuttle':
      return <Plane size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    default:
      return <Check size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
  }
};

export function AmenitiesCheckboxes({ selected, onToggle }: AmenitiesCheckboxesProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    AMENITY_CATEGORIES[0]?.id || null
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comodidades</Text>
      {AMENITY_CATEGORIES.map((category) => {
        const isExpanded = expandedCategory === category.id;
        const selectedInCategory = category.amenities.filter(a =>
          selected.includes(a.id)
        ).length;

        return (
          <View key={category.id} style={styles.category}>
            <Pressable
              style={styles.categoryHeader}
              onPress={() => {
                haptics.light();
                setExpandedCategory(isExpanded ? null : category.id);
              }}
            >
              <View style={styles.categoryHeaderContent}>
                <Text style={styles.categoryLabel}>{category.label}</Text>
                {selectedInCategory > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{selectedInCategory}</Text>
                  </View>
                )}
              </View>
              {isExpanded ? (
                <ChevronDown size={18} color={colors.text.secondary} strokeWidth={2} />
              ) : (
                <ChevronRight size={18} color={colors.text.secondary} strokeWidth={2} />
              )}
            </Pressable>

            {isExpanded && (
              <View style={styles.amenitiesList}>
                {category.amenities.map((amenity) => {
                  const isSelected = selected.includes(amenity.id);
                  return (
                    <Pressable
                      key={amenity.id}
                      style={styles.checkboxRow}
                      onPress={() => {
                        haptics.light();
                        onToggle(amenity.id);
                      }}
                    >
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {getAmenityIcon(amenity.id, isSelected)}
                      </View>
                      <Text style={[styles.amenityLabel, isSelected && styles.amenityLabelSelected]}>
                        {amenity.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  category: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.gray50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  badgeContainer: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  amenitiesList: {
    paddingTop: 12,
    paddingLeft: 8,
    gap: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  checkbox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray300,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray50,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  amenityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  amenityLabelSelected: {
    fontWeight: '600',
    color: colors.text.primary,
  },
});
