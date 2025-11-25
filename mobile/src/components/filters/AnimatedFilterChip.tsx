/**
 * AnimatedFilterChip Component
 * Animated filter chip with scale and haptic feedback
 */

import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import { haptics } from '@/utils/haptics';
import { colors } from '@theme';

interface AnimatedFilterChipProps {
  label: string;
  isActive?: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
}

export function AnimatedFilterChip({
  label,
  isActive = false,
  onPress,
  icon,
}: AnimatedFilterChipProps) {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[
          styles.chip,
          isActive && styles.chipActive,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {icon}
        <Text
          style={[
            styles.chipText,
            isActive && styles.chipTextActive,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
