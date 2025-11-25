/**
 * SkeletonHeroCard Component
 * Animated skeleton loading state for hero/featured cards
 */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useShimmer, shimmerColors } from '@/utils/shimmer';
import { colors } from '@theme';

export function SkeletonHeroCard() {
  const { translateX } = useShimmer();

  return (
    <View style={styles.container}>
      {/* Large Image Skeleton */}
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

      {/* Overlay Content */}
      <View style={styles.overlay}>
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

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <View style={styles.subtitleLine} />
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>

        {/* Badge */}
        <View style={styles.badgeContainer}>
          <View style={styles.badge} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: shimmerColors.base,
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  titleContainer: {
    height: 24,
    width: '70%',
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
  subtitleContainer: {
    height: 18,
    width: '50%',
    backgroundColor: shimmerColors.base,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  subtitleLine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: shimmerColors.base,
  },
  badgeContainer: {
    height: 28,
    width: 100,
    backgroundColor: shimmerColors.base,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 4,
  },
  badge: {
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
