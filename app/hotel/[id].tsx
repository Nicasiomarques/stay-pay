import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Star,
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  Users,
  Bed,
  Bath,
  Waves,
  Baby,
  Accessibility,
  Car,
  ChevronRight,
} from 'lucide-react-native';
import { useBooking } from '@context';
import { useHotel, useFavorites, useToggleFavorite, useHotelReviews } from '@/hooks/queries';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';
import { colors } from '@theme';

export default function HotelDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { setHotel, setSelectedRoom } = useBooking();

  const hotelId = Number(id);
  const { data: hotel, isLoading, error } = useHotel(hotelId);
  const { data: favorites } = useFavorites();
  const toggleFavoriteMutation = useToggleFavorite();
  const { data: reviewsData } = useHotelReviews(hotelId, { limit: 3 });
  const { addRecentlyViewed } = useRecentlyViewed();

  // Check if hotel is in favorites
  const isFavorite = favorites?.some((fav) => fav.hotelId === hotelId) ?? false;

  // Add to recently viewed when hotel data loads
  useEffect(() => {
    if (hotel) {
      addRecentlyViewed(hotel);
    }
  }, [hotel, addRecentlyViewed]);

  const [currentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const heartRef = useRef<Animatable.View & View>(null);

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const handleFavorite = () => {
    haptics.medium();
    heartRef.current?.pulse?.(400);
    toggleFavoriteMutation.mutate({ hotelId, isFavorite });
  };

  const handleShare = async () => {
    haptics.light();
    if (hotel) {
      try {
        await Share.share({
          message: `Check out ${hotel.name}! ${hotel.location}`,
          title: hotel.name,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleBookNow = () => {
    haptics.medium();
    if (hotel) {
      setHotel(hotel);
      setSelectedRoom(0);
      router.push('/calendar');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-base text-gray-500">A carregar...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !hotel) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center gap-4">
          <Text className="text-lg font-semibold text-gray-900">Hotel não encontrado</Text>
          <TouchableOpacity onPress={handleBack}>
            <Text className="text-base font-semibold text-secondary">Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const images = hotel.images || [hotel.image];
  const totalImages = images.length;
  const pricePerNight = hotel.price;
  const nights = 4; // Example: 4 nights
  const totalPrice = pricePerNight * nights;

  // Highlights from Figma
  const highlights = [
    { icon: Waves, label: 'Piscina' },
    { icon: Baby, label: 'Ideal para crianças' },
    { icon: Accessibility, label: 'Acessível' },
    { icon: Car, label: 'Estacionamento grátis' },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Animatable.View animation="fadeIn" duration={400} className="h-96 w-full relative overflow-hidden rounded-b-3xl">
          <Image
            source={{ uri: images[currentImageIndex] }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Image Counter */}
          <Animatable.View
            animation="fadeIn"
            delay={300}
            className="absolute top-[60px] right-5 bg-black/50 px-3 py-1.5 rounded-2xl"
          >
            <Text className="text-[13px] font-semibold text-white">
              {currentImageIndex + 1}/{totalImages}
            </Text>
          </Animatable.View>

          {/* Floating Header */}
          <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
            <View className="flex-row justify-between items-center px-5 pt-2">
              {/* Back Button */}
              <Animatable.View animation="fadeIn" delay={200}>
                <TouchableOpacity
                  className="w-11 h-11 rounded-full bg-black/30 items-center justify-center"
                  onPress={handleBack}
                  activeOpacity={0.8}
                >
                  <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
              </Animatable.View>

              {/* Right Buttons */}
              <View className="flex-row gap-3">
                <Animatable.View ref={heartRef} animation="fadeIn" delay={300}>
                  <TouchableOpacity
                    className="w-11 h-11 rounded-full bg-black/30 items-center justify-center"
                    onPress={handleFavorite}
                    activeOpacity={0.8}
                  >
                    <Heart
                      size={22}
                      color="#FFFFFF"
                      fill={isFavorite ? '#FFFFFF' : 'transparent'}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                </Animatable.View>
                <Animatable.View animation="fadeIn" delay={400}>
                  <TouchableOpacity
                    className="w-11 h-11 rounded-full bg-black/30 items-center justify-center"
                    onPress={handleShare}
                    activeOpacity={0.8}
                  >
                    <Share2 size={22} color="#FFFFFF" strokeWidth={2} />
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </View>
          </SafeAreaView>
        </Animatable.View>

        {/* Content */}
        <View className="p-5 pb-[120px]">
          {/* Hotel Name */}
          <Animatable.Text
            animation="fadeInUp"
            delay={100}
            duration={500}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            {hotel.name}
          </Animatable.Text>

          {/* Location & Rating Row */}
          <Animatable.View
            animation="fadeInUp"
            delay={200}
            duration={500}
            className="flex-row items-center justify-between mb-4"
          >
            <View className="flex-row items-center gap-1">
              <MapPin size={16} color="#737373" strokeWidth={2} />
              <Text className="text-sm text-gray-500">{hotel.location}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
              <Text className="text-sm font-semibold text-gray-900">{hotel.rating}</Text>
              <Text className="text-sm text-gray-500">
                ({(hotel.reviews / 1000).toFixed(1)}k avaliações)
              </Text>
              <ChevronRight size={16} color="#737373" strokeWidth={2} />
            </View>
          </Animatable.View>

          {/* Specs Row */}
          <Animatable.View
            animation="fadeIn"
            delay={300}
            duration={500}
            className="flex-row items-center py-4 border-t border-b border-gray-200 mb-6"
          >
            <View className="flex-row items-center gap-2">
              <Users size={18} color="#737373" strokeWidth={2} />
              <Text className="text-sm text-gray-500 font-medium">4 Hóspedes</Text>
            </View>
            <View className="w-1 h-1 rounded-full bg-gray-300 mx-4" />
            <View className="flex-row items-center gap-2">
              <Bed size={18} color="#737373" strokeWidth={2} />
              <Text className="text-sm text-gray-500 font-medium">2 Camas</Text>
            </View>
            <View className="w-1 h-1 rounded-full bg-gray-300 mx-4" />
            <View className="flex-row items-center gap-2">
              <Bath size={18} color="#737373" strokeWidth={2} />
              <Text className="text-sm text-gray-500 font-medium">2 Casas de banho</Text>
            </View>
          </Animatable.View>

          {/* Highlights Section */}
          <Animatable.View animation="fadeInUp" delay={400} duration={500} className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Destaques</Text>
            <View className="flex-row flex-wrap gap-3">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <Animatable.View
                    key={index}
                    animation="fadeIn"
                    delay={500 + index * 100}
                    className="flex-row items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl"
                  >
                    <IconComponent size={20} color="#737373" strokeWidth={1.5} />
                    <Text className="text-sm text-neutral-600 font-medium">{highlight.label}</Text>
                  </Animatable.View>
                );
              })}
            </View>
          </Animatable.View>

          {/* Description Section */}
          <Animatable.View animation="fadeInUp" delay={600} duration={500} className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Descrição</Text>
            <Text
              className="text-[15px] text-neutral-600 leading-6"
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {hotel.description ||
                'Um hotel encantador que oferece uma experiência única de hospedagem. Localização privilegiada, quartos confortáveis e serviço de excelência para tornar a sua estadia inesquecível.'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              activeOpacity={0.7}
            >
              <Text className="text-[15px] font-semibold text-primary mt-1">
                {showFullDescription ? 'Menos' : '...Mais'}
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Reviews Section */}
          {reviewsData && reviewsData.reviews.length > 0 && (
            <Animatable.View animation="fadeInUp" delay={700} duration={500} className="mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-semibold text-gray-900">Avaliações</Text>
                <View className="flex-row items-center gap-1">
                  <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
                  <Text className="text-sm font-semibold text-gray-900">
                    {reviewsData.averageRating.toFixed(1)}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    ({reviewsData.total} avaliações)
                  </Text>
                </View>
              </View>

              {/* Reviews List */}
              <View className="gap-4">
                {reviewsData.reviews.map((review, index) => (
                  <Animatable.View
                    key={review.id}
                    animation="fadeIn"
                    delay={800 + index * 100}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <View className="flex-row items-center gap-3 mb-3">
                      <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                        <Text className="text-lg font-semibold text-gray-600">
                          {review.author.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-gray-900">
                          {review.author.name}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1 bg-amber-100 px-2 py-1 rounded-lg">
                        <Star size={12} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
                        <Text className="text-xs font-semibold text-amber-700">
                          {review.rating}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm text-gray-600 leading-5" numberOfLines={3}>
                      {review.comment}
                    </Text>
                  </Animatable.View>
                ))}
              </View>

              {/* View All Reviews Button */}
              {reviewsData.total > 3 && (
                <TouchableOpacity
                  className="mt-4 py-3 items-center border border-gray-200 rounded-xl"
                  activeOpacity={0.7}
                >
                  <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                    Ver todas as {reviewsData.total} avaliações
                  </Text>
                </TouchableOpacity>
              )}
            </Animatable.View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <Animatable.View
        animation="slideInUp"
        delay={300}
        duration={500}
        className="absolute bottom-6 left-4 right-4 flex-row items-center justify-between px-5 py-4 bg-neutral-900 rounded-full"
        style={shadows.hero}
      >
        <View className="flex-1">
          <Text className="text-sm text-gray-400">
            {nights} noites · €{pricePerNight.toLocaleString()}/noite
          </Text>
          <Text className="text-xl font-bold text-white">€{totalPrice.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          className="bg-white px-6 py-3 rounded-full"
          onPress={handleBookNow}
          activeOpacity={0.9}
        >
          <Text className="text-sm font-bold text-neutral-900">Reservar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
