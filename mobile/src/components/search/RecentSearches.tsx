/**
 * RecentSearches Component
 * Displays recent search history with chips
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Clock, X } from 'lucide-react-native';
import { colors } from '@theme';
import { RecentSearchesService } from '@/services/recentSearches';

interface RecentSearchesProps {
  onSelectSearch: (search: string) => void;
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
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Clock size={18} color={colors.text.secondary} />
          <Text style={styles.title}>Pesquisas Recentes</Text>
        </View>
        <Pressable onPress={handleClearAll}>
          <Text style={styles.clearButton}>Limpar tudo</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {searches.map((search, index) => (
          <View key={index} style={styles.chipWrapper}>
            <Pressable
              style={styles.chip}
              onPress={() => onSelectSearch(search)}
            >
              <Text style={styles.chipText} numberOfLines={1}>
                {search}
              </Text>
            </Pressable>
            <Pressable
              style={styles.removeButton}
              onPress={() => handleRemoveSearch(search)}
              hitSlop={8}
            >
              <X size={14} color={colors.text.secondary} />
            </Pressable>
          </View>
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
