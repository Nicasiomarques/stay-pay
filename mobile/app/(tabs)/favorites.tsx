import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { HotelCard } from '@components';
import { colors } from '@theme';

// Mock data - será substituído por dados reais
const mockFavorites = [
  {
    id: 1,
    name: 'Hotel Trópico',
    location: 'Luanda, Angola',
    rating: 4.8,
    reviews: 245,
    price: 25000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    distance: '2.5 km',
  },
];

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.subtitle}>
          {mockFavorites.length} hotel{mockFavorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {mockFavorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum hotel favorito ainda</Text>
          <Text style={styles.emptySubtext}>
            Adicione hotéis aos favoritos para vê-los aqui
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockFavorites}
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
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
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
    fontSize: 28,
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
