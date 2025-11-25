/**
 * SkeletonHotelCard Component
 * Animated skeleton loading state for hotel cards
 */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useShimmer, shimmerColors } from '@/utils/shimmer';
import { colors } from '@theme';

export function SkeletonHotelCard() {
  const { translateX } = useShimmer();

  return (
    <View style={styles.container}>
      {/* Image Skeleton */}
      <View style={styles.imageContainer}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>

      {/* Content Skeleton */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <View style={styles.titleLine} />
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <View style={styles.locationLine} />
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>

        {/* Rating and Price Row */}
        <View style={styles.row}>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBox} />
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceLine} />
            <Animated.View
              style={[
                styles.shimmer,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: shimmerColors.base,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    padding: 12,
    gap: 8,
  },
  titleContainer: {
    height: 20,
    width: '80%',
    backgroundColor: shimmerColors.base,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  titleLine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: shimmerColors.base,
  },
  locationContainer: {
    height: 16,
    width: '60%',
    backgroundColor: shimmerColors.base,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  locationLine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: shimmerColors.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    height: 20,
    width: 60,
    backgroundColor: shimmerColors.base,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  ratingBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: shimmerColors.base,
  },
  priceContainer: {
    height: 20,
    width: 80,
    backgroundColor: shimmerColors.base,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  priceLine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: shimmerColors.base,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: shimmerColors.highlight,
    opacity: 0.5,
  },
});
