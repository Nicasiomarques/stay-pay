import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { colors } from '@theme';

interface TrendingDestinationCardProps {
  destination: string;
  country: string;
  hotelCount: number;
  image: string;
  trendPercentage: number;
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
            <View
              className="self-start flex-row items-center px-2.5 py-1.5 gap-1 bg-white/95"
              style={[glass.success, { borderRadius: glassRadius.md }]}
            >
              <TrendingUp size={14} color="#10B981" />
              <Text className="text-xs font-bold text-emerald-500">
                +{trendPercentage}%
              </Text>
            </View>

            {/* Content */}
            <View className="gap-1.5">
              <View className="flex-row items-center gap-1.5">
                <MapPin size={18} color={colors.white} />
                <Text className="text-[13px] font-medium text-white opacity-90">
                  {country}
                </Text>
              </View>
              <Text className="text-2xl font-bold text-white leading-[30px]">
                {destination}
              </Text>

              <View className="flex-row items-center gap-2 mt-1">
                <Text className="text-[13px] font-medium text-white opacity-90">
                  {hotelCount} hotéis
                </Text>
                <Text className="text-[13px] text-white opacity-60">•</Text>
                <Text className="text-[13px] font-medium text-white opacity-90">
                  A partir de {formatPrice(averagePrice)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}
