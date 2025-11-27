import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MapPin, Bed, Bath, Users } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';
import { useRouter } from 'expo-router';
import { StarRating, FavoriteButton } from '@/components/ui';
import { formatCurrency, formatReviewCount } from '@/utils/formatters';

interface HotelCardLargeProps {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  beds?: number;
  baths?: number;
  guests?: number;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export function HotelCardLarge({
  id,
  name,
  location,
  image,
  rating,
  reviews,
  price,
  beds = 2,
  baths = 2,
  guests = 4,
  isFavorite = false,
  onFavoritePress,
}: HotelCardLargeProps) {
  const router = useRouter();
  const cardRef = useRef<any>(null);

  const handlePress = () => {
    haptics.light();
    cardRef.current?.pulse?.(200);
    router.push(`/hotel/${id}`);
  };

  const handlePressIn = () => {
    cardRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.97 } }, 100);
  };

  const handlePressOut = () => {
    cardRef.current?.animate?.({ 0: { scale: 0.97 }, 1: { scale: 1 } }, 100);
  };

  const handleFavorite = () => {
    onFavoritePress?.();
  };

  return (
    <Animatable.View ref={cardRef}>
      <TouchableOpacity
        className="bg-white rounded-2xl overflow-hidden mb-4"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={1}
        style={shadows.card}
      >
        {/* Image */}
        <View className="w-full h-[200px] relative">
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-br-xl rounded-bl-xl"
            resizeMode="cover"
          />

          {/* Favorite Button */}
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={handleFavorite}
            variant="solid"
            size="sm"
            style={[{ position: 'absolute', top: 12, right: 12 }, shadows.buttonLight]}
          />
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Header Row */}
          <View className="flex-row justify-between items-start mb-2">
            <Text className="flex-1 text-lg font-semibold text-gray-900 mr-3" numberOfLines={1}>
              {name}
            </Text>
            <Text className="text-lg font-bold text-secondary">{formatCurrency(price)}</Text>
          </View>

          {/* Location Row */}
          <View className="flex-row items-center mb-3 gap-1">
            <MapPin size={14} color="#737373" strokeWidth={2} />
            <Text className="text-[13px] text-gray-500 ml-1">{location}</Text>
            <Text className="text-[13px] text-gray-500 mx-1">·</Text>
            <StarRating rating={rating} reviews={reviews} size="sm" showReviews={false} />
            <Text className="text-[13px] text-gray-500">{formatReviewCount(reviews)}</Text>
          </View>

          {/* Specs Row */}
          <View className="flex-row gap-4">
            <View className="flex-row items-center gap-1.5">
              <Bed size={14} color="#737373" strokeWidth={2} />
              <Text className="text-[13px] text-gray-500 font-medium">{beds} Camas</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Bath size={14} color="#737373" strokeWidth={2} />
              <Text className="text-[13px] text-gray-500 font-medium">{baths} WC</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Users size={14} color="#737373" strokeWidth={2} />
              <Text className="text-[13px] text-gray-500 font-medium">{guests} Hóspedes</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}
