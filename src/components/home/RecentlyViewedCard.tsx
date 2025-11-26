import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { haptics } from '@/utils/haptics';
import { useRouter } from 'expo-router';
import { StarRating } from '@/components/ui';
import { formatCurrency } from '@/utils/formatters';

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
        <View className="mt-1">
          <StarRating rating={rating} size="sm" variant="black" showReviews={false} />
        </View>
        <Text className="text-sm font-bold text-primary mt-1">
          {formatCurrency(price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
