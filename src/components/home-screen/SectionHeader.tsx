import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
}

export function SectionHeader({
  title,
  onSeeAll,
  showSeeAll = true,
}: SectionHeaderProps) {
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
