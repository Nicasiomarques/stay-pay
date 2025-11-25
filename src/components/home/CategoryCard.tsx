import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CategoryCardProps {
  name: string;
  image: string;
  onPress?: () => void;
}

export function CategoryCard({ name, image, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      className="items-center mr-4"
      onPress={onPress}
      activeOpacity={0.8}
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
  );
}
