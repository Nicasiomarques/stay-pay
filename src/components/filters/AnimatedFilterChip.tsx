/**
 * AnimatedFilterChip Component
 * Animated filter chip with scale and haptic feedback
 */

import React, { useState } from 'react';
import { Text, Pressable, Animated } from 'react-native';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';

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
        className={`flex-row items-center py-2 px-4 rounded-3xl border-[1.5px] gap-1.5 ${
          isActive
            ? 'bg-primary border-primary'
            : 'bg-white border-gray-300'
        }`}
        style={isActive ? shadows.buttonActive : shadows.buttonLight}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {icon}
        <Text
          className={`text-sm ${
            isActive
              ? 'text-white font-semibold'
              : 'text-gray-900 font-medium'
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
