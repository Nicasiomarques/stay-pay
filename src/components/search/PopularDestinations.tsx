/**
 * PopularDestinations Component
 * Grid of popular destination cards with stagger animations
 */

import React, { useRef } from 'react';
import { View, Text, Pressable, FlatList, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MapPin } from 'lucide-react-native';
import { colors } from '@theme';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import { haptics } from '@/utils/haptics';

interface PopularDestinationsProps {
  onSelectDestination: (destination: string) => void;
}

interface AnimatedDestinationCardProps {
  item: { name: string; hotelCount: number };
  onSelect: (name: string) => void;
  index: number;
}

function AnimatedDestinationCard({ item, onSelect, index }: AnimatedDestinationCardProps) {
  const cardRef = useRef<any>(null);

  const handlePressIn = () => {
    cardRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.96 } }, 100);
  };

  const handlePressOut = () => {
    cardRef.current?.animate?.({ 0: { scale: 0.96 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onSelect(item.name);
  };

  return (
    <Animatable.View
      ref={cardRef}
      animation="fadeInUp"
      delay={index * 75}
      duration={400}
      className="flex-1 rounded-xl overflow-hidden"
      style={{ aspectRatio: 1.2 }}
    >
      <Pressable
        className="flex-1"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <ImageBackground
          source={{ uri: `https://source.unsplash.com/400x300/?${encodeURIComponent(item.name)},hotel` }}
          className="flex-1 justify-end"
          imageStyle={{ borderRadius: 12 }}
        >
          <View className="bg-black/40 p-3">
            <Text className="text-[15px] font-semibold text-white mb-0.5" numberOfLines={2}>
              {item.name}
            </Text>
            <Text className="text-xs font-medium text-white opacity-90">
              {item.hotelCount} {item.hotelCount === 1 ? 'hotel' : 'hotéis'}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Animatable.View>
  );
}

export function PopularDestinations({ onSelectDestination }: PopularDestinationsProps) {
  const destinations = useLocationSuggestions('');
  const topDestinations = destinations.slice(0, 6);

  if (destinations.length === 0) {
    return null;
  }

  return (
    <View className="py-4">
      <Animatable.View
        animation="fadeIn"
        duration={400}
        className="flex-row items-center gap-2 px-6 mb-3"
      >
        <MapPin size={18} color={colors.text.secondary} />
        <Text className="text-base font-semibold text-gray-900">
          Destinos Populares
        </Text>
      </Animatable.View>

      <FlatList
        data={topDestinations}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperClassName="px-5 gap-3 mb-3"
        renderItem={({ item, index }) => (
          <AnimatedDestinationCard
            item={item}
            onSelect={onSelectDestination}
            index={index}
          />
        )}
      />
    </View>
  );
}
