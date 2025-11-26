import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Clock, Star } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { useRouter } from 'expo-router';

interface LastMinuteCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  expiresIn: string;
}

export function LastMinuteCard({
  id,
  name,
  location,
  image,
  rating,
  originalPrice,
  discountedPrice,
  expiresIn,
}: LastMinuteCardProps) {
  const router = useRouter();

  const handlePress = () => {
    haptics.light();
    router.push(`/hotel/${id}`);
  };

  const formatPrice = (value: number) => {
    return `${value.toLocaleString()} Kz`;
  };

  const discountPercent = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-[200px] bg-white rounded-2xl overflow-hidden mr-3"
    >
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full h-[120px]"
          resizeMode="cover"
        />
        {/* Discount Badge */}
        <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full">
          <Text className="text-white text-[10px] font-bold">-{discountPercent}%</Text>
        </View>
        {/* Timer Badge */}
        <View className="absolute bottom-2 right-2 flex-row items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
          <Clock size={10} color="#FFFFFF" strokeWidth={2} />
          <Text className="text-white text-[10px] font-medium">{expiresIn}</Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-3">
        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
          {location}
        </Text>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center gap-1">
            <Star size={12} color="#000000" fill="#000000" strokeWidth={0} />
            <Text className="text-xs text-gray-900">{rating}</Text>
          </View>
          <View className="items-end">
            <Text className="text-[10px] text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </Text>
            <Text className="text-sm font-bold text-red-500">
              {formatPrice(discountedPrice)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
