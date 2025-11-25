/**
 * Shimmer Animation Utility
 * Provides reusable shimmer effect for skeleton screens
 */

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useShimmer() {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    shimmerAnimation.start();

    return () => {
      shimmerAnimation.stop();
    };
  }, [shimmerValue]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return { translateX };
}

export const shimmerColors = {
  base: '#E1E9EE',
  highlight: '#F6F7F8',
};
