/**
 * useScrollPosition Hook
 * Tracks scroll position with throttling for performance
 */

import { useState, useRef, useCallback } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface ScrollPositionOptions {
  threshold?: number; // Threshold to trigger visibility
  throttle?: number; // Throttle scroll events (ms)
}

export function useScrollPosition(options: ScrollPositionOptions = {}) {
  const { threshold = 150, throttle = 100 } = options;

  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const lastUpdateTime = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentTime = Date.now();

      // Throttle updates
      if (currentTime - lastUpdateTime.current < throttle) {
        return;
      }

      lastUpdateTime.current = currentTime;

      const offsetY = event.nativeEvent.contentOffset.y;
      setScrollY(offsetY);

      // Update visibility based on threshold
      const shouldBeVisible = offsetY > threshold;
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    },
    [throttle, threshold, isVisible]
  );

  return {
    scrollY,
    isVisible,
    handleScroll,
  };
}
