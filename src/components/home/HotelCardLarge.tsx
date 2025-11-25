import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star, Bed, Bath, Users, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';

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
  const [favorite, setFavorite] = useState(isFavorite);

  const handlePress = () => {
    haptics.light();
    router.push(`/hotel/${id}`);
  };

  const handleFavorite = () => {
    haptics.medium();
    setFavorite(!favorite);
    onFavoritePress?.();
  };

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const formatReviews = (count: number) => {
    if (count >= 1000) {
      return `(${(count / 1000).toFixed(1)}K)`;
    }
    return `(${count})`;
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl overflow-hidden mb-4"
      onPress={handlePress}
      activeOpacity={0.95}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Image */}
      <View className="w-full h-[200px] relative">
        <Image
          source={{ uri: image }}
          className="w-full h-full rounded-br-xl rounded-bl-xl"
          resizeMode="cover"
        />

        {/* Favorite Button */}
        <TouchableOpacity
          className={`absolute top-3 right-3 w-9 h-9 rounded-full items-center justify-center ${
            favorite ? 'bg-secondary' : 'bg-white'
          }`}
          onPress={handleFavorite}
          activeOpacity={0.8}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Heart
            size={18}
            color={favorite ? '#FFFFFF' : '#10B981'}
            fill={favorite ? '#FFFFFF' : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Header Row */}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="flex-1 text-lg font-semibold text-gray-900 mr-3" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-lg font-bold text-secondary">{formatPrice(price)}</Text>
        </View>

        {/* Location Row */}
        <View className="flex-row items-center mb-3 gap-1">
          <MapPin size={14} color="#737373" strokeWidth={2} />
          <Text className="text-[13px] text-gray-500 ml-1">{location}</Text>
          <Text className="text-[13px] text-gray-500 mx-1">·</Text>
          <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <Text className="text-[13px] font-semibold text-gray-900 ml-1">{rating}</Text>
          <Text className="text-[13px] text-gray-500">{formatReviews(reviews)}</Text>
        </View>

        {/* Specs Row */}
        <View className="flex-row gap-4">
          <View className="flex-row items-center gap-1.5">
            <Bed size={14} color="#737373" strokeWidth={2} />
            <Text className="text-[13px] text-gray-500 font-medium">{beds} Beds</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Bath size={14} color="#737373" strokeWidth={2} />
            <Text className="text-[13px] text-gray-500 font-medium">{baths} Baths</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Users size={14} color="#737373" strokeWidth={2} />
            <Text className="text-[13px] text-gray-500 font-medium">{guests} Guests</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
