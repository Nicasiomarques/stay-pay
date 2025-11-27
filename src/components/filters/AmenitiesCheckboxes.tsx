/**
 * AmenitiesCheckboxes Component
 * Grouped checkboxes for amenities selection
 */

import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
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
import { AMENITY_CATEGORIES } from '@/config/constants/filters';
import { haptics } from '@/utils/haptics';

interface AmenitiesCheckboxesProps {
  selected: string[];
  onToggle: (amenityId: string) => void;
}

const getAmenityIcon = (amenityId: string, isSelected: boolean) => {
  const iconColor = isSelected ? '#FFFFFF' : '#737373';
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
    <View className="py-2">
      <Text className="text-base font-semibold text-gray-900 mb-3">Comodidades</Text>
      {AMENITY_CATEGORIES.map((category) => {
        const isExpanded = expandedCategory === category.id;
        const selectedInCategory = category.amenities.filter(a =>
          selected.includes(a.id)
        ).length;

        return (
          <View key={category.id} className="mb-3">
            <Pressable
              className="flex-row justify-between items-center py-3.5 px-4 bg-gray-50 rounded-xl border-[1.5px] border-gray-200"
              onPress={() => {
                haptics.light();
                setExpandedCategory(isExpanded ? null : category.id);
              }}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-[15px] font-semibold text-gray-900">
                  {category.label}
                </Text>
                {selectedInCategory > 0 && (
                  <View className="min-w-[24px] h-6 rounded-full bg-primary/20 items-center justify-center px-2">
                    <Text className="text-xs font-bold text-primary">
                      {selectedInCategory}
                    </Text>
                  </View>
                )}
              </View>
              {isExpanded ? (
                <ChevronDown size={18} color="#737373" strokeWidth={2} />
              ) : (
                <ChevronRight size={18} color="#737373" strokeWidth={2} />
              )}
            </Pressable>

            {isExpanded && (
              <View className="pt-3 pl-2 gap-1">
                {category.amenities.map((amenity) => {
                  const isSelected = selected.includes(amenity.id);
                  return (
                    <Pressable
                      key={amenity.id}
                      className="flex-row items-center py-2.5 px-2 rounded-lg"
                      onPress={() => {
                        haptics.light();
                        onToggle(amenity.id);
                      }}
                    >
                      <View
                        className={`w-9 h-9 rounded-lg border-2 mr-3 items-center justify-center ${
                          isSelected
                            ? 'bg-primary border-primary'
                            : 'bg-gray-50 border-gray-300'
                        }`}
                      >
                        {getAmenityIcon(amenity.id, isSelected)}
                      </View>
                      <Text
                        className={`text-sm ${
                          isSelected ? 'font-semibold' : 'font-medium'
                        } text-gray-900`}
                      >
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
