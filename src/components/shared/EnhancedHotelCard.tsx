import { memo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, MapPin, Flame, Heart } from 'lucide-react-native';
import { Card } from '@/components/ui';
import { useBooking } from '@context';
import { Hotel } from '@types';
import { formatCurrency } from '@/utils/formatters';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { colors } from '@theme';

interface EnhancedHotelCardProps {
  id: number;
  image: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance?: string;
  hotelData?: Hotel;
  isFeatured?: boolean;
  viewedRecently?: number;
  discount?: number;
}

function EnhancedHotelCard({
  id,
  image,
  name,
  location,
  rating,
  reviews,
  price,
  distance,
  hotelData,
  isFeatured = false,
  viewedRecently,
  discount,
}: EnhancedHotelCardProps) {
  const router = useRouter();
  const { setHotel } = useBooking();
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePressIn = () => {
    haptics.light();
    Animated.spring(scaleAnim, {
      toValue: 0.97,
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
    if (hotelData) {
      setHotel(hotelData);
    }
    router.push(`/hotel/${id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    haptics.light();
    setIsFavorite(!isFavorite);
  };

  const isExcellentRating = rating >= 4.5;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Card
          className="overflow-hidden mb-4 rounded-2xl"
          style={shadows.card}
        >
          <View className="h-48 w-full overflow-hidden relative">
            <Image
              source={{ uri: image }}
              className="w-full h-full"
              resizeMode="cover"
            />

            {/* Overlay Badges */}
            <View className="absolute top-3 left-3 flex-col gap-2">
              {/* Featured Badge */}
              {isFeatured && (
                <View
                  className="flex-row items-center px-2.5 py-1.5 gap-1"
                  style={[glass.primary, { borderRadius: glassRadius.md }]}
                >
                  <Flame size={14} color={colors.white} />
                  <Text className="text-xs font-semibold text-white">
                    Em Destaque
                  </Text>
                </View>
              )}

              {/* Discount Badge */}
              {discount && discount > 0 && (
                <View
                  className="flex-row items-center px-2.5 py-1.5 gap-1"
                  style={[glass.success, { borderRadius: glassRadius.md }]}
                >
                  <Text className="text-xs font-semibold text-white">
                    -{discount}%
                  </Text>
                </View>
              )}

              {/* Excellent Rating Badge */}
              {isExcellentRating && (
                <View
                  className="flex-row items-center px-2.5 py-1.5 gap-1 bg-white/95"
                  style={{ borderRadius: glassRadius.md }}
                >
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-xs font-semibold text-white">
                    Excelente
                  </Text>
                </View>
              )}
            </View>

            {/* Favorite Button */}
            <TouchableOpacity
              className="absolute top-3 right-3 w-10 h-10 items-center justify-center"
              style={[glass.light, { borderRadius: glassRadius.full }]}
              onPress={handleFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Heart
                size={20}
                color={isFavorite ? '#EF4444' : colors.white}
                fill={isFavorite ? '#EF4444' : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          <View className="p-4">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text
                  className="text-lg font-semibold text-gray-900 mb-1"
                  numberOfLines={1}
                >
                  {name}
                </Text>
                <View className="flex-row items-center gap-1">
                  <MapPin size={14} color={colors.gray500} />
                  <Text
                    className="text-sm text-gray-500"
                    numberOfLines={1}
                  >
                    {location}
                  </Text>
                  {distance && (
                    <>
                      <Text className="text-sm text-gray-500"> • </Text>
                      <Text className="text-sm text-gray-500">{distance}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>

            {/* FOMO Indicator */}
            {viewedRecently && viewedRecently > 0 && (
              <View className="flex-row items-center gap-1.5 mb-3 py-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <Text className="text-xs text-red-500 font-medium">
                  {viewedRecently} pessoas visualizaram nas últimas 24h
                </Text>
              </View>
            )}

            <View className="flex-row justify-between items-center mt-1">
              <View className="flex-row items-center gap-1">
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text className="text-base font-semibold text-gray-900">
                  {rating}
                </Text>
                <Text className="text-sm text-gray-400">({reviews})</Text>
              </View>

              <View className="flex-row items-baseline gap-1">
                {discount && discount > 0 && (
                  <Text className="text-sm text-gray-400 line-through">
                    {formatCurrency(Math.round(price / (1 - discount / 100)))}
                  </Text>
                )}
                <Text className="text-lg font-semibold text-gray-900">
                  {formatCurrency(price)}
                </Text>
                <Text className="text-sm text-gray-500"> / noite</Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(EnhancedHotelCard);
