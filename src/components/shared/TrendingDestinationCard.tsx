/**
 * TrendingDestinationCard Component
 * Displays trending destination with image, stats, and glassmorphism overlay
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { colors } from '@theme';

interface TrendingDestinationCardProps {
  destination: string;
  country: string;
  hotelCount: number;
  image: string;
  trendPercentage: number; // % increase in searches
  averagePrice: number;
}

export function TrendingDestinationCard({
  destination,
  country,
  hotelCount,
  image,
  trendPercentage,
  averagePrice,
}: TrendingDestinationCardProps) {
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
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
    haptics.medium();
    // Navigate to search with destination pre-filled
    router.push(`/search?location=${encodeURIComponent(destination)}`);
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(0)}k Kz`;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.container}
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          {/* Dark gradient overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            {/* Trending Badge */}
            <View style={[styles.trendingBadge, glass.success, { borderRadius: glassRadius.md }]}>
              <TrendingUp size={14} color="#10B981" />
              <Text style={styles.trendingText}>+{trendPercentage}%</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.locationRow}>
                <MapPin size={18} color={colors.white} />
                <Text style={styles.country}>{country}</Text>
              </View>
              <Text style={styles.destination}>{destination}</Text>

              <View style={styles.stats}>
                <Text style={styles.statText}>{hotelCount} hotéis</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.statText}>A partir de {formatPrice(averagePrice)}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  trendingBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  trendingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  content: {
    gap: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  country: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.9,
  },
  destination: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 30,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.9,
  },
  dot: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.6,
  },
});
