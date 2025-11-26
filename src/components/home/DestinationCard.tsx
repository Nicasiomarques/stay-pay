import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, MapPin } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

interface DestinationCardProps {
  name: string;
  province: string;
  image: string;
  hotelsCount: number;
  trending?: boolean;
  onPress?: () => void;
}

export function DestinationCard({
  name,
  province,
  image,
  hotelsCount,
  trending = false,
  onPress,
}: DestinationCardProps) {
  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

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
        {/* Trending Badge - Positioned absolutely at top */}
        {trending && (
          <View className="absolute top-3 left-3 flex-row items-center gap-1 bg-emerald-500 px-2 py-1 rounded-full z-10">
            <TrendingUp size={10} color="#FFFFFF" strokeWidth={2.5} />
            <Text className="text-white text-[10px] font-bold">Em Alta</Text>
          </View>
        )}

        {/* Gradient only on bottom half */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          {/* Content */}
          <View>
            <Text className="text-white text-base font-bold" numberOfLines={1}>
              {name}
            </Text>
            <View className="flex-row items-center gap-1 mt-0.5">
              <MapPin size={10} color="#FFFFFF" strokeWidth={2} />
              <Text className="text-white/80 text-xs" numberOfLines={1}>
                {province}
              </Text>
            </View>
            <Text className="text-white/60 text-[11px] mt-1">
              {hotelsCount} hotéis
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
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
