/**
 * LocationSuggestionItem Component
 * Individual suggestion row in autocomplete dropdown with press animation
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MapPin } from 'lucide-react-native';
import { colors } from '@theme';
import { haptics } from '@/utils/haptics';

interface LocationSuggestionItemProps {
  name: string;
  hotelCount: number;
  onPress: () => void;
}

export function LocationSuggestionItem({ name, hotelCount, onPress }: LocationSuggestionItemProps) {
  const itemRef = useRef<any>(null);

  const handlePressIn = () => {
    itemRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.98 } }, 100);
  };

  const handlePressOut = () => {
    itemRef.current?.animate?.({ 0: { scale: 0.98 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Animatable.View ref={itemRef}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
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
    </Animatable.View>
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
