/**
 * PopularDestinations Component
 * Grid of popular destination cards
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ImageBackground } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { colors } from '@theme';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';

interface PopularDestinationsProps {
  onSelectDestination: (destination: string) => void;
}

export function PopularDestinations({ onSelectDestination }: PopularDestinationsProps) {
  // Get popular destinations (empty query returns sorted by hotel count)
  const destinations = useLocationSuggestions('');

  if (destinations.length === 0) {
    return null;
  }

  // Take top 6 destinations for grid
  const topDestinations = destinations.slice(0, 6);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MapPin size={18} color={colors.text.secondary} />
        <Text style={styles.title}>Destinos Populares</Text>
      </View>

      <FlatList
        data={topDestinations}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => onSelectDestination(item.name)}
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
  cardPressed: {
    opacity: 0.85,
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
