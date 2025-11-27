/**
 * FilterBottomSheet Component
 * Redesigned to match Figma design with micro-interactions
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Minus, Plus, Star } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Destination types based on Figma
const DESTINATION_TYPES = [
  { id: 'city', label: 'Cidade' },
  { id: 'beach-front', label: 'Praia' },
  { id: 'lake', label: 'Lago' },
  { id: 'mountain', label: 'Montanha' },
  { id: 'countryside', label: 'Campo' },
];

// Rating options based on Figma
const RATING_OPTIONS = [
  { value: 0, label: 'Qualquer' },
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

// Animated Chip Component
interface AnimatedChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function AnimatedChip({ label, isActive, onPress }: AnimatedChipProps) {
  const chipRef = useRef<any>(null);

  const handlePressIn = () => {
    chipRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.95 } }, 100);
  };

  const handlePressOut = () => {
    chipRef.current?.animate?.({ 0: { scale: 0.95 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Animatable.View ref={chipRef}>
      <TouchableOpacity
        className={`px-4 py-2.5 rounded-full border ${
          isActive
            ? 'bg-secondary border-secondary'
            : 'bg-gray-100 border-gray-200'
        }`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={1}
      >
        <Text
          className={`text-sm font-medium ${
            isActive ? 'text-white' : 'text-gray-600'
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

// Animated Counter Button Component
interface AnimatedCounterButtonProps {
  type: 'increment' | 'decrement';
  onPress: () => void;
  disabled?: boolean;
}

function AnimatedCounterButton({ type, onPress, disabled }: AnimatedCounterButtonProps) {
  const btnRef = useRef<any>(null);

  const handlePressIn = () => {
    if (!disabled) {
      btnRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.9 } }, 100);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      btnRef.current?.animate?.({ 0: { scale: 0.9 }, 1: { scale: 1 } }, 100);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      haptics.light();
      onPress();
    }
  };

  const Icon = type === 'increment' ? Plus : Minus;

  return (
    <Animatable.View ref={btnRef}>
      <TouchableOpacity
        className={`w-9 h-9 rounded-full bg-gray-100 items-center justify-center border border-gray-200 ${
          disabled ? 'opacity-50' : ''
        }`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={1}
      >
        <Icon
          size={18}
          color={disabled ? '#D4D4D4' : '#171717'}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </Animatable.View>
  );
}

// Animated Counter Value Component
interface AnimatedCounterValueProps {
  value: number;
  valueRef: React.RefObject<any>;
}

function AnimatedCounterValue({ value, valueRef }: AnimatedCounterValueProps) {
  return (
    <Animatable.View ref={valueRef}>
      <Text className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
        {value}
      </Text>
    </Animatable.View>
  );
}

// Animated Rating Option Component
interface AnimatedRatingOptionProps {
  option: { value: number; label: string };
  isActive: boolean;
  onPress: () => void;
}

function AnimatedRatingOption({ option, isActive, onPress }: AnimatedRatingOptionProps) {
  const optionRef = useRef<any>(null);

  const handlePressIn = () => {
    optionRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.95 } }, 100);
  };

  const handlePressOut = () => {
    optionRef.current?.animate?.({ 0: { scale: 0.95 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Animatable.View ref={optionRef} style={{ flex: 1 }}>
      <TouchableOpacity
        className={`flex-1 flex-row items-center justify-center gap-1 py-3 rounded-xl border ${
          isActive
            ? 'bg-secondary border-secondary'
            : 'bg-gray-100 border-gray-200'
        }`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={1}
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
    </Animatable.View>
  );
}

// Animated Action Button Component
interface AnimatedActionButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  onPress: () => void;
}

function AnimatedActionButton({ label, variant, onPress }: AnimatedActionButtonProps) {
  const btnRef = useRef<any>(null);
  const isPrimary = variant === 'primary';

  const handlePressIn = () => {
    btnRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.96 } }, 100);
  };

  const handlePressOut = () => {
    btnRef.current?.animate?.({ 0: { scale: 0.96 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics[isPrimary ? 'medium' : 'light']();
    onPress();
  };

  return (
    <Animatable.View ref={btnRef} style={{ flex: 1 }}>
      <TouchableOpacity
        className={`flex-1 py-4 rounded-xl items-center ${
          isPrimary ? 'bg-secondary' : 'border border-gray-200'
        }`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={1}
        style={
          isPrimary
            ? {
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }
            : undefined
        }
      >
        <Text
          className={`text-base font-semibold ${
            isPrimary ? 'text-white' : 'text-gray-600'
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

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

  // Refs for counter value animations
  const roomsValueRef = useRef<any>(null);
  const bedsValueRef = useRef<any>(null);

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

  const incrementCounter = useCallback((key: 'rooms' | 'beds') => {
    updateFilter(key, Math.min(filters[key] + 1, 10));
    if (key === 'rooms') {
      roomsValueRef.current?.pulse?.(200);
    } else {
      bedsValueRef.current?.pulse?.(200);
    }
  }, [filters]);

  const decrementCounter = useCallback((key: 'rooms' | 'beds') => {
    updateFilter(key, Math.max(filters[key] - 1, 1));
    if (key === 'rooms') {
      roomsValueRef.current?.pulse?.(200);
    } else {
      bedsValueRef.current?.pulse?.(200);
    }
  }, [filters]);

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
            <Text className="text-lg font-semibold text-gray-900">Filtros</Text>
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
                Tipo de Destino
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingRight: 20 }}
              >
                {DESTINATION_TYPES.map((type) => {
                  const isActive = filters.destinationType === type.id;
                  return (
                    <AnimatedChip
                      key={type.id}
                      label={type.label}
                      isActive={isActive}
                      onPress={() => {
                        updateFilter(
                          'destinationType',
                          isActive ? null : type.id
                        );
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>

            {/* Price Section */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-gray-900 mb-4">
                Preço
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
                    Mín
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
                    Máx
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
                Avaliação
              </Text>
              <View className="flex-row gap-2">
                {RATING_OPTIONS.map((option) => {
                  const isActive = filters.minRating === option.value;
                  return (
                    <AnimatedRatingOption
                      key={option.value}
                      option={option}
                      isActive={isActive}
                      onPress={() => updateFilter('minRating', option.value)}
                    />
                  );
                })}
              </View>
            </View>

            {/* Rooms and Beds Section */}
            <View className="mb-8">
              <Text className="text-base font-semibold text-gray-900 mb-4">
                Quartos e Camas
              </Text>

              {/* Rooms Counter */}
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <Text className="text-base font-medium text-gray-900">Quartos</Text>
                <View className="flex-row items-center gap-4">
                  <AnimatedCounterButton
                    type="decrement"
                    onPress={() => decrementCounter('rooms')}
                    disabled={filters.rooms <= 1}
                  />
                  <AnimatedCounterValue value={filters.rooms} valueRef={roomsValueRef} />
                  <AnimatedCounterButton
                    type="increment"
                    onPress={() => incrementCounter('rooms')}
                  />
                </View>
              </View>

              {/* Beds Counter */}
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <Text className="text-base font-medium text-gray-900">Camas</Text>
                <View className="flex-row items-center gap-4">
                  <AnimatedCounterButton
                    type="decrement"
                    onPress={() => decrementCounter('beds')}
                    disabled={filters.beds <= 1}
                  />
                  <AnimatedCounterValue value={filters.beds} valueRef={bedsValueRef} />
                  <AnimatedCounterButton
                    type="increment"
                    onPress={() => incrementCounter('beds')}
                  />
                </View>
              </View>
            </View>

            {/* Bottom spacing */}
            <View className="h-[100px]" />
          </ScrollView>

          {/* Bottom Buttons */}
          <View className="flex-row items-center gap-3 px-5 py-4 pb-6 border-t border-gray-200 bg-white">
            <AnimatedActionButton
              label="Limpar Tudo"
              variant="secondary"
              onPress={handleClearAll}
            />
            <AnimatedActionButton
              label="Pesquisar"
              variant="primary"
              onPress={handleSearch}
            />
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}
