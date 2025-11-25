import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SlidersHorizontal } from 'lucide-react-native';

import { useHotels, useSearchHotels } from '@/hooks/queries';
import { HotelCard } from '@components';
import { useBooking } from '@context';
import { colors } from '@theme';
import { FilterBottomSheet } from '@/components/filters/FilterBottomSheet';
import { useFilteredHotels } from '@/hooks/useFilteredHotels';
import { FilterState } from '@/types/filters';

export default function SearchScreen() {
  const { booking } = useBooking();
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const { data, isLoading, error } = booking.searchLocation
    ? useSearchHotels(booking.searchLocation)
    : useHotels();

  const allHotels = Array.isArray(data) ? data : (data?.hotels || []);

  // Apply filters if active
  const filteredHotels = useFilteredHotels(
    allHotels,
    activeFilters || {
      priceRange: [0, 600000],
      propertyTypes: [],
      amenities: [],
      minRating: 0,
      guestCapacity: undefined,
      specialFeatures: [],
    }
  );

  const hotels = activeFilters ? filteredHotels : allHotels;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Procurando hotéis...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Erro ao carregar hotéis</Text>
          <Text style={styles.errorSubtext}>
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const activeFilterCount = activeFilters
    ? Object.values(activeFilters).filter((value) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'number') return value > 0;
        return false;
      }).length
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={styles.title}>
              {booking.searchLocation || 'Todos os hotéis'}
            </Text>
            <Text style={styles.subtitle}>
              {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} encontrado{hotels.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Pressable
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <SlidersHorizontal size={20} color={colors.primary} />
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Hotel List */}
      <FlatList
        data={hotels}
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

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        initialFilters={activeFilters || undefined}
        onApplyFilters={handleApplyFilters}
        resultsCount={hotels.length}
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
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
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
  filterButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: colors.primary + '15',
    borderRadius: 8,
    marginLeft: 12,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
  list: {
    padding: 24,
  },
});
