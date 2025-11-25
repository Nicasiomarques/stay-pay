/**
 * SkeletonHotelDetail Component
 * Modern loading skeleton for hotel detail page
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SkeletonHotelDetail() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const SkeletonBox = ({ width, height, style }: any) => (
    <Animated.View
      style={[
        styles.skeletonBox,
        { width, height, opacity: shimmerOpacity },
        style,
      ]}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Image Carousel Skeleton */}
      <SkeletonBox width="100%" height={300} />

      <View className="p-6">
        {/* Header Skeleton */}
        <View className="mb-6">
          <SkeletonBox width="80%" height={32} style={{ marginBottom: 8 }} />
          <SkeletonBox width="50%" height={20} style={{ marginBottom: 8 }} />
          <SkeletonBox width="40%" height={20} />
        </View>

        {/* Description Section Skeleton */}
        <View className="mb-8">
          <SkeletonBox width="40%" height={24} style={{ marginBottom: 16 }} />
          <SkeletonBox width="100%" height={16} style={{ marginBottom: 8 }} />
          <SkeletonBox width="95%" height={16} style={{ marginBottom: 8 }} />
          <SkeletonBox width="85%" height={16} />
        </View>

        {/* Amenities Section Skeleton */}
        <View className="mb-8">
          <SkeletonBox width="35%" height={24} style={{ marginBottom: 16 }} />
          <View className="gap-4">
            {[1, 2, 3, 4].map((item) => (
              <View key={item} className="flex-row items-center">
                <SkeletonBox width={20} height={20} style={{ marginRight: 12 }} />
                <SkeletonBox width="60%" height={16} />
              </View>
            ))}
          </View>
        </View>

        {/* Rooms Section Skeleton */}
        <View className="mb-8">
          <SkeletonBox width="45%" height={24} style={{ marginBottom: 16 }} />
          {[1, 2].map((item) => (
            <View key={item} className="flex-row justify-between items-center p-4 border border-gray-200 rounded-xl mb-3">
              <View className="flex-1">
                <SkeletonBox width="60%" height={20} style={{ marginBottom: 8 }} />
                <SkeletonBox width="40%" height={16} style={{ marginBottom: 8 }} />
                <SkeletonBox width="35%" height={18} />
              </View>
              <SkeletonBox width={90} height={40} style={{ borderRadius: 8 }} />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Keep StyleSheet only for animated skeleton box base style
const styles = StyleSheet.create({
  skeletonBox: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
});
