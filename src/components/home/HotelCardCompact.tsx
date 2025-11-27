import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { haptics } from '@/utils/haptics';
import { useRouter } from 'expo-router';
import { StarRating, FavoriteButton } from '@/components/ui';
import { formatCurrency } from '@/utils/formatters';
import { useFavorites, useToggleFavorite } from '@/hooks/queries';

interface HotelCardCompactProps {
  id: number;
  name: string;
  location?: string;
  image: string;
  rating: number;
  price: number;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** Use internal favorite state from API instead of props */
  useInternalFavorite?: boolean;
}

export function HotelCardCompact({
  id,
  name,
  location,
  image,
  rating,
  price,
  isFavorite: isFavoriteProp = false,
  onFavoritePress,
  style,
  useInternalFavorite = true,
}: HotelCardCompactProps) {
  const router = useRouter();
  const cardRef = useRef<any>(null);

  // Get favorites from API
  const { data: favorites } = useFavorites();
  const toggleFavoriteMutation = useToggleFavorite();

  // Check if hotel is in favorites list
  const isInFavorites = favorites?.some((fav) => fav.hotelId === id) ?? false;
  const isFavorite = useInternalFavorite ? isInFavorites : isFavoriteProp;

  const handlePress = () => {
    haptics.light();
    router.push(`/hotel/${id}`);
  };

  const handleFavorite = () => {
    if (onFavoritePress) {
      onFavoritePress();
    } else {
      haptics.medium();
      toggleFavoriteMutation.mutate({ hotelId: id, isFavorite });
    }
  };

  return (
    <Animatable.View ref={cardRef} style={style}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.9}
      >
        {/* Image - Airbnb style square aspect ratio */}
        <View className="w-full aspect-square relative rounded-xl overflow-hidden">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Favorite Button - Airbnb style */}
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={handleFavorite}
            variant="airbnb"
            size="sm"
            style={{ position: 'absolute', top: 8, right: 8 }}
          />
        </View>

        {/* Content - Airbnb style minimal */}
        <View className="pt-2">
          {/* Title row with rating */}
          <View className="flex-row justify-between items-start">
            <Text className="flex-1 text-[15px] font-semibold text-gray-900" numberOfLines={1}>
              {name}
            </Text>
            <View className="ml-2">
              <StarRating rating={rating} size="sm" variant="black" showReviews={false} />
            </View>
          </View>

          {/* Location */}
          {location && (
            <Text className="text-[13px] text-gray-500 mt-0.5" numberOfLines={1}>
              {location}
            </Text>
          )}

          {/* Price */}
          <View className="flex-row items-baseline mt-1">
            <Text className="text-[15px] font-semibold text-gray-900">
              {formatCurrency(price)}
            </Text>
            <Text className="text-[13px] text-gray-500"> / noite</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}
