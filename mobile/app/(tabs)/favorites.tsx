import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HotelCard } from '@components';
import { useFavorites } from '@/hooks/queries';
import { colors } from '@theme';

export default function FavoritesScreen() {
  const { data: favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Erro ao carregar favoritos</Text>
          <Text style={styles.errorSubtext}>
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const favoritesList = favorites || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.subtitle}>
          {favoritesList.length} hotel{favoritesList.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favoritesList.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum hotel favorito ainda</Text>
          <Text style={styles.emptySubtext}>
            Adicione hotéis aos favoritos para vê-los aqui
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritesList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HotelCard
              id={item.hotel.id}
              image={item.hotel.image}
              name={item.hotel.name}
              location={item.hotel.location}
              rating={item.hotel.rating}
              reviews={item.hotel.reviews}
              price={item.hotel.price}
              distance={item.hotel.distance}
              hotelData={item.hotel}
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
});
