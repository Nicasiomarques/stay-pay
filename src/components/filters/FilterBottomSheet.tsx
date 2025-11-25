/**
 * FilterBottomSheet Component
 * Redesigned to match Figma design
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Minus, Plus, Star } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Destination types based on Figma
const DESTINATION_TYPES = [
  { id: 'city', label: 'City' },
  { id: 'beach-front', label: 'Beach Front' },
  { id: 'lake', label: 'Lake' },
  { id: 'mountain', label: 'Mountain' },
  { id: 'countryside', label: 'Countryside' },
];

// Rating options based on Figma
const RATING_OPTIONS = [
  { value: 0, label: 'Any' },
  { value: 5, label: '5.0' },
  { value: 4, label: '4.0' },
  { value: 3, label: '3.0' },
];

// Price bar chart data (simulated distribution)
const PRICE_BARS = [
  0.2, 0.4, 0.6, 0.5, 0.7, 0.9, 1.0, 0.8, 0.6, 0.4,
  0.3, 0.5, 0.7, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1, 0.05,
];

export interface FilterState {
  destinationType: string | null;
  priceRange: [number, number];
  minRating: number;
  rooms: number;
  beds: number;
  propertyTypes: string[];
  amenities: string[];
  guestCapacity?: number;
}

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialFilters?: Partial<FilterState>;
  onApplyFilters: (filters: FilterState) => void;
  resultsCount?: number;
}

const DEFAULT_FILTERS: FilterState = {
  destinationType: null,
  priceRange: [20, 680],
  minRating: 0,
  rooms: 2,
  beds: 2,
  propertyTypes: [],
  amenities: [],
};

export function FilterBottomSheet({
  visible,
  onClose,
  initialFilters,
  onApplyFilters,
}: FilterBottomSheetProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  // Animation values
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showContent, setShowContent] = useState(false);

  // Animate on visibility change
  useEffect(() => {
    if (visible) {
      setShowContent(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowContent(false);
      });
    }
  }, [visible, slideAnim, fadeAnim]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    haptics.medium();
    onApplyFilters(filters);
    onClose();
  };

  const handleClearAll = () => {
    haptics.light();
    setFilters(DEFAULT_FILTERS);
  };

  const handleClose = () => {
    haptics.light();
    onClose();
  };

  const incrementCounter = (key: 'rooms' | 'beds') => {
    haptics.light();
    updateFilter(key, Math.min(filters[key] + 1, 10));
  };

  const decrementCounter = (key: 'rooms' | 'beds') => {
    haptics.light();
    updateFilter(key, Math.max(filters[key] - 1, 1));
  };

  if (!showContent) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <Animated.View
        className="absolute inset-0 bg-black/50"
        style={{ opacity: fadeAnim }}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      {/* Modal Content */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden"
        style={{
          height: SCREEN_HEIGHT * 0.85,
          transform: [{ translateY: slideAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
          elevation: 16,
        }}
      >
        <SafeAreaView className="flex-1" edges={['bottom']}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
            <TouchableOpacity
              onPress={handleClose}
              className="w-10 h-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <X size={24} color="#171717" strokeWidth={2} />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-900">Filters</Text>
            <View className="w-10" />
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Destination Type */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-gray-900 mb-4">
                Destination Type
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingRight: 20 }}
              >
                {DESTINATION_TYPES.map((type) => {
                  const isActive = filters.destinationType === type.id;
                  return (
                    <TouchableOpacity
                      key={type.id}
                      className={`px-4 py-2.5 rounded-full border ${
                        isActive
                          ? 'bg-secondary border-secondary'
                          : 'bg-gray-100 border-gray-200'
                      }`}
                      onPress={() => {
                        haptics.light();
                        updateFilter(
                          'destinationType',
                          isActive ? null : type.id
                        );
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          isActive ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Price Section */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-gray-900 mb-4">
                Price
              </Text>

              {/* Bar Chart */}
              <View className="flex-row items-end h-[50px] gap-1 mb-6">
                {PRICE_BARS.map((height, index) => {
                  const barMin = 20 + (index * 660) / 20;
                  const barMax = 20 + ((index + 1) * 660) / 20;
                  const isInRange =
                    barMax >= filters.priceRange[0] &&
                    barMin <= filters.priceRange[1];
                  return (
                    <View
                      key={index}
                      className={`flex-1 rounded-sm min-h-[4px] ${
                        isInRange ? 'bg-secondary' : 'bg-gray-200'
                      }`}
                      style={{ height: 40 * height }}
                    />
                  );
                })}
              </View>

              {/* Price Inputs */}
              <View className="flex-row items-center gap-4">
                <View className="flex-1">
                  <Text className="text-xs font-medium text-gray-500 mb-2">
                    Min
                  </Text>
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
                    <Text className="text-base font-semibold text-gray-900 mr-1">
                      $
                    </Text>
                    <TextInput
                      className="flex-1 text-base font-semibold text-gray-900 p-0"
                      value={String(filters.priceRange[0])}
                      onChangeText={(text) => {
                        const value = parseInt(text) || 0;
                        updateFilter('priceRange', [
                          Math.min(value, filters.priceRange[1] - 10),
                          filters.priceRange[1],
                        ]);
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View className="w-4 h-0.5 bg-gray-300 rounded-sm" />

                <View className="flex-1">
                  <Text className="text-xs font-medium text-gray-500 mb-2">
                    Max
                  </Text>
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
                    <Text className="text-base font-semibold text-gray-900 mr-1">
                      $
                    </Text>
                    <TextInput
                      className="flex-1 text-base font-semibold text-gray-900 p-0"
                      value={String(filters.priceRange[1])}
                      onChangeText={(text) => {
                        const value = parseInt(text) || 0;
                        updateFilter('priceRange', [
                          filters.priceRange[0],
                          Math.max(value, filters.priceRange[0] + 10),
                        ]);
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Rating Section */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-gray-900 mb-4">
                Rating
              </Text>
              <View className="flex-row gap-2">
                {RATING_OPTIONS.map((option) => {
                  const isActive = filters.minRating === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      className={`flex-1 flex-row items-center justify-center gap-1 py-3 rounded-xl border ${
                        isActive
                          ? 'bg-secondary border-secondary'
                          : 'bg-gray-100 border-gray-200'
                      }`}
                      onPress={() => {
                        haptics.light();
                        updateFilter('minRating', option.value);
                      }}
                      activeOpacity={0.7}
                    >
                      {option.value > 0 && (
                        <Star
                          size={14}
                          color={isActive ? '#FFFFFF' : '#F59E0B'}
                          fill="#F59E0B"
                          strokeWidth={0}
                        />
                      )}
                      <Text
                        className={`text-sm font-semibold ${
                          isActive ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Rooms and Beds Section */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-gray-900 mb-4">
                Rooms and Beds
              </Text>

              {/* Rooms Counter */}
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <Text className="text-base font-medium text-gray-900">Rooms</Text>
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity
                    className={`w-9 h-9 rounded-full bg-gray-100 items-center justify-center border border-gray-200 ${
                      filters.rooms <= 1 ? 'opacity-50' : ''
                    }`}
                    onPress={() => decrementCounter('rooms')}
                    disabled={filters.rooms <= 1}
                    activeOpacity={0.7}
                  >
                    <Minus
                      size={18}
                      color={filters.rooms <= 1 ? '#D4D4D4' : '#171717'}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
                    {filters.rooms}
                  </Text>
                  <TouchableOpacity
                    className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
                    onPress={() => incrementCounter('rooms')}
                    activeOpacity={0.7}
                  >
                    <Plus size={18} color="#171717" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Beds Counter */}
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <Text className="text-base font-medium text-gray-900">Beds</Text>
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity
                    className={`w-9 h-9 rounded-full bg-gray-100 items-center justify-center border border-gray-200 ${
                      filters.beds <= 1 ? 'opacity-50' : ''
                    }`}
                    onPress={() => decrementCounter('beds')}
                    disabled={filters.beds <= 1}
                    activeOpacity={0.7}
                  >
                    <Minus
                      size={18}
                      color={filters.beds <= 1 ? '#D4D4D4' : '#171717'}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                  <Text className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
                    {filters.beds}
                  </Text>
                  <TouchableOpacity
                    className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
                    onPress={() => incrementCounter('beds')}
                    activeOpacity={0.7}
                  >
                    <Plus size={18} color="#171717" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom spacing */}
            <View className="h-[100px]" />
          </ScrollView>

          {/* Bottom Buttons */}
          <View className="flex-row items-center gap-3 px-5 py-4 pb-6 border-t border-gray-200 bg-white">
            <TouchableOpacity
              className="flex-1 py-4 rounded-xl border border-gray-200 items-center"
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <Text className="text-base font-semibold text-gray-600">
                Clear All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-4 rounded-xl bg-secondary items-center"
              onPress={handleSearch}
              activeOpacity={0.9}
              style={{
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-base font-semibold text-white">Search</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}
