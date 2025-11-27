import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { haptics } from '@/utils/haptics';

interface CategoryCardProps {
  name: string;
  image: string;
  onPress?: () => void;
}

export function CategoryCard({ name, image, onPress }: CategoryCardProps) {
  const cardRef = useRef<any>(null);

  const handlePressIn = () => {
    cardRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.95 } }, 100);
  };

  const handlePressOut = () => {
    cardRef.current?.animate?.({ 0: { scale: 0.95 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onPress?.();
  };

  return (
    <Animatable.View ref={cardRef}>
      <TouchableOpacity
        className="items-center mr-4"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={1}
      >
        <View className="w-20 h-20 rounded-lg overflow-hidden mb-2 bg-gray-100">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Text className="text-[13px] font-medium text-gray-900 text-center">
          {name}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
