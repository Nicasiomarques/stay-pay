/**
 * PopularDestinations Component
 * Grid of popular destination cards with stagger animations
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MapPin } from 'lucide-react-native';
import { colors } from '@theme';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import { haptics } from '@/utils/haptics';

interface PopularDestinationsProps {
  onSelectDestination: (destination: string) => void;
}

// Animated destination card component
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
      style={styles.card}
    >
      <Pressable
        style={styles.cardPressable}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <ImageBackground
          source={{ uri: `https://source.unsplash.com/400x300/?${encodeURIComponent(item.name)},hotel` }}
          style={styles.cardImage}
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.cardSubtitle}>
              {item.hotelCount} {item.hotelCount === 1 ? 'hotel' : 'hotéis'}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Animatable.View>
  );
}

export function PopularDestinations({ onSelectDestination }: PopularDestinationsProps) {
  // Get popular destinations (empty query returns sorted by hotel count)
  const destinations = useLocationSuggestions('');

  // Take top 6 destinations for grid
  const topDestinations = destinations.slice(0, 6);

  if (destinations.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" duration={400} style={styles.header}>
        <MapPin size={18} color={colors.text.secondary} />
        <Text style={styles.title}>Destinos Populares</Text>
      </Animatable.View>

      <FlatList
        data={topDestinations}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  row: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    aspectRatio: 1.2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardPressable: {
    flex: 1,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 12,
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
    opacity: 0.9,
  },
});
