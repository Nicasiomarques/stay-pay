import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useBooking } from '@context';
import { usePopularHotels } from '@/hooks/queries';
import {
  SearchHeader,
  HotelCardCompact,
  DealCard,
  DestinationCard,
  RecentlyViewedCard,
  LastMinuteCard,
} from '@/components/home';
import { FilterBottomSheet } from '@/components/filters/FilterBottomSheet';
import { SearchModal } from '@/components/search';
import { FilterState } from '@/components/filters/FilterBottomSheet';
import { haptics } from '@/utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = SCREEN_WIDTH * 0.45;

// Ofertas especiais
const DEALS = [
  {
    id: '1',
    title: 'Fim de Semana em Luanda',
    subtitle: 'Hotéis selecionados',
    discount: 25,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    backgroundColor: '#0E64D2',
  },
  {
    id: '2',
    title: 'Escapada ao Mussulo',
    subtitle: 'Resorts à beira-mar',
    discount: 30,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
    backgroundColor: '#10B981',
  },
  {
    id: '3',
    title: 'Aventura na Kalandula',
    subtitle: 'Lodges e pousadas',
    discount: 20,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
    backgroundColor: '#F59E0B',
  },
];

// Destinos em alta em Angola
const TRENDING_DESTINATIONS = [
  {
    id: '1',
    name: 'Luanda',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    hotelsCount: 156,
    trending: true,
  },
  {
    id: '2',
    name: 'Ilha do Mussulo',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    hotelsCount: 24,
    trending: true,
  },
  {
    id: '3',
    name: 'Benguela',
    province: 'Benguela',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400',
    hotelsCount: 45,
    trending: false,
  },
  {
    id: '4',
    name: 'Lubango',
    province: 'Huíla',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    hotelsCount: 32,
    trending: true,
  },
  {
    id: '5',
    name: 'Namibe',
    province: 'Namibe',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400',
    hotelsCount: 18,
    trending: false,
  },
];

// Ofertas de última hora (mock data)
const LAST_MINUTE_DEALS = [
  {
    id: 1,
    name: 'Hotel Presidente Luanda',
    location: 'Luanda, Ingombota',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    rating: 4.8,
    originalPrice: 85000,
    discountedPrice: 59500,
    expiresIn: '2h 30m',
  },
  {
    id: 2,
    name: 'Tropico Hotel',
    location: 'Luanda, Maianga',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    rating: 4.5,
    originalPrice: 65000,
    discountedPrice: 48750,
    expiresIn: '5h 15m',
  },
  {
    id: 3,
    name: 'Epic Sana Luanda',
    location: 'Luanda, Talatona',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    rating: 4.9,
    originalPrice: 120000,
    discountedPrice: 84000,
    expiresIn: '1h 45m',
  },
];

// Section Header Component
function SectionHeader({
  title,
  onSeeAll,
  showSeeAll = true,
}: {
  title: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
}) {
  return (
    <View className="flex-row justify-between items-center px-5 mb-4">
      <Text className="text-lg font-bold text-gray-900">{title}</Text>
      {showSeeAll && onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text className="text-sm font-semibold text-primary">Ver todos</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { setSearchLocation } = useBooking();
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  // Fetch popular hotels
  const { data: popularHotels, isLoading } = usePopularHotels();

  // Mock recently viewed (in real app, would come from AsyncStorage)
  const recentlyViewed = popularHotels?.slice(0, 4) || [];

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
        />

        {/* Ofertas Especiais */}
        <View className="mt-6">
          <SectionHeader title="Ofertas Especiais" onSeeAll={handleSeeAll} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {DEALS.map((deal) => (
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
        </View>

        {/* Destinos em Alta */}
        <View className="mt-6">
          <SectionHeader title="Destinos em Alta" onSeeAll={handleSeeAll} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {TRENDING_DESTINATIONS.map((destination) => (
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
        </View>

        {/* Perto de Você */}
        <View className="mt-6">
          <SectionHeader title="Perto de Você" onSeeAll={handleSeeAll} />
          {isLoading ? (
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {LAST_MINUTE_DEALS.map((deal) => (
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
          {isLoading ? (
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
