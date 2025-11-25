/**
 * SkeletonHeroCard Component
 * Animated skeleton loading state for hero/featured cards
 */

import React from 'react';
import { View, Animated } from 'react-native';
import { useShimmer, shimmerColors } from '@/utils/shimmer';

export function SkeletonHeroCard() {
  const { translateX } = useShimmer();

  const shimmerStyle = {
    transform: [{ translateX }],
    backgroundColor: shimmerColors.highlight,
  };

  return (
    <View className="w-full h-60 rounded-2xl overflow-hidden bg-white mb-4">
      {/* Large Image Skeleton */}
      <View
        className="w-full h-full relative overflow-hidden"
        style={{ backgroundColor: shimmerColors.base }}
      >
        <Animated.View
          className="absolute inset-0 opacity-50"
          style={shimmerStyle}
        />
      </View>

      {/* Overlay Content */}
      <View className="absolute bottom-0 left-0 right-0 p-5 gap-2 bg-black/40">
        {/* Title */}
        <View
          className="h-6 w-[70%] rounded overflow-hidden relative"
          style={{ backgroundColor: shimmerColors.base }}
        >
          <Animated.View
            className="absolute inset-0 opacity-50"
            style={shimmerStyle}
          />
        </View>

        {/* Subtitle */}
        <View
          className="h-[18px] w-1/2 rounded overflow-hidden relative"
          style={{ backgroundColor: shimmerColors.base }}
        >
          <Animated.View
            className="absolute inset-0 opacity-50"
            style={shimmerStyle}
          />
        </View>

        {/* Badge */}
        <View
          className="h-7 w-[100px] rounded-full overflow-hidden relative mt-1"
          style={{ backgroundColor: shimmerColors.base }}
        >
          <Animated.View
            className="absolute inset-0 opacity-50"
            style={shimmerStyle}
          />
        </View>
      </View>
    </View>
  );
}
