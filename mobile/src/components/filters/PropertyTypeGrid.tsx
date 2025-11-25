/**
 * PropertyTypeGrid Component
 * Grid of property types with emoji icons
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Crown, Waves, Building2, DollarSign, Sparkles } from 'lucide-react-native';
import { colors } from '@theme';
import { PROPERTY_TYPES } from '@/constants/filters';
import { haptics } from '@/utils/haptics';

interface PropertyTypeGridProps {
  selected: string[];
  onToggle: (typeId: string) => void;
}

const getPropertyIcon = (typeId: string, isSelected: boolean) => {
  const iconColor = isSelected ? colors.primary : colors.text.secondary;
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
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Propriedade</Text>
      <View style={styles.grid}>
        {PROPERTY_TYPES.map((type) => {
          const isSelected = selected.includes(type.id);
          return (
            <Pressable
              key={type.id}
              style={[styles.typeCard, isSelected && styles.typeCardSelected]}
              onPress={() => {
                haptics.light();
                onToggle(type.id);
              }}
            >
              <View style={[styles.iconBadge, isSelected && styles.iconBadgeSelected]}>
                {getPropertyIcon(type.id, isSelected)}
              </View>
              <Text style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}>
                {type.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
  },
  typeCardSelected: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.text.secondary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeSelected: {
    backgroundColor: colors.primary + '20',
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    textAlign: 'center',
  },
  typeLabelSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});
