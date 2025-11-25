/**
 * EnhancedHotelCard Component
 * Modern hotel card with glassmorphism badges, animations, and FOMO indicators
 */

import { memo, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, MapPin, Flame, Heart } from 'lucide-react-native';
import { Card } from '@/components/ui';
import { useBooking } from '@context';
import { Hotel } from '@types';
import { formatCurrency } from '@/utils/formatters';
import { haptics } from '@/utils/haptics';
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
  viewedRecently?: number; // Number of people who viewed recently
  discount?: number; // Discount percentage
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

  // Calculate if rating is excellent (4.5+)
  const isExcellentRating = rating >= 4.5;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Overlay Badges */}
            <View style={styles.badgeContainer}>
              {/* Featured Badge */}
              {isFeatured && (
                <View style={[styles.badge, glass.primary, { borderRadius: glassRadius.md }]}>
                  <Flame size={14} color={colors.white} />
                  <Text style={styles.badgeText}>Em Destaque</Text>
                </View>
              )}

              {/* Discount Badge */}
              {discount && discount > 0 && (
                <View style={[styles.badge, glass.success, { borderRadius: glassRadius.md }]}>
                  <Text style={styles.badgeText}>-{discount}%</Text>
                </View>
              )}

              {/* Excellent Rating Badge */}
              {isExcellentRating && (
                <View style={[styles.badge, styles.ratingBadge, { borderRadius: glassRadius.md }]}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.badgeText}>Excelente</Text>
                </View>
              )}
            </View>

            {/* Favorite Button */}
            <TouchableOpacity
              style={[styles.favoriteButton, glass.light, { borderRadius: glassRadius.full }]}
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

            {/* FOMO Indicator */}
            {viewedRecently && viewedRecently > 0 && (
              <View style={styles.fomoContainer}>
                <View style={styles.fomoDot} />
                <Text style={styles.fomoText}>
                  {viewedRecently} pessoas visualizaram nas últimas 24h
                </Text>
              </View>
            )}

            <View style={styles.footer}>
              <View style={styles.rating}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingValue}>{rating}</Text>
                <Text style={styles.reviews}>({reviews})</Text>
              </View>

              <View style={styles.priceContainer}>
                {discount && discount > 0 && (
                  <Text style={styles.originalPrice}>
                    {formatCurrency(Math.round(price / (1 - discount / 100)))}
                  </Text>
                )}
                <Text style={styles.price}>{formatCurrency(price)}</Text>
                <Text style={styles.perNight}> / noite</Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  imageContainer: {
    height: 192,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'column',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 0,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  fomoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingVertical: 6,
  },
  fomoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  fomoText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
    gap: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.gray400,
    textDecorationLine: 'line-through',
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

export default memo(EnhancedHotelCard);
