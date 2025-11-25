import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, SlidersHorizontal, MapPin } from 'lucide-react-native';

import { useHotels, useSearchHotels } from '@/hooks/queries';
import { useBooking } from '@context';
import { FilterBottomSheet, FilterState } from '@/components/filters/FilterBottomSheet';
import { HotelCardLarge } from '@/components/home';
import { haptics } from '@/utils/haptics';

export default function SearchScreen() {
  const router = useRouter();
  const { booking } = useBooking();
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const { data, isLoading, error } = booking.searchLocation
    ? useSearchHotels(booking.searchLocation)
    : useHotels();

  const hotels = Array.isArray(data) ? data : (data?.hotels || []);

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const handleFilterPress = () => {
    haptics.light();
    setFilterVisible(true);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    haptics.medium();
  };

  const activeFilterCount = activeFilters
    ? Object.values(activeFilters).filter((value) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'number') return value > 0;
        if (typeof value === 'string') return value !== null;
        return false;
      }).length
    : 0;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="mt-4 text-base text-gray-500">Searching hotels...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
        <View className="flex-1 justify-center items-center gap-4">
          <Text className="text-lg font-semibold text-gray-900">Error loading hotels</Text>
          <TouchableOpacity onPress={handleBack}>
            <Text className="text-base font-semibold text-secondary">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center mr-3"
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#171717" strokeWidth={2} />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {booking.searchLocation || 'All Hotels'}
          </Text>
          <View className="flex-row items-center gap-1">
            <MapPin size={14} color="#737373" strokeWidth={2} />
            <Text className="text-sm text-gray-500">
              {hotels.length} {hotels.length === 1 ? 'place' : 'places'} found
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="w-11 h-11 items-center justify-center bg-gray-100 rounded-xl ml-3"
          onPress={handleFilterPress}
          activeOpacity={0.7}
        >
          <SlidersHorizontal size={20} color="#171717" strokeWidth={2} />
          {activeFilterCount > 0 && (
            <View className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] rounded-full bg-secondary items-center justify-center px-1">
              <Text className="text-[11px] font-semibold text-white">
                {activeFilterCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <FlatList
        data={hotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HotelCardLarge
            id={item.id}
            name={item.name}
            location={item.location}
            image={item.image}
            rating={item.rating}
            reviews={item.reviews}
            price={item.price}
          />
        )}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-[60px]">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              No hotels found
            </Text>
            <Text className="text-sm text-gray-500">
              Try adjusting your search or filters
            </Text>
          </View>
        }
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
