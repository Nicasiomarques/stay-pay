import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useBooking } from '@context';
import { usePopularHotels } from '@/hooks/queries';
import { SearchHeader, CategoryCard, HotelCardLarge } from '@/components/home';
import { FilterBottomSheet } from '@/components/filters/FilterBottomSheet';
import { SearchModal } from '@/components/search';
import { FilterState } from '@/components/filters/FilterBottomSheet';
import { haptics } from '@/utils/haptics';

// Categories data based on Figma
const CATEGORIES = [
  {
    id: '1',
    name: 'Mountain',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
  },
  {
    id: '2',
    name: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
  },
  {
    id: '3',
    name: 'Design',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
  },
  {
    id: '4',
    name: 'Island',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { setSearchLocation } = useBooking();
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  // Fetch popular hotels
  const { data: popularHotels, isLoading } = usePopularHotels();

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

  const handleCategoryPress = (category: string) => {
    haptics.light();
    setSearchLocation(category);
    router.push('/search');
  };

  const handleSeeAll = () => {
    haptics.light();
    router.push('/search');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Search Header */}
        <SearchHeader
          onSearchPress={handleSearchPress}
          onFilterPress={handleFilterPress}
        />

        {/* Categories Section */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <Text className="text-xl font-bold text-gray-900">Categories</Text>
            <TouchableOpacity onPress={handleSeeAll} activeOpacity={0.7}>
              <Text className="text-sm font-semibold text-secondary">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                onPress={() => handleCategoryPress(category.name)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Most Popular Section */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <Text className="text-xl font-bold text-gray-900">Most popular</Text>
          </View>

          {isLoading ? (
            <View className="p-10 items-center">
              <Text className="text-sm text-gray-500">Loading...</Text>
            </View>
          ) : (
            <View className="px-5">
              {popularHotels?.slice(0, 5).map((hotel) => (
                <HotelCardLarge
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  image={hotel.image}
                  rating={hotel.rating}
                  reviews={hotel.reviews}
                  price={hotel.price}
                />
              ))}
            </View>
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
