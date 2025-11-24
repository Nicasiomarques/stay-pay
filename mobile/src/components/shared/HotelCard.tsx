import { memo } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
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
    <Card onPress={handlePress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color={colors.gray500} />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
              {distance && (
                <>
                  <Text style={styles.dot}> • </Text>
                  <Text style={styles.distance}>{distance}</Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.rating}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingValue}>{rating}</Text>
            <Text style={styles.reviews}>({reviews})</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatCurrency(price)}</Text>
            <Text style={styles.perNight}> / noite</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    height: 192,
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.gray500,
  },
  dot: {
    color: colors.gray500,
    fontSize: 14,
  },
  distance: {
    fontSize: 14,
    color: colors.gray500,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  reviews: {
    fontSize: 14,
    color: colors.gray400,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  perNight: {
    fontSize: 14,
    color: colors.gray500,
  },
});

export default memo(HotelCard);
