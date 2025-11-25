import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal, Shield, Award, Clock, Zap, MapPin, Users } from 'lucide-react-native';
import { Button, Input } from '@/components/ui';
import { HotelCard } from '@components';
import { TrustSignalItem } from '@/components/shared/TrustSignalItem';
import { TrendingDestinationCard } from '@/components/shared/TrendingDestinationCard';
import { CollectionCard } from '@/components/shared/CollectionCard';
import { PersonalizedHeroCard } from '@/components/shared/PersonalizedHeroCard';
import { StickySearchBar } from '@/components/shared/StickySearchBar';
import { useBooking } from '@context';
import { useFeaturedHotels, usePopularHotels } from '@/hooks/queries';
import { useTrendingDestinations } from '@/hooks/useTrendingDestinations';
import { useCollections } from '@/hooks/useCollections';
import { usePersonalization } from '@/hooks/usePersonalization';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useFilteredHotels } from '@/hooks/useFilteredHotels';
import { FilterBottomSheet } from '@/components/filters/FilterBottomSheet';
import { SearchModal } from '@/components/search';
import { SkeletonHotelCard } from '@/components/skeletons';
import { FilterState } from '@/types/filters';
import { QUICK_FILTERS } from '@/constants/filters';
import { haptics } from '@/utils/haptics';
import { colors } from '@theme';

