/**
 * PopularDestinations Component
 * Grid of popular destination cards with stagger animations
 */

import React, { useRef } from 'react';
import { View, Text, Pressable, FlatList, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Building2, Sparkles } from 'lucide-react-native';
import { colors } from '@theme';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';

// Mapeamento de imagens únicas para destinos populares
const destinationImages: Record<string, string> = {
  'Lisboa': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80',
  'Porto': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
  'Algarve': 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
  'Madeira': 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80',
  'Açores': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  'Sintra': 'https://images.unsplash.com/photo-1592470931031-95c26d5cdb89?w=800&q=80',
  'Cascais': 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  'Évora': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'Coimbra': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
  'Braga': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
  'Faro': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'Nazaré': 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80',
};

// Fallback images para destinos não mapeados (todas únicas)
const fallbackImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
];

const getDestinationImage = (name: string, index: number = 0): string => {
  if (destinationImages[name]) {
    return destinationImages[name];
  }
  // Usa o índice para selecionar uma imagem fallback única
  return fallbackImages[index % fallbackImages.length];
};

interface PopularDestinationsProps {
  onSelectDestination: (destination: string) => void;
}

interface AnimatedDestinationCardProps {
  item: { name: string; hotelCount: number };
  onSelect: (name: string) => void;
  index: number;
  isLarge?: boolean;
}

function AnimatedDestinationCard({ item, onSelect, index, isLarge = false }: AnimatedDestinationCardProps) {
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

  // Card grande para destaque (primeiro item)
  if (isLarge) {
    return (
      <Animatable.View
        ref={cardRef}
        animation="fadeInUp"
        delay={index * 75}
        duration={500}
        className="mx-5 mb-4 rounded-2xl overflow-hidden"
        style={[{ height: 180 }, shadows.card]}
      >
        <Pressable
          className="flex-1"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
        >
          <ImageBackground
            source={{ uri: getDestinationImage(item.name, index) }}
            className="flex-1"
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}
            >
              {/* Badge de destaque */}
              <View className="self-start flex-row items-center bg-white/95 px-3 py-1.5 rounded-full gap-1.5">
                <Sparkles size={14} color={colors.primary} />
                <Text className="text-xs font-bold text-primary">Mais Buscado</Text>
              </View>

              {/* Conteúdo */}
              <View>
                <View className="flex-row items-center gap-1.5 mb-1">
                  <MapPin size={14} color={colors.white} />
                  <Text className="text-white/80 text-xs font-medium">Portugal</Text>
                </View>
                <Text className="text-white text-2xl font-bold mb-1">{item.name}</Text>
                <View className="flex-row items-center gap-1.5">
                  <Building2 size={14} color={colors.white} />
                  <Text className="text-white/90 text-sm font-medium">
                    {item.hotelCount} {item.hotelCount === 1 ? 'hotel disponível' : 'hotéis disponíveis'}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      </Animatable.View>
    );
  }

  // Card normal (grid)
  return (
    <Animatable.View
      ref={cardRef}
      animation="fadeInUp"
      delay={index * 75}
      duration={400}
      className="flex-1 rounded-2xl overflow-hidden"
      style={[{ aspectRatio: 1, minHeight: 140 }, shadows.elevation1]}
    >
      <Pressable
        className="flex-1"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <ImageBackground
          source={{ uri: getDestinationImage(item.name, index) }}
          className="flex-1"
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.75)']}
            style={{ flex: 1, justifyContent: 'flex-end', padding: 12 }}
          >
            <Text className="text-white text-base font-bold mb-0.5" numberOfLines={1}>
              {item.name}
            </Text>
            <View className="flex-row items-center gap-1">
              <Building2 size={12} color="rgba(255,255,255,0.8)" />
              <Text className="text-white/80 text-xs font-medium">
                {item.hotelCount} {item.hotelCount === 1 ? 'hotel' : 'hotéis'}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Animatable.View>
  );
}

export function PopularDestinations({ onSelectDestination }: PopularDestinationsProps) {
  const destinations = useLocationSuggestions('');
  const topDestinations = destinations.slice(0, 5); // 1 grande + 4 no grid

  if (destinations.length === 0) {
    return null;
  }

  const featuredDestination = topDestinations[0];
  const gridDestinations = topDestinations.slice(1);

  return (
    <View className="py-4">
      {/* Header */}
      <Animatable.View
        animation="fadeIn"
        duration={400}
        className="flex-row items-center justify-between px-6 mb-4"
      >
        <View className="flex-row items-center gap-2">
          <View className="bg-primary/10 p-2 rounded-xl">
            <MapPin size={18} color={colors.primary} />
          </View>
          <View>
            <Text className="text-base font-bold text-gray-900">
              Destinos Populares
            </Text>
            <Text className="text-xs text-gray-500">
              Os mais procurados pelos viajantes
            </Text>
          </View>
        </View>
      </Animatable.View>

      {/* Card em destaque */}
      {featuredDestination && (
        <AnimatedDestinationCard
          item={featuredDestination}
          onSelect={onSelectDestination}
          index={0}
          isLarge
        />
      )}

      {/* Grid de cards */}
      <FlatList
        data={gridDestinations}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperClassName="px-5 gap-3 mb-3"
        renderItem={({ item, index }) => (
          <AnimatedDestinationCard
            item={item}
            onSelect={onSelectDestination}
            index={index + 1}
          />
        )}
      />
    </View>
  );
}
