import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Star,
  MapPin,
  Wifi,
  Droplets,
  UtensilsCrossed,
  Heart,
  Share2,
  Eye,
  Sparkles,
  ArrowLeft,
  Bed,
  Users,
  Coffee,
  Dumbbell,
  Car,
  Clock,
  ArrowRight,
  Navigation,
  Award,
  TrendingUp,
  Check,
} from 'lucide-react-native';
import { ImageCarousel } from '@/components/shared/ImageCarousel';
import { SkeletonHotelDetail } from '@/components/skeletons/SkeletonHotelDetail';
import { useBooking } from '@context';
import { useHotel } from '@/hooks/queries';
import { formatCurrency } from '@/utils';
import { haptics } from '@/utils/haptics';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { colors } from '@theme';

export default function HotelDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { setHotel, setSelectedRoom } = useBooking();

  const hotelId = Number(id);
  const { data: hotel, isLoading, error } = useHotel(hotelId);

  // Animation states
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(20));
  const [isFavorite, setIsFavorite] = useState(false);

  // Trigger animations when hotel loads
  useEffect(() => {
    if (hotel) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [hotel]);

  // Random viewing count for FOMO (in production, this would come from API)
  const viewingCount = Math.floor(Math.random() * 15) + 5;
  const remainingRooms = hotel?.rooms ? Math.min(hotel.rooms.length, Math.floor(Math.random() * 5) + 1) : 0;
  const lastBookingHours = Math.floor(Math.random() * 12) + 1;

  // Pulsing animation for urgent badge
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (remainingRooms <= 3) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [remainingRooms]);

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const handleFavorite = () => {
    haptics.medium();
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    haptics.light();
    if (hotel) {
      try {
        await Share.share({
          message: `Confira ${hotel.name} no StayGo! ${hotel.location}`,
          title: hotel.name,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (isLoading) {
    return <SkeletonHotelDetail />;
  }

  if (error || !hotel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Hotel não encontrado</Text>
          <Text style={styles.errorSubtext}>
            {error instanceof Error ? error.message : 'Erro ao carregar hotel'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Amenities icon mapping with comprehensive coverage
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();

    if (lowerAmenity.includes('piscina') || lowerAmenity.includes('pool')) {
      return Droplets;
    } else if (lowerAmenity.includes('restaurante') || lowerAmenity.includes('restaurant') ||
               lowerAmenity.includes('café') || lowerAmenity.includes('coffee') ||
               lowerAmenity.includes('comida')) {
      return Coffee;
    } else if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) {
      return Wifi;
    } else if (lowerAmenity.includes('estacionamento') || lowerAmenity.includes('parking') ||
               lowerAmenity.includes('garagem')) {
      return Car;
    } else if (lowerAmenity.includes('academia') || lowerAmenity.includes('gym') ||
               lowerAmenity.includes('fitness')) {
      return Dumbbell;
    } else if (lowerAmenity.includes('quarto') || lowerAmenity.includes('bed') ||
               lowerAmenity.includes('room')) {
      return Bed;
    } else if (lowerAmenity.includes('estrela') || lowerAmenity.includes('star')) {
      return Star;
    }

    return Sparkles; // Default icon
  };

  const amenities = hotel.amenities.map((amenity: string) => ({
    icon: getAmenityIcon(amenity),
    label: amenity,
  }));

  const handleSelectRoom = (roomIndex: number) => {
    haptics.medium();
    setHotel(hotel);
    setSelectedRoom(roomIndex);
    router.push('/calendar');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel with Overlay */}
        <View style={styles.heroContainer}>
          <ImageCarousel images={hotel.images || [hotel.image]} height={380} />

          {/* Floating Header Actions */}
          <View style={styles.floatingHeader}>
            <SafeAreaView edges={['top']}>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={[styles.actionButton, glass.light, { borderRadius: glassRadius.full }]}
                  onPress={handleBack}
                  activeOpacity={0.7}
                >
                  <ArrowLeft size={22} color={colors.white} strokeWidth={2} />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                  <TouchableOpacity
                    style={[styles.actionButton, glass.light, { borderRadius: glassRadius.full }]}
                    onPress={handleShare}
                    activeOpacity={0.7}
                  >
                    <Share2 size={20} color={colors.white} strokeWidth={2} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      glass.light,
                      { borderRadius: glassRadius.full },
                      isFavorite && styles.favoriteActive,
                    ]}
                    onPress={handleFavorite}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={20}
                      color={isFavorite ? colors.white : colors.white}
                      fill={isFavorite ? colors.white : 'transparent'}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>

          {/* FOMO Badges with Semantic Colors */}
          <View style={styles.badgesContainer}>
            {/* Viewing Count Badge - Blue */}
            <View style={[styles.fomoBadge, styles.infoBadge, glass.light, { borderRadius: glassRadius.lg }]}>
              <Eye size={14} color={colors.white} strokeWidth={2} />
              <Text style={styles.badgeText}>{viewingCount} pessoas vendo</Text>
            </View>

            {/* Urgent Badge - Red/Orange with Pulse */}
            {remainingRooms <= 3 && (
              <Animated.View
                style={[
                  styles.fomoBadge,
                  styles.urgentBadge,
                  glass.light,
                  { borderRadius: glassRadius.lg, transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Sparkles size={14} color={colors.white} strokeWidth={2} />
                <Text style={styles.badgeText}>Apenas {remainingRooms} quartos</Text>
              </Animated.View>
            )}

            {/* Last Booking Badge - Green */}
            <View style={[styles.fomoBadge, styles.successBadge, glass.light, { borderRadius: glassRadius.lg }]}>
              <Clock size={14} color={colors.white} strokeWidth={2} />
              <Text style={styles.badgeText}>Última reserva há {lastBookingHours}h</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{hotel.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.gray500} strokeWidth={2} />
              <Text style={styles.location}>{hotel.location}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
              <Text style={styles.rating}>{hotel.rating}</Text>
              <Text style={styles.reviews}>({hotel.reviews} avaliações)</Text>
            </View>
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoContainer}>
            {/* Distance Card */}
            <View style={styles.quickInfoCard}>
              <View style={[styles.quickInfoIconBadge, { backgroundColor: '#E0F2FE' }]}>
                <Navigation size={18} color="#0284C7" strokeWidth={2} />
              </View>
              <Text style={styles.quickInfoValue}>2.4 km</Text>
              <Text style={styles.quickInfoLabel}>do centro</Text>
            </View>

            {/* Rating Breakdown Card */}
            <View style={styles.quickInfoCard}>
              <View style={[styles.quickInfoIconBadge, { backgroundColor: '#FEF3C7' }]}>
                <Award size={18} color="#F59E0B" strokeWidth={2} />
              </View>
              <Text style={styles.quickInfoValue}>{hotel.rating}/5</Text>
              <Text style={styles.quickInfoLabel}>Excelente</Text>
            </View>

            {/* Popular Choice Card */}
            <View style={styles.quickInfoCard}>
              <View style={[styles.quickInfoIconBadge, { backgroundColor: '#DCFCE7' }]}>
                <TrendingUp size={18} color="#16A34A" strokeWidth={2} />
              </View>
              <Text style={styles.quickInfoValue}>Top 10%</Text>
              <Text style={styles.quickInfoLabel}>Mais reservado</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o Hotel</Text>
            <Text style={styles.description}>{hotel.description}</Text>
          </View>

          {/* Amenities as Badges */}
          {amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Comodidades</Text>
              <View style={styles.amenitiesBadgeContainer}>
                {amenities.map((amenity, index) => {
                  const IconComponent = amenity.icon;
                  return (
                    <View key={index} style={styles.amenityBadge}>
                      <IconComponent size={16} color={colors.primary} strokeWidth={2.5} />
                      <Text style={styles.amenityBadgeText}>{amenity.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Avaliações</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.viewAllText}>Ver todas ({hotel.reviews})</Text>
              </TouchableOpacity>
            </View>

            {/* Overall Rating Card */}
            <View style={styles.overallRatingCard}>
              <View style={styles.ratingScoreSection}>
                <Text style={styles.ratingScoreLarge}>{hotel.rating}</Text>
                <View style={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      color="#F59E0B"
                      fill={star <= Math.floor(hotel.rating) ? "#F59E0B" : "transparent"}
                      strokeWidth={2}
                    />
                  ))}
                </View>
                <Text style={styles.ratingLabel}>Excelente</Text>
              </View>

              {/* Rating Breakdown */}
              <View style={styles.ratingBreakdown}>
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Limpeza</Text>
                  <View style={styles.breakdownBar}>
                    <View style={[styles.breakdownFill, { width: '95%' }]} />
                  </View>
                  <Text style={styles.breakdownScore}>4.8</Text>
                </View>
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Conforto</Text>
                  <View style={styles.breakdownBar}>
                    <View style={[styles.breakdownFill, { width: '92%' }]} />
                  </View>
                  <Text style={styles.breakdownScore}>4.6</Text>
                </View>
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Localização</Text>
                  <View style={styles.breakdownBar}>
                    <View style={[styles.breakdownFill, { width: '88%' }]} />
                  </View>
                  <Text style={styles.breakdownScore}>4.4</Text>
                </View>
              </View>
            </View>

            {/* Recent Reviews */}
            <View style={styles.recentReviews}>
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}>
                      <Text style={styles.reviewerInitials}>MC</Text>
                    </View>
                    <View>
                      <Text style={styles.reviewerName}>Maria Costa</Text>
                      <Text style={styles.reviewDate}>Há 2 dias</Text>
                    </View>
                  </View>
                  <View style={styles.reviewRating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                    <Text style={styles.reviewScore}>4.8</Text>
                  </View>
                </View>
                <Text style={styles.reviewText} numberOfLines={3}>
                  Hotel incrível! Quarto espaçoso e limpo, staff muito atencioso. Localização perfeita para explorar a cidade.
                </Text>
              </View>

              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={[styles.reviewerAvatar, { backgroundColor: '#DBEAFE' }]}>
                      <Text style={[styles.reviewerInitials, { color: '#1E40AF' }]}>JS</Text>
                    </View>
                    <View>
                      <Text style={styles.reviewerName}>João Silva</Text>
                      <Text style={styles.reviewDate}>Há 1 semana</Text>
                    </View>
                  </View>
                  <View style={styles.reviewRating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
                    <Text style={styles.reviewScore}>5.0</Text>
                  </View>
                </View>
                <Text style={styles.reviewText} numberOfLines={3}>
                  Experiência excepcional! Café da manhã delicioso e a piscina é maravilhosa. Voltaria com certeza.
                </Text>
              </View>
            </View>
          </View>

          {/* Rooms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quartos Disponíveis</Text>
            <View style={styles.roomsContainer}>
              {hotel.rooms && hotel.rooms.length > 0 ? (
                hotel.rooms.map((room, index) => (
                  <TouchableOpacity
                    key={room.id}
                    style={styles.roomCard}
                    onPress={() => handleSelectRoom(index)}
                    activeOpacity={0.9}
                  >
                    {/* Room Header with Icon Background */}
                    <View style={styles.roomIconContainer}>
                      <View style={styles.roomIconBadge}>
                        <Bed size={20} color={colors.white} strokeWidth={2} />
                      </View>
                    </View>

                    {/* Room Content */}
                    <View style={styles.roomCardContent}>
                      <View style={styles.roomMainInfo}>
                        <Text style={styles.roomType}>{room.type}</Text>

                        {/* Room Features */}
                        <View style={styles.roomFeatures}>
                          <View style={styles.featureItem}>
                            <Users size={14} color={colors.text.secondary} strokeWidth={2} />
                            <Text style={styles.featureText}>
                              {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}
                            </Text>
                          </View>
                          <View style={styles.featureItem}>
                            <Wifi size={14} color={colors.text.secondary} strokeWidth={2} />
                            <Text style={styles.featureText}>WiFi grátis</Text>
                          </View>
                          <View style={styles.featureItem}>
                            <Bed size={14} color={colors.text.secondary} strokeWidth={2} />
                            <Text style={styles.featureText}>King size</Text>
                          </View>
                        </View>
                      </View>

                      {/* Price and Action */}
                      <View style={styles.roomBottomSection}>
                        <View style={styles.priceContainer}>
                          <Text style={styles.roomPriceLabel}>A partir de</Text>
                          <View style={styles.priceRow}>
                            <Text style={styles.roomPrice}>{formatCurrency(room.price)}</Text>
                            <Text style={styles.priceNight}>/noite</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={styles.bookButton}
                          onPress={() => handleSelectRoom(index)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.bookButtonText}>Reservar</Text>
                          <ArrowRight
                            size={16}
                            color={colors.white}
                            strokeWidth={2.5}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noRoomsText}>Nenhum quarto disponível</Text>
              )}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  heroContainer: {
    height: 380,
    width: '100%',
    position: 'relative',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  badgesContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    zIndex: 10,
  },
  fomoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  infoBadge: {
    backgroundColor: 'rgba(14, 100, 210, 0.4)',
  },
  urgentBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.4)',
  },
  successBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.4)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: colors.gray500,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  reviews: {
    fontSize: 14,
    color: colors.gray400,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickInfoIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickInfoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 22,
  },
  quickInfoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  amenitiesBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary + '40',
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  amenityBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  overallRatingCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingScoreSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
    borderRightWidth: 1.5,
    borderRightColor: colors.border,
    gap: 8,
  },
  ratingScoreLarge: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.text.primary,
    lineHeight: 52,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.secondary,
    marginTop: 4,
  },
  ratingBreakdown: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  breakdownLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.secondary,
    width: 80,
  },
  breakdownBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.gray100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  breakdownScore: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
    width: 32,
    textAlign: 'right',
  },
  recentReviews: {
    gap: 16,
  },
  reviewItem: {
    backgroundColor: colors.gray50,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    flex: 1,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerInitials: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
  reviewDate: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reviewScore: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
  },
  reviewText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  roomsContainer: {
    gap: 16,
  },
  roomCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  roomIconContainer: {
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'flex-end',
  },
  roomIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  roomCardContent: {
    padding: 20,
    gap: 16,
  },
  roomMainInfo: {
    gap: 12,
  },
  roomType: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  roomFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.gray50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  capacityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.gray100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  capacityBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  roomBottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  priceContainer: {
    flex: 1,
  },
  roomPriceLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  roomPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 30,
  },
  priceNight: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  noRoomsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    padding: 24,
  },
});
