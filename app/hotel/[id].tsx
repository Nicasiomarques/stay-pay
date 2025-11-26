import { useState, useRef } from 'react';
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
import { useHotel } from '@/hooks/queries';
import { haptics } from '@/utils/haptics';

export default function HotelDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { setHotel, setSelectedRoom } = useBooking();

  const hotelId = Number(id);
  const { data: hotel, isLoading, error } = useHotel(hotelId);

  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const heartRef = useRef<Animatable.View & View>(null);

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const handleFavorite = () => {
    haptics.medium();
    setIsFavorite(!isFavorite);
    heartRef.current?.pulse?.(400);
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
          <Text className="text-base text-gray-500">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !hotel) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center gap-4">
          <Text className="text-lg font-semibold text-gray-900">Hotel not found</Text>
          <TouchableOpacity onPress={handleBack}>
            <Text className="text-base font-semibold text-secondary">Go Back</Text>
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
    { icon: Waves, label: 'Swimming pool' },
    { icon: Baby, label: 'Kid friendly' },
    { icon: Accessibility, label: 'Chair accessible' },
    { icon: Car, label: 'Free parking' },
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
                ({(hotel.reviews / 1000).toFixed(1)}k reviews)
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
              <Text className="text-sm text-gray-500 font-medium">4 Guests</Text>
            </View>
            <View className="w-1 h-1 rounded-full bg-gray-300 mx-4" />
            <View className="flex-row items-center gap-2">
              <Bed size={18} color="#737373" strokeWidth={2} />
              <Text className="text-sm text-gray-500 font-medium">2 Beds</Text>
            </View>
            <View className="w-1 h-1 rounded-full bg-gray-300 mx-4" />
            <View className="flex-row items-center gap-2">
              <Bath size={18} color="#737373" strokeWidth={2} />
              <Text className="text-sm text-gray-500 font-medium">2 Baths</Text>
            </View>
          </Animatable.View>

          {/* Highlights Section */}
          <Animatable.View animation="fadeInUp" delay={400} duration={500} className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Highlights</Text>
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
            <Text className="text-lg font-semibold text-gray-900 mb-4">Description</Text>
            <Text
              className="text-[15px] text-neutral-600 leading-6"
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {hotel.description ||
                'I like traveling, discovering new cultures and traditions, and tasting new cuisines. I enjoy exploring different places and meeting people from various backgrounds.'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              activeOpacity={0.7}
            >
              <Text className="text-[15px] font-semibold text-primary mt-1">
                {showFullDescription ? 'Less' : '...More'}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <Animatable.View
        animation="slideInUp"
        delay={300}
        duration={500}
        className="absolute bottom-6 left-4 right-4 flex-row items-center justify-between px-5 py-4 bg-neutral-900 rounded-full"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 15,
        }}
      >
        <View className="flex-1">
          <Text className="text-sm text-gray-400">
            {nights} days · ${pricePerNight.toLocaleString()}/night
          </Text>
          <Text className="text-xl font-bold text-white">€{totalPrice.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          className="bg-white px-6 py-3 rounded-full"
          onPress={handleBookNow}
          activeOpacity={0.9}
        >
          <Text className="text-sm font-bold text-neutral-900">Book now</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
