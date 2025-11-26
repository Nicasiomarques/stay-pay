import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { formatPriceCompact } from '@/utils/formatters';
import { colors } from '@theme';

interface DestinationCardProps {
  name: string;
  image: string;
  hotelsCount: number;
  onPress?: () => void;
  // Variante
  size?: 'compact' | 'large';
  // Location info
  province?: string;
  country?: string;
  // Trending features
  trending?: boolean;
  trendPercentage?: number;
  averagePrice?: number;
}

export function DestinationCard({
  name,
  image,
  hotelsCount,
  onPress,
  size = 'compact',
  province,
  country,
  trending = false,
  trendPercentage,
  averagePrice,
}: DestinationCardProps) {
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(1));
  const isLarge = size === 'large';

  const handlePressIn = () => {
    if (isLarge) {
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        tension: 100,
        friction: 7,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (isLarge) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 7,
      }).start();
    }
  };

  const handlePress = () => {
    if (isLarge) {
      haptics.medium();
      router.push(`/search?location=${encodeURIComponent(name)}`);
    } else {
      haptics.light();
      onPress?.();
    }
  };

  // Compact variant (original DestinationCard)
  if (!isLarge) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.9}
        className="w-[160px] h-[200px] rounded-2xl overflow-hidden mr-3"
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          {/* Trending Badge */}
          {trending && (
            <View className="absolute top-3 left-3 flex-row items-center gap-1 bg-emerald-500 px-2 py-1 rounded-full z-10">
              <TrendingUp size={10} color="#FFFFFF" strokeWidth={2.5} />
              <Text className="text-white text-[10px] font-bold">Em Alta</Text>
            </View>
          )}

          {/* Gradient */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          >
            <View>
              <Text className="text-white text-base font-bold" numberOfLines={1}>
                {name}
              </Text>
              {province && (
                <View className="flex-row items-center gap-1 mt-0.5">
                  <MapPin size={10} color="#FFFFFF" strokeWidth={2} />
                  <Text className="text-white/80 text-xs" numberOfLines={1}>
                    {province}
                  </Text>
                </View>
              )}
              <Text className="text-white/60 text-[11px] mt-1">
                {hotelsCount} hotéis
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  // Large variant (original TrendingDestinationCard)
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        className="w-[280px] h-[200px] rounded-[20px] overflow-hidden mr-4"
        style={shadows.card}
      >
        <ImageBackground
          source={{ uri: image }}
          className="w-full h-full"
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="flex-1 justify-between p-4"
          >
            {/* Trending Badge */}
            {trendPercentage && (
              <View
                className="self-start flex-row items-center px-2.5 py-1.5 gap-1 bg-white/95"
                style={[glass.success, { borderRadius: glassRadius.md }]}
              >
                <TrendingUp size={14} color="#10B981" />
                <Text className="text-xs font-bold text-emerald-500">
                  +{trendPercentage}%
                </Text>
              </View>
            )}

            {/* Content */}
            <View className="gap-1.5">
              {country && (
                <View className="flex-row items-center gap-1.5">
                  <MapPin size={18} color={colors.white} />
                  <Text className="text-[13px] font-medium text-white opacity-90">
                    {country}
                  </Text>
                </View>
              )}
              <Text className="text-2xl font-bold text-white leading-[30px]">
                {name}
              </Text>

              <View className="flex-row items-center gap-2 mt-1">
                <Text className="text-[13px] font-medium text-white opacity-90">
                  {hotelsCount} hotéis
                </Text>
                {averagePrice && (
                  <>
                    <Text className="text-[13px] text-white opacity-60">•</Text>
                    <Text className="text-[13px] font-medium text-white opacity-90">
                      A partir de {formatPriceCompact(averagePrice)}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
});
