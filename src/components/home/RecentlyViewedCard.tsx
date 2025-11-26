import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { useRouter } from 'expo-router';

interface RecentlyViewedCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
}

export function RecentlyViewedCard({
  id,
  name,
  image,
  rating,
  price,
}: RecentlyViewedCardProps) {
  const router = useRouter();

  const handlePress = () => {
    haptics.light();
    router.push(`/hotel/${id}`);
  };

  const formatPrice = (value: number) => {
    return `${value.toLocaleString()} Kz`;
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="flex-row items-center bg-white rounded-xl p-3 mr-3"
      style={{ width: 240 }}
    >
      {/* Image */}
      <Image
        source={{ uri: image }}
        className="w-16 h-16 rounded-lg"
        resizeMode="cover"
      />

      {/* Content */}
      <View className="flex-1 ml-3">
        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
          {name}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <Star size={12} color="#000000" fill="#000000" strokeWidth={0} />
          <Text className="text-xs text-gray-900">{rating}</Text>
        </View>
        <Text className="text-sm font-bold text-primary mt-1">
          {formatPrice(price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
