import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Clock, X } from 'lucide-react-native';
import { colors } from '@theme';
import { RecentSearchesService } from '@/services/recentSearches';
import { haptics } from '@/utils/haptics';

interface RecentSearchesProps {
  onSelectSearch: (search: string) => void;
}

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
      className="flex-row items-center"
    >
      <Pressable
        className="py-2 px-4 bg-gray-50 rounded-[20px] border border-gray-200 max-w-[200px]"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Text className="text-sm font-medium text-gray-900" numberOfLines={1}>
          {search}
        </Text>
      </Pressable>
      <Pressable
        className="absolute right-2 top-2 p-1 bg-white rounded-xl"
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
    <View className="py-4">
      <Animatable.View
        animation="fadeIn"
        duration={400}
        className="flex-row justify-between items-center px-6 mb-3"
      >
        <View className="flex-row items-center gap-2">
          <Clock size={18} color={colors.text.secondary} />
          <Text className="text-base font-semibold text-gray-900">
            Pesquisas Recentes
          </Text>
        </View>
        <Pressable onPress={handleClearAll}>
          <Text className="text-sm font-medium text-primary">Limpar tudo</Text>
        </Pressable>
      </Animatable.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-5 gap-2"
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
