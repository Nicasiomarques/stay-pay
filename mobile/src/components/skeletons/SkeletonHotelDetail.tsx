/**
 * SkeletonHotelDetail Component
 * Modern loading skeleton for hotel detail page
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@theme';

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
    <SafeAreaView style={styles.container}>
      {/* Image Carousel Skeleton */}
      <SkeletonBox width="100%" height={300} />

      <View style={styles.content}>
        {/* Header Skeleton */}
        <View style={styles.header}>
          <SkeletonBox width="80%" height={32} style={{ marginBottom: 8 }} />
          <SkeletonBox width="50%" height={20} style={{ marginBottom: 8 }} />
          <SkeletonBox width="40%" height={20} />
        </View>

        {/* Description Section Skeleton */}
        <View style={styles.section}>
          <SkeletonBox width="40%" height={24} style={{ marginBottom: 16 }} />
          <SkeletonBox width="100%" height={16} style={{ marginBottom: 8 }} />
          <SkeletonBox width="95%" height={16} style={{ marginBottom: 8 }} />
          <SkeletonBox width="85%" height={16} />
        </View>

        {/* Amenities Section Skeleton */}
        <View style={styles.section}>
          <SkeletonBox width="35%" height={24} style={{ marginBottom: 16 }} />
          <View style={styles.amenitiesGrid}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.amenityRow}>
                <SkeletonBox width={20} height={20} style={{ marginRight: 12 }} />
                <SkeletonBox width="60%" height={16} />
              </View>
            ))}
          </View>
        </View>

        {/* Rooms Section Skeleton */}
        <View style={styles.section}>
          <SkeletonBox width="45%" height={24} style={{ marginBottom: 16 }} />
          {[1, 2].map((item) => (
            <View key={item} style={styles.roomCard}>
              <View style={styles.roomInfo}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  skeletonBox: {
    backgroundColor: colors.gray200,
    borderRadius: 8,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  amenitiesGrid: {
    gap: 16,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 12,
  },
  roomInfo: {
    flex: 1,
  },
});
