import { memo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Flame } from 'lucide-react-native';
import { Card, StarRating, FavoriteButton, PriceDisplay } from '@/components/ui';
import { useBooking } from '@context';
import { Hotel } from '@types';
import { formatCurrency } from '@/utils/formatters';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { colors } from '@theme';

interface HotelCardProps {
  id: number;
  image: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance?: string;
  hotelData?: Hotel;
  // Enhancement props (opcional)
  enhanced?: boolean;
  isFeatured?: boolean;
  viewedRecently?: number;
  discount?: number;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoritePress?: (newState: boolean) => void;
}

function HotelCard({
  id,
  image,
  name,
  location,
  rating,
  reviews,
  price,
  distance,
  hotelData,
  enhanced = false,
  isFeatured = false,
  viewedRecently,
  discount,
  showFavorite = false,
  isFavorite = false,
  onFavoritePress,
}: HotelCardProps) {
  const router = useRouter();
  const { setHotel } = useBooking();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    if (enhanced) {
      haptics.light();
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        tension: 100,
        friction: 7,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (enhanced) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 7,
      }).start();
    }
  };

  const handlePress = () => {
    if (enhanced) {
      haptics.medium();
    }
    if (hotelData) {
      setHotel(hotelData);
    }
    router.push(`/hotel/${id}`);
  };

  const handleFavoritePress = (newState: boolean) => {
    onFavoritePress?.(newState);
  };

  const isExcellentRating = rating >= 4.5;
  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : undefined;

  const cardContent = (
    <Card
      className="overflow-hidden mb-4 rounded-2xl"
      style={enhanced ? shadows.card : undefined}
    >
      <View className="h-48 w-full overflow-hidden relative">
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Enhanced: Overlay Badges */}
        {enhanced && (
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
                <Text className="text-xs font-semibold text-amber-500">
                  Excelente
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Favorite Button */}
        {(enhanced || showFavorite) && (
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={handleFavoritePress}
            variant="glass"
            size="md"
            style={{ position: 'absolute', top: 12, right: 12 }}
          />
        )}
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
              <Text className="text-sm text-gray-500" numberOfLines={1}>
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

        {/* FOMO Indicator (enhanced only) */}
        {enhanced && viewedRecently && viewedRecently > 0 && (
          <View className="flex-row items-center gap-1.5 mb-3 py-1.5">
            <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <Text className="text-xs text-red-500 font-medium">
              {viewedRecently} pessoas visualizaram nas últimas 24h
            </Text>
          </View>
        )}

        <View className="flex-row justify-between items-center mt-1">
          <StarRating rating={rating} reviews={reviews} size="md" />

          {enhanced && discount ? (
            <PriceDisplay
              price={price}
              originalPrice={originalPrice}
              suffix=" / noite"
              size="md"
            />
          ) : (
            <View className="flex-row items-baseline">
              <Text className="text-lg font-semibold text-gray-900">
                {formatCurrency(price)}
              </Text>
              <Text className="text-sm text-gray-500"> / noite</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );

  if (enhanced) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          {cardContent}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      {cardContent}
    </TouchableOpacity>
  );
}

export default memo(HotelCard);