export default function HomeScreen() {
  const router = useRouter();
  const { booking, setSearchLocation, setGuests } = useBooking();
  const [location, setLocation] = useState(booking.searchLocation);
  const [guests, setGuestsInput] = useState(booking.guests.toString());
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  // Fetch featured and popular hotels
  const { data: featuredHotels, isLoading: isFeaturedLoading } = useFeaturedHotels();
  const { data: popularHotels, isLoading: isPopularLoading } = usePopularHotels();

  // Fetch trending destinations and collections
  const trendingDestinations = useTrendingDestinations();
  const collections = useCollections();

  // Personalization and scroll tracking
  const personalization = usePersonalization();
  const { isVisible: isStickyVisible, handleScroll } = useScrollPosition({ threshold: 150 });

  // Apply filters to hotels
  const allFeaturedHotels = featuredHotels || [];
  const allPopularHotels = popularHotels || [];

  const filteredFeatured = useFilteredHotels(
    allFeaturedHotels,
    activeFilters || {
      priceRange: [0, 600000],
      propertyTypes: [],
      amenities: [],
      minRating: 0,
      guestCapacity: undefined,
      specialFeatures: [],
    }
  );

  const filteredPopular = useFilteredHotels(
    allPopularHotels,
    activeFilters || {
      priceRange: [0, 600000],
      propertyTypes: [],
      amenities: [],
      minRating: 0,
      guestCapacity: undefined,
      specialFeatures: [],
    }
  );

  const displayFeaturedHotels = activeFilters ? filteredFeatured : allFeaturedHotels;
  const displayPopularHotels = activeFilters ? filteredPopular : allPopularHotels;

  const handleSearch = () => {
    haptics.medium();
    setSearchLocation(location);
    const guestsNum = guests ? parseInt(guests) : 1;
    if (guests) {
      setGuests(guestsNum);
    }
    // Save to personalization history
    if (location) {
      personalization.addSearchToHistory(location, guestsNum);
    }
    router.push('/search');
  };

  const handleSearchFromModal = (selectedLocation: string) => {
    haptics.medium();
    setLocation(selectedLocation);
    setSearchLocation(selectedLocation);
    const guestsNum = guests ? parseInt(guests) : 1;
    if (guests) {
      setGuests(guestsNum);
    }
    // Save to personalization history
    personalization.addSearchToHistory(selectedLocation, guestsNum);
    router.push('/search');
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    haptics.medium();
  };

  const handleQuickFilter = (filterId: string) => {
    const quickFilter = QUICK_FILTERS.find(f => f.id === filterId);
    if (!quickFilter) return;

    haptics.light();

    const newFilters: FilterState = {
      priceRange: [0, 600000],
      propertyTypes: [],
      amenities: [],
      minRating: 0,
      guestCapacity: undefined,
      specialFeatures: [],
    };

    switch (quickFilter.filterKey) {
      case 'amenities':
        newFilters.amenities = quickFilter.value as string[];
        break;
      case 'minRating':
        newFilters.minRating = quickFilter.value as number;
        break;
      case 'priceRange':
        newFilters.priceRange = quickFilter.value as [number, number];
        break;
      case 'propertyTypes':
        newFilters.propertyTypes = quickFilter.value as string[];
        break;
    }

    setActiveFilters(newFilters);
  };

  const activeFilterCount = activeFilters
    ? Object.values(activeFilters).filter((value) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'number') return value > 0;
        return false;
      }).length
    : 0;

  const totalHotels = displayFeaturedHotels.length + displayPopularHotels.length;

  // Determine hero variant based on personalization data
  const getHeroVariant = () => {
    if (personalization.isFirstVisit) return 'welcome';
    if (personalization.lastSearch) return 'continue';
    if (personalization.recommendedDestination) return 'recommended';
    return 'welcome';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Search Bar */}
      <StickySearchBar
        isVisible={isStickyVisible}
        location={location}
        onSearchPress={() => setSearchModalVisible(true)}
        onFilterPress={() => setFilterVisible(true)}
        filterCount={activeFilterCount}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, '#1E88E5', colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.title}>Encontre a sua{'\n'}estadia perfeita</Text>
          <Text style={styles.subtitle}>
            Milhares de hotéis à sua escolha
          </Text>
        </LinearGradient>

        {/* Personalized Hero Card */}
        {!personalization.isLoading && (
          <PersonalizedHeroCard
            variant={getHeroVariant()}
            lastSearchLocation={personalization.lastSearch?.location}
            recommendedDestination={personalization.recommendedDestination}
            onCTAPress={() => {
              if (personalization.lastSearch) {
                setLocation(personalization.lastSearch.location);
                setSearchLocation(personalization.lastSearch.location);
                setGuestsInput(personalization.lastSearch.guests.toString());
                router.push('/search');
              } else {
                setSearchModalVisible(true);
              }
            }}
          />
        )}

        {/* Filter Chips Section */}
        <View style={styles.filterChipsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChipsContent}
          >
            {/* Filter Button */}
            <Pressable
              style={[styles.filterChip, activeFilterCount > 0 && styles.filterChipActive]}
              onPress={() => {
                haptics.light();
                setFilterVisible(true);
              }}
            >
              <SlidersHorizontal size={16} color={activeFilterCount > 0 ? colors.white : colors.text.primary} />
              <Text style={[styles.filterChipText, activeFilterCount > 0 && styles.filterChipTextActive]}>
                Filtros
              </Text>
              {activeFilterCount > 0 && (
                <View style={styles.chipBadge}>
                  <Text style={styles.chipBadgeText}>{activeFilterCount}</Text>
                </View>
              )}
            </Pressable>

            {/* Quick Filter Chips */}
            {QUICK_FILTERS.map((filter) => (
              <Pressable
                key={filter.id}
                style={styles.filterChip}
                onPress={() => handleQuickFilter(filter.id)}
              >
                <Text style={styles.filterChipText}>{filter.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Active Filters Info */}
        {activeFilterCount > 0 && (
          <View style={styles.filterInfo}>
            <Text style={styles.filterInfoText}>
              {totalHotels} hotel{totalHotels !== 1 ? 's' : ''} • {activeFilterCount} filtro{activeFilterCount !== 1 ? 's' : ''} ativo{activeFilterCount !== 1 ? 's' : ''}
            </Text>
            <Pressable
              onPress={() => {
                haptics.light();
                setActiveFilters(null);
              }}
            >
              <Text style={styles.clearFiltersText}>Limpar</Text>
            </Pressable>
          </View>
        )}

        {/* Search Section - Unified Input */}
        <View style={styles.searchSection}>
          <Pressable
            style={styles.unifiedSearchCard}
            onPress={() => {
              haptics.light();
              setSearchModalVisible(true);
            }}
          >
            {/* Destination Row */}
            <View style={styles.searchRow}>
              <View style={styles.searchIconBadge}>
                <MapPin size={18} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.searchRowContent}>
                <Text style={styles.searchRowLabel}>Destino</Text>
                <Text
                  style={[
                    styles.searchRowValue,
                    !location && styles.searchRowPlaceholder,
                  ]}
                  numberOfLines={1}
                >
                  {location || 'Para onde vai?'}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.searchDivider} />

            {/* Guests Row */}
            <View style={styles.searchRow}>
              <View style={styles.searchIconBadge}>
                <Users size={18} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.searchRowContent}>
                <Text style={styles.searchRowLabel}>Hóspedes</Text>
                <Text
                  style={[
                    styles.searchRowValue,
                    !guests && styles.searchRowPlaceholder,
                  ]}
                >
                  {guests ? `${guests} ${parseInt(guests) === 1 ? 'pessoa' : 'pessoas'}` : 'Quantas pessoas?'}
                </Text>
              </View>
            </View>
          </Pressable>

          <Button
            size="lg"
            fullWidth
            onPress={handleSearch}
            disabled={!location}
          >
            <Search size={20} color={colors.white} strokeWidth={2} />
            <Text>Pesquisar</Text>
          </Button>
        </View>

        {/* Trending Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destinos em Alta</Text>
            <Text style={styles.sectionSubtitle}>Lugares mais procurados agora</Text>
          </View>
          <FlatList
            horizontal
            data={trendingDestinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TrendingDestinationCard
                destination={item.destination}
                country={item.country}
                hotelCount={item.hotelCount}
                image={item.image}
                trendPercentage={item.trendPercentage}
                averagePrice={item.averagePrice}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Collections */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Coleções Especiais</Text>
            <Text style={styles.sectionSubtitle}>Experiências curadas para você</Text>
          </View>
          <FlatList
            horizontal
            data={collections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CollectionCard
                id={item.id}
                title={item.title}
                description={item.description}
                hotelCount={item.hotelCount}
                image={item.image}
                emoji={item.emoji}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Featured Hotels */}
        {isFeaturedLoading ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hotéis em Destaque</Text>
            </View>
            <FlatList
              horizontal
              data={[1, 2, 3]}
              keyExtractor={(item) => `skeleton-featured-${item}`}
              renderItem={() => (
                <View style={styles.cardWrapper}>
                  <SkeletonHotelCard />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        ) : displayFeaturedHotels && displayFeaturedHotels.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hotéis em Destaque</Text>
            </View>
            <FlatList
              horizontal
              data={displayFeaturedHotels.slice(0, 5)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.cardWrapper}>
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
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        ) : null}

        {/* Popular Hotels */}
        {isPopularLoading ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hotéis Populares</Text>
            </View>
            <FlatList
              horizontal
              data={[1, 2, 3]}
              keyExtractor={(item) => `skeleton-popular-${item}`}
              renderItem={() => (
                <View style={styles.cardWrapper}>
                  <SkeletonHotelCard />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        ) : displayPopularHotels && displayPopularHotels.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Hotéis Populares</Text>
            </View>
            <FlatList
              horizontal
              data={displayPopularHotels.slice(0, 5)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.cardWrapper}>
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
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        ) : null}

        {/* Trust Signals */}
        <View style={styles.trustSection}>
          <Text style={styles.trustSectionTitle}>Por que reservar conosco?</Text>

          <TrustSignalItem
            icon={Shield}
            iconColor="#10B981"
            title="Reservas Seguras"
            description="Proteção total dos seus dados e pagamentos"
          />

          <TrustSignalItem
            icon={Award}
            iconColor="#F59E0B"
            title="Avaliações Verificadas"
            description="Mais de 2 milhões de reviews autênticas"
          />

          <TrustSignalItem
            icon={Zap}
            iconColor={colors.primary}
            title="Confirmação Instantânea"
            description="Receba sua reserva em segundos"
          />

          <TrustSignalItem
            icon={Clock}
            iconColor="#8B5CF6"
            title="Suporte 24/7"
            description="Equipe pronta para ajudar quando precisar"
          />
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        initialFilters={activeFilters || undefined}
        onApplyFilters={handleApplyFilters}
        resultsCount={totalHotels}
      />

      {/* Search Modal */}
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        initialValue={location}
        onSearch={handleSearchFromModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    fontWeight: '500',
  },
  filterChipsSection: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterChipsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  filterChipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  chipBadge: {
    backgroundColor: colors.white,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginLeft: 2,
  },
  chipBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  filterInfo: {
    backgroundColor: colors.primary + '10',
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterInfoText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.primary,
  },
  clearFiltersText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  searchSection: {
    backgroundColor: colors.white,
    padding: 24,
    marginTop: 8,
    gap: 16,
  },
  unifiedSearchCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRowContent: {
    flex: 1,
  },
  searchRowLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchRowValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  searchRowPlaceholder: {
    color: colors.text.secondary,
    fontWeight: '500',
  },
  searchDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 12,
  },
  searchInputText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  searchInputPlaceholder: {
    color: colors.text.secondary,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: 280,
    marginHorizontal: 8,
  },
  trustSection: {
    backgroundColor: colors.white,
    padding: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  trustSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
});
