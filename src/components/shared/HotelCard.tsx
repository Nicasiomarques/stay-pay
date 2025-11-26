import { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, MapPin } from 'lucide-react-native';
import { Card } from '@/components/ui';
import { useBooking } from '@context';
import { Hotel } from '@types';
import { formatCurrency } from '@/utils/formatters';
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
}: HotelCardProps) {
  const router = useRouter();
  const { setHotel } = useBooking();

  const handlePress = () => {
    if (hotelData) {
      setHotel(hotelData);
    }
    router.push(`/hotel/${id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card className="overflow-hidden mb-4">
        <View className="h-48 w-full overflow-hidden">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
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

          <View className="flex-row justify-between items-center mt-3">
            <View className="flex-row items-center gap-1">
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-base font-semibold text-gray-900">
                {rating}
              </Text>
              <Text className="text-sm text-gray-400">({reviews})</Text>
            </View>

            <View className="flex-row items-baseline">
              <Text className="text-lg font-semibold text-gray-900">
                {formatCurrency(price)}
              </Text>
              <Text className="text-sm text-gray-500"> / noite</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default memo(HotelCard);
