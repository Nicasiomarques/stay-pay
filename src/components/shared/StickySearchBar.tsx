/**
 * StickySearchBar Component
 * Compact search bar that sticks to top when scrolling
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

interface StickySearchBarProps {
  isVisible: boolean;
  location?: string;
  onSearchPress: () => void;
  onFilterPress: () => void;
  filterCount?: number;
}

export function StickySearchBar({
  isVisible,
  location,
  onSearchPress,
  onFilterPress,
  filterCount = 0,
}: StickySearchBarProps) {
  const insets = useSafeAreaInsets();
  const [translateY] = useState(new Animated.Value(-100));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: isVisible ? 0 : -100,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isVisible ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isVisible]);

  const handleSearchPress = () => {
    haptics.light();
    onSearchPress();
  };

  const handleFilterPress = () => {
    haptics.light();
    onFilterPress();
  };

  // Calculate top position (safe area + status bar)
  const topPosition = insets.top + (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0);

  return (
    <Animated.View
      className="absolute left-0 right-0 z-[1000] bg-white px-4 py-3 border-b border-gray-200"
      style={{
        top: topPosition,
        transform: [{ translateY }],
        opacity,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <View className="flex-row items-center gap-3">
        {/* Search Button */}
        <TouchableOpacity
          className="flex-1 flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 gap-3"
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Search size={20} color="#737373" />
          <Text className="flex-1 text-[15px] text-gray-500" numberOfLines={1}>
            {location || 'Para onde vai?'}
          </Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          className={`w-12 h-12 items-center justify-center rounded-xl border-[1.5px] relative ${
            filterCount > 0
              ? 'bg-primary border-primary'
              : 'bg-white border-gray-300'
          }`}
          onPress={handleFilterPress}
          activeOpacity={0.7}
        >
          <SlidersHorizontal
            size={20}
            color={filterCount > 0 ? '#FFFFFF' : '#171717'}
          />
          {filterCount > 0 && (
            <View className="absolute -top-1.5 -right-1.5 bg-white rounded-full min-w-[20px] h-5 items-center justify-center px-1 border-2 border-primary">
              <Text className="text-[11px] font-bold text-primary">{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
