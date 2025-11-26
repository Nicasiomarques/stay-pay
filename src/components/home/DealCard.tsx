import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Percent } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

interface DealCardProps {
  title: string;
  subtitle: string;
  discount: number;
  image: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export function DealCard({
  title,
  subtitle,
  discount,
  image,
  backgroundColor = '#0E64D2',
  onPress,
}: DealCardProps) {
  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-[280px] h-[140px] rounded-2xl overflow-hidden mr-4"
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Discount Badge - Positioned absolutely at top */}
        <View className="absolute top-3 left-3 flex-row items-center gap-1 bg-black/40 self-start px-2 py-1 rounded-full z-10">
          <Percent size={12} color="#FFFFFF" strokeWidth={2.5} />
          <Text className="text-white text-xs font-bold">{discount}% OFF</Text>
        </View>

        {/* Gradient only on bottom half */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          {/* Content */}
          <View>
            <Text className="text-white text-lg font-bold" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-white/80 text-sm" numberOfLines={1}>
              {subtitle}
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
    padding: 16,
    justifyContent: 'flex-end',
  },
});
