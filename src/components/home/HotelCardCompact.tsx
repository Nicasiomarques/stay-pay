import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Star, Heart } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { useRouter } from 'expo-router';

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
}

export function HotelCardCompact({
  id,
  name,
  location,
  image,
  rating,
  price,
  isFavorite = false,
  onFavoritePress,
  style,
}: HotelCardCompactProps) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(isFavorite);
  const cardRef = useRef<any>(null);
  const heartRef = useRef<any>(null);

  const handlePress = () => {
    haptics.light();
    router.push(`/hotel/${id}`);
  };

  const handleFavorite = () => {
    haptics.medium();
    heartRef.current?.pulse?.(300);
    setFavorite(!favorite);
    onFavoritePress?.();
  };

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
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
          <TouchableOpacity
            className="absolute top-2 right-2 w-8 h-8 items-center justify-center"
            onPress={handleFavorite}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Animatable.View ref={heartRef}>
              <Heart
                size={22}
                color="#FFFFFF"
                fill={favorite ? '#FF385C' : 'rgba(0,0,0,0.5)'}
                strokeWidth={2}
              />
            </Animatable.View>
          </TouchableOpacity>
        </View>

        {/* Content - Airbnb style minimal */}
        <View className="pt-2">
          {/* Title row with rating */}
          <View className="flex-row justify-between items-start">
            <Text className="flex-1 text-[15px] font-semibold text-gray-900" numberOfLines={1}>
              {name}
            </Text>
            <View className="flex-row items-center gap-1 ml-2">
              <Star size={12} color="#000000" fill="#000000" strokeWidth={0} />
              <Text className="text-[13px] text-gray-900">{rating}</Text>
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
              {formatPrice(price)}
            </Text>
            <Text className="text-[13px] text-gray-500"> night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}
