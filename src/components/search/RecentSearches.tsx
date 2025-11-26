/**
 * RecentSearches Component
 * Displays recent search history with chips and stagger animations
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Clock, X } from 'lucide-react-native';
import { colors } from '@theme';
import { RecentSearchesService } from '@/services/recentSearches';
import { haptics } from '@/utils/haptics';

interface RecentSearchesProps {
  onSelectSearch: (search: string) => void;
}

// Animated Chip component for individual search items
interface AnimatedChipProps {
  search: string;
  index: number;
  onSelect: (search: string) => void;
  onRemove: (search: string) => void;
}

function AnimatedSearchChip({ search, index, onSelect, onRemove }: AnimatedChipProps) {
  const chipRef = useRef<any>(null);

  const handlePressIn = () => {
    chipRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.95 } }, 100);
  };

  const handlePressOut = () => {
    chipRef.current?.animate?.({ 0: { scale: 0.95 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onSelect(search);
  };

  return (
    <Animatable.View
      ref={chipRef}
      animation="fadeInUp"
      delay={index * 50}
      duration={400}
      style={styles.chipWrapper}
    >
      <Pressable
        style={styles.chip}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Text style={styles.chipText} numberOfLines={1}>
          {search}
        </Text>
      </Pressable>
      <Pressable
        style={styles.removeButton}
        onPress={() => onRemove(search)}
        hitSlop={8}
      >
        <X size={14} color={colors.text.secondary} />
      </Pressable>
    </Animatable.View>
  );
}

export function RecentSearches({ onSelectSearch }: RecentSearchesProps) {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    const recent = await RecentSearchesService.get();
    setSearches(recent);
  };

  const handleClearAll = async () => {
    await RecentSearchesService.clear();
    setSearches([]);
  };

  const handleRemoveSearch = async (search: string) => {
    await RecentSearchesService.remove(search);
    setSearches(prev => prev.filter(s => s !== search));
  };

  if (searches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" duration={400} style={styles.header}>
        <View style={styles.titleRow}>
          <Clock size={18} color={colors.text.secondary} />
          <Text style={styles.title}>Pesquisas Recentes</Text>
        </View>
        <Pressable onPress={handleClearAll}>
          <Text style={styles.clearButton}>Limpar tudo</Text>
        </Pressable>
      </Animatable.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {searches.map((search, index) => (
          <AnimatedSearchChip
            key={index}
            search={search}
            index={index}
            onSelect={onSelectSearch}
            onRemove={handleRemoveSearch}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  chipsContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chipWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.gray50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 200,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  removeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
});
