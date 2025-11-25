/**
 * CollectionCard Component
 * Displays themed hotel collections (e.g., Romantic Getaways, Beach Resorts)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';
import { colors } from '@theme';

interface CollectionCardProps {
  id: string;
  title: string;
  description: string;
  hotelCount: number;
  image: string;
  emoji?: string;
}

export function CollectionCard({
  id,
  title,
  description,
  hotelCount,
  image,
  emoji = '✨',
}: CollectionCardProps) {
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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
    // Navigate to collection view
    router.push(`/collection/${id}`);
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
          {/* Gradient overlay for better text readability */}
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
              <Text style={styles.hotelCount}>
                {hotelCount} {hotelCount === 1 ? 'hotel' : 'hotéis'}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 180,
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
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    gap: 4,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    opacity: 0.9,
    lineHeight: 20,
    marginTop: 4,
  },
  hotelCount: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
    opacity: 0.85,
    marginTop: 8,
  },
});
