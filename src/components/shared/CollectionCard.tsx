import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';

interface CollectionCardProps {
  id: string;
  title: string;
  description: string;
  hotelCount: number;
  image: string;
  emoji?: string;
}

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 6,
};

export function CollectionCard({
  id,
  title,
  description,
  hotelCount,
  image,
  emoji = '',
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
    router.push(`/collection/${id}`);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        className="w-80 h-[180px] rounded-[20px] overflow-hidden mr-4"
        style={shadowStyle}
      >
        <ImageBackground
          source={{ uri: image }}
          className="w-full h-full"
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            className="flex-1 justify-end p-5"
          >
            <View className="gap-1">
              <Text className="text-[28px] mb-1">{emoji}</Text>
              <Text className="text-[22px] font-bold text-white leading-7">
                {title}
              </Text>
              <Text
                className="text-sm text-white opacity-90 leading-5 mt-1"
                numberOfLines={2}
              >
                {description}
              </Text>
              <Text className="text-[13px] font-semibold text-white opacity-85 mt-2">
                {hotelCount} {hotelCount === 1 ? 'hotel' : 'hotéis'}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}
