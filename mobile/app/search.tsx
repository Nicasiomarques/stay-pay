import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { HotelCard } from '@components';
import { useBooking } from '@context';
import { colors } from '@theme';

// Mock data temporário - depois será substituído por React Query
const mockHotels = [
  {
    id: 1,
    name: 'Hotel Trópico',
    location: 'Luanda, Angola',
    rating: 4.8,
    reviews: 245,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    distance: '2.5 km',
    description: 'Hotel de luxo no coração de Luanda',
    amenities: ['Wi-Fi', 'Piscina', 'Restaurante'],
    images: [],
    rooms: [
      { id: '1', type: 'Standard', price: 25000, capacity: 2 },
      { id: '2', type: 'Deluxe', price: 35000, capacity: 3 },
    ],
  },
  {
    id: 2,
    name: 'Epic Sana Luanda',
    location: 'Luanda, Angola',
    rating: 4.9,
    reviews: 389,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    distance: '1.2 km',
    description: 'Resort à beira-mar com vistas espetaculares',
    amenities: ['Wi-Fi', 'Spa', 'Piscina'],
    images: [],
    rooms: [
      { id: '1', type: 'Ocean View', price: 45000, capacity: 2 },
      { id: '2', type: 'Suite', price: 65000, capacity: 4 },
    ],
  },
  {
    id: 3,
    name: 'Hotel Baía',
    location: 'Luanda, Angola',
    rating: 4.5,
    reviews: 156,
    price: 18000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    distance: '3.8 km',
    description: 'Hotel económico com excelente localização',
    amenities: ['Wi-Fi', 'Estacionamento'],
    images: [],
    rooms: [
      { id: '1', type: 'Standard', price: 18000, capacity: 2 },
    ],
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const { booking } = useBooking();
  const isLoading = false;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Procurando hotéis...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {booking.searchLocation || 'Todos os hotéis'}
        </Text>
        <Text style={styles.subtitle}>
          {mockHotels.length} hotel{mockHotels.length !== 1 ? 's' : ''} encontrado{mockHotels.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Hotel List */}
      <FlatList
        data={mockHotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HotelCard
            id={item.id}
            image={item.image}
            name={item.name}
            location={item.location}
            rating={item.rating}
            reviews={item.reviews}
            price={item.price}
            distance={item.distance}
            hotelData={item}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.secondary,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  list: {
    padding: 24,
  },
});
