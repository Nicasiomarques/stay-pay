import { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts';
import {
  usePopularHotels,
  useDeals,
  useTrendingDestinations,
  useLastMinuteDeals,
  useUserProfile,
} from '@/hooks/queries';
import {
  SearchHeader,
  HotelCardCompact,
  DealCard,
  DestinationCard,
  RecentlyViewedCard,
  LastMinuteCard,
  SectionHeader,
} from '@/components/home-screen';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { FilterBottomSheet } from '@/components/filters/FilterBottomSheet';
import { SearchModal } from '@/components/search';
import { FilterState } from '@/components/filters/FilterBottomSheet';
import { haptics } from '@/utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = SCREEN_WIDTH * 0.45;

export default function HomeScreen() {
  const router = useRouter();
  const { setSearchLocation } = useBooking();
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  // Fetch data from API
  const { data: popularHotels, isLoading: isLoadingHotels } = usePopularHotels();
  const { data: deals, isLoading: isLoadingDeals } = useDeals();
  const { data: trendingDestinations, isLoading: isLoadingDestinations } = useTrendingDestinations();
  const { data: lastMinuteDeals, isLoading: isLoadingLastMinute } = useLastMinuteDeals();
  const { data: userProfile } = useUserProfile();
  const { recentlyViewed } = useRecentlyViewed();

  // Get first name from profile
  const firstName = userProfile?.name?.split(' ')[0];

  const handleSearchPress = () => {
    haptics.light();
    setSearchModalVisible(true);
  };

  const handleFilterPress = () => {
    haptics.light();
    setFilterVisible(true);
  };

  const handleSearchFromModal = (selectedLocation: string) => {
    haptics.medium();
    setSearchLocation(selectedLocation);
    router.push('/search');
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    haptics.medium();
  };

  const handleDestinationPress = (destination: string) => {
    haptics.light();
    setSearchLocation(destination);
    router.push('/search');
  };

  const handleSeeAll = () => {
    haptics.light();
    router.push('/search');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Search Header */}
        <SearchHeader
          onSearchPress={handleSearchPress}
          onFilterPress={handleFilterPress}
          userName={firstName}
        />

        {/* Ofertas Especiais */}
        <View className="mt-6">
          <SectionHeader title="Ofertas Especiais" onSeeAll={handleSeeAll} />
          {isLoadingDeals ? (
            <View className="p-10 items-center">
              <Text className="text-sm text-gray-500">A carregar...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {deals?.map((deal) => (
                <DealCard
                  key={deal.id}
                  title={deal.title}
                  subtitle={deal.subtitle}
                  discount={deal.discount}
                  image={deal.image}
                  backgroundColor={deal.backgroundColor}
                  onPress={handleSeeAll}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Destinos em Alta */}
        <View className="mt-6">
          <SectionHeader title="Destinos em Alta" onSeeAll={handleSeeAll} />
          {isLoadingDestinations ? (
            <View className="p-10 items-center">
              <Text className="text-sm text-gray-500">A carregar...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {trendingDestinations?.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  name={destination.name}
                  province={destination.province}
                  image={destination.image}
                  hotelsCount={destination.hotelsCount}
                  trending={destination.trending}
                  onPress={() => handleDestinationPress(destination.name)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Perto de Você */}
        <View className="mt-6">
          <SectionHeader title="Perto de Você" onSeeAll={handleSeeAll} />
          {isLoadingHotels ? (
            <View className="p-10 items-center">
              <Text className="text-sm text-gray-500">A carregar...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: CARD_GAP }}
            >
              {popularHotels?.slice(0, 6).map((hotel) => (
                <HotelCardCompact
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  image={hotel.image}
                  rating={hotel.rating}
                  price={hotel.price}
                  style={{ width: CARD_WIDTH }}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Ofertas de Última Hora */}
        <View className="mt-6">
          <SectionHeader title="Última Hora" onSeeAll={handleSeeAll} />
          {isLoadingLastMinute ? (
            <View className="p-10 items-center">
              <Text className="text-sm text-gray-500">A carregar...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {lastMinuteDeals?.map((deal) => (
                <LastMinuteCard
                  key={deal.id}
                  id={deal.id}
                  name={deal.name}
                  location={deal.location}
                  image={deal.image}
                  rating={deal.rating}
                  originalPrice={deal.originalPrice}
                  discountedPrice={deal.discountedPrice}
                  expiresIn={deal.expiresIn}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Vistos Recentemente */}
        {recentlyViewed.length > 0 && (
          <View className="mt-6">
            <SectionHeader title="Vistos Recentemente" showSeeAll={false} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {recentlyViewed.map((hotel) => (
                <RecentlyViewedCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  image={hotel.image}
                  rating={hotel.rating}
                  price={hotel.price}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Mais Populares */}
        <View className="mt-6">
          <SectionHeader title="Mais Populares" onSeeAll={handleSeeAll} />
          {isLoadingHotels ? (
            <View className="p-10 items-center">
              <Text className="text-sm text-gray-500">A carregar...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: CARD_GAP }}
            >
              {popularHotels?.slice(0, 8).map((hotel) => (
                <HotelCardCompact
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  image={hotel.image}
                  rating={hotel.rating}
                  price={hotel.price}
                  style={{ width: CARD_WIDTH }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        initialFilters={activeFilters || undefined}
        onApplyFilters={handleApplyFilters}
        resultsCount={popularHotels?.length || 0}
      />

      {/* Search Modal */}
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        initialValue=""
        onSearch={handleSearchFromModal}
      />
    </SafeAreaView>
  );
}
