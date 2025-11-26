/**
 * LocationSuggestionItem Component
 * Individual suggestion row in autocomplete dropdown with press animation
 */

import React, { useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MapPin } from 'lucide-react-native';
import { colors } from '@theme';
import { haptics } from '@/utils/haptics';

interface LocationSuggestionItemProps {
  name: string;
  hotelCount: number;
  onPress: () => void;
}

export function LocationSuggestionItem({ name, hotelCount, onPress }: LocationSuggestionItemProps) {
  const itemRef = useRef<any>(null);

  const handlePressIn = () => {
    itemRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.98 } }, 100);
  };

  const handlePressOut = () => {
    itemRef.current?.animate?.({ 0: { scale: 0.98 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onPress();
  };

  return (
    <Animatable.View ref={itemRef}>
      <Pressable
        className="flex-row items-center py-3.5 px-4 min-h-[56px] bg-white active:bg-gray-50"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <View className="mr-3">
          <MapPin size={20} color={colors.text.secondary} />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-medium text-gray-900 mb-0.5" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-[13px] text-gray-500">
            {hotelCount} {hotelCount === 1 ? 'hotel' : 'hotéis'}
          </Text>
        </View>
      </Pressable>
    </Animatable.View>
  );
}
