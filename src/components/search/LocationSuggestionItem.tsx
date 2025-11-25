/**
 * LocationSuggestionItem Component
 * Individual suggestion row in autocomplete dropdown
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { colors } from '@theme';

interface LocationSuggestionItemProps {
  name: string;
  hotelCount: number;
  onPress: () => void;
}

export function LocationSuggestionItem({ name, hotelCount, onPress }: LocationSuggestionItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MapPin size={20} color={colors.text.secondary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.locationName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.hotelCount}>
          {hotelCount} {hotelCount === 1 ? 'hotel' : 'hotéis'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
    backgroundColor: colors.white,
  },
  containerPressed: {
    backgroundColor: colors.gray50,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  hotelCount: {
    fontSize: 13,
    color: colors.text.secondary,
  },
});
