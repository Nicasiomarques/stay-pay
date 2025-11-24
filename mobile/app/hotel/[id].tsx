import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Star, MapPin, Wifi, Droplets, UtensilsCrossed } from 'lucide-react-native';
import { Button } from '@/components/ui';
import { ImageCarousel } from '@/components/shared/ImageCarousel';
import { useBooking } from '@context';
import { formatCurrency } from '@/utils';
import { colors } from '@theme';

// Mock data - substituir por React Query depois
const mockHotelDetails = {
  1: {
    id: 1,
    name: 'Hotel Trópico',
    location: 'Luanda, Angola',
    rating: 4.8,
    reviews: 245,
    price: 25000,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
    ],
    description: 'Hotel de luxo situado no coração de Luanda, oferecendo vistas deslumbrantes da cidade e do oceano. Quartos espaçosos e modernos com todas as comodidades.',
    amenities: [
      { icon: Wifi, label: 'Wi-Fi Gratuito' },
      { icon: Droplets, label: 'Piscina' },
      { icon: UtensilsCrossed, label: 'Restaurante' },
    ],
    rooms: [
      { id: '1', type: 'Standard', price: 25000, capacity: 2 },
      { id: '2', type: 'Deluxe', price: 35000, capacity: 3 },
      { id: '3', type: 'Suite', price: 50000, capacity: 4 },
    ],
  },
  2: {
    id: 2,
    name: 'Epic Sana Luanda',
    location: 'Luanda, Angola',
    rating: 4.9,
    reviews: 389,
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    ],
    description: 'Resort à beira-mar com vistas espetaculares do oceano. Spa de classe mundial, restaurantes gourmet e serviço excepcional.',
    amenities: [
      { icon: Wifi, label: 'Wi-Fi Gratuito' },
      { icon: Droplets, label: 'Spa' },
      { icon: UtensilsCrossed, label: 'Restaurante' },
    ],
    rooms: [
      { id: '1', type: 'Ocean View', price: 45000, capacity: 2 },
      { id: '2', type: 'Suite', price: 65000, capacity: 4 },
    ],
  },
  3: {
    id: 3,
    name: 'Hotel Baía',
    location: 'Luanda, Angola',
    rating: 4.5,
    reviews: 156,
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427',
    ],
    description: 'Hotel económico com excelente localização. Ideal para viajantes de negócios e turistas que procuram conforto a um bom preço.',
    amenities: [
      { icon: Wifi, label: 'Wi-Fi Gratuito' },
    ],
    rooms: [
      { id: '1', type: 'Standard', price: 18000, capacity: 2 },
    ],
  },
};

export default function HotelDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { booking, setHotel, setSelectedRoom } = useBooking();

  const hotelId = Number(id);
  const hotel = mockHotelDetails[hotelId as keyof typeof mockHotelDetails];

  if (!hotel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Hotel não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSelectRoom = (roomIndex: number) => {
    setSelectedRoom(roomIndex);
    router.push('/calendar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <ImageCarousel images={hotel.images} height={300} />

        {/* Hotel Info */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{hotel.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.gray500} />
              <Text style={styles.location}>{hotel.location}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{hotel.rating}</Text>
              <Text style={styles.reviews}>({hotel.reviews} avaliações)</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o Hotel</Text>
            <Text style={styles.description}>{hotel.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comodidades</Text>
            <View style={styles.amenitiesGrid}>
              {hotel.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenity}>
                  <amenity.icon size={20} color={colors.primary} />
                  <Text style={styles.amenityText}>{amenity.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rooms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quartos Disponíveis</Text>
            {hotel.rooms.map((room, index) => (
              <View key={room.id} style={styles.roomCard}>
                <View style={styles.roomInfo}>
                  <Text style={styles.roomType}>{room.type}</Text>
                  <Text style={styles.roomCapacity}>
                    Até {room.capacity} hóspede{room.capacity > 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.roomPrice}>
                    {formatCurrency(room.price)} / noite
                  </Text>
                </View>
                <Button
                  size="sm"
                  onPress={() => handleSelectRoom(index)}
                >
                  Selecionar
                </Button>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 16,
    color: colors.text.secondary,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
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
  amenitiesGrid: {
    gap: 16,
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amenityText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 12,
  },
  roomInfo: {
    flex: 1,
  },
  roomType: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  roomCapacity: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
