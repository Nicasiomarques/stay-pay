import React from 'react';
import { View, Animated } from 'react-native';
import { useShimmer, shimmerColors } from '@/utils/shimmer';

const shimmerStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: shimmerColors.highlight,
  opacity: 0.5,
};

export function SkeletonHotelCard() {
  const { translateX } = useShimmer();

  return (
    <View className="w-[280px] bg-white rounded-2xl overflow-hidden mb-3">
      {/* Image Skeleton */}
      <View
        className="w-full h-[180px] overflow-hidden relative"
        style={{ backgroundColor: shimmerColors.base }}
      >
        <Animated.View style={[shimmerStyle, { transform: [{ translateX }] }]} />
      </View>

      {/* Content Skeleton */}
      <View className="p-3 gap-2">
        {/* Title */}
        <View
          className="h-5 w-4/5 rounded overflow-hidden relative"
          style={{ backgroundColor: shimmerColors.base }}
        >
          <Animated.View style={[shimmerStyle, { transform: [{ translateX }] }]} />
        </View>

        {/* Location */}
        <View
          className="h-4 w-3/5 rounded overflow-hidden relative"
          style={{ backgroundColor: shimmerColors.base }}
        >
          <Animated.View style={[shimmerStyle, { transform: [{ translateX }] }]} />
        </View>

        {/* Rating and Price Row */}
        <View className="flex-row justify-between items-center mt-1">
          <View
            className="h-5 w-[60px] rounded overflow-hidden relative"
            style={{ backgroundColor: shimmerColors.base }}
          >
            <Animated.View style={[shimmerStyle, { transform: [{ translateX }] }]} />
          </View>

          <View
            className="h-5 w-[80px] rounded overflow-hidden relative"
            style={{ backgroundColor: shimmerColors.base }}
          >
            <Animated.View style={[shimmerStyle, { transform: [{ translateX }] }]} />
          </View>
        </View>
      </View>
    </View>
  );
}
