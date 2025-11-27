/**
 * PropertyTypeGrid Component
 * Grid of property types with emoji icons
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Crown, Waves, Building2, DollarSign, Sparkles } from 'lucide-react-native';
import { PROPERTY_TYPES } from '@/config/constants/filters';
import { haptics } from '@/utils/haptics';

interface PropertyTypeGridProps {
  selected: string[];
  onToggle: (typeId: string) => void;
}

const getPropertyIcon = (typeId: string, isSelected: boolean) => {
  const iconColor = isSelected ? '#0E64D2' : '#737373';
  const iconSize = 24;
  const strokeWidth = 2;

  switch (typeId) {
    case 'luxury':
      return <Crown size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'resort':
      return <Waves size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'business':
      return <Building2 size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'budget':
      return <DollarSign size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    case 'boutique':
      return <Sparkles size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
    default:
      return <Building2 size={iconSize} color={iconColor} strokeWidth={strokeWidth} />;
  }
};

export function PropertyTypeGrid({ selected, onToggle }: PropertyTypeGridProps) {
  return (
    <View className="py-2">
      <Text className="text-base font-semibold text-gray-900 mb-3">
        Tipo de Propriedade
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {PROPERTY_TYPES.map((type) => {
          const isSelected = selected.includes(type.id);
          return (
            <Pressable
              key={type.id}
              className={`w-[30%] aspect-square rounded-lg border-2 items-center justify-center p-3 gap-2 ${
                isSelected
                  ? 'bg-primary/[0.15] border-primary'
                  : 'bg-gray-50 border-gray-200'
              }`}
              onPress={() => {
                haptics.light();
                onToggle(type.id);
              }}
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  isSelected ? 'bg-primary/20' : 'bg-gray-500/10'
                }`}
              >
                {getPropertyIcon(type.id, isSelected)}
              </View>
              <Text
                className={`text-xs text-center ${
                  isSelected
                    ? 'font-bold text-primary'
                    : 'font-semibold text-gray-500'
                }`}
              >
                {type.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
