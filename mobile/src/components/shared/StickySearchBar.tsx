/**
 * StickySearchBar Component
 * Compact search bar that sticks to top when scrolling
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { colors } from '@theme';

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
      style={[
        styles.container,
        {
          top: topPosition,
          transform: [{ translateY }],
          opacity,
        },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <View style={styles.content}>
        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Search size={20} color={colors.text.secondary} />
          <Text style={styles.searchText} numberOfLines={1}>
            {location || 'Para onde vai?'}
          </Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          style={[styles.filterButton, filterCount > 0 && styles.filterButtonActive]}
          onPress={handleFilterPress}
          activeOpacity={0.7}
        >
          <SlidersHorizontal
            size={20}
            color={filterCount > 0 ? colors.white : colors.text.primary}
          />
          {filterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 15,
    color: colors.text.secondary,
    fontWeight: '400',
  },
  filterButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.white,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
});
