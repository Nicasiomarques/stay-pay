import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur';
import { Search, MapPin } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SearchHeaderProps {
  onSearchPress: () => void;
  onFilterPress?: () => void;
  userName?: string;
  location?: string;
}

export function SearchHeader({
  onSearchPress,
  userName = 'Martin',
  location = 'Norway',
}: SearchHeaderProps) {
  const searchBarRef = useRef<any>(null);

  const handlePressIn = () => {
    searchBarRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.98 } }, 100);
  };

  const handlePressOut = () => {
    searchBarRef.current?.animate?.({ 0: { scale: 0.98 }, 1: { scale: 1 } }, 100);
  };

  const handlePress = () => {
    haptics.light();
    onSearchPress();
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT * 0.3,
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
      }}
    >
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        }}
        className="flex-1 w-full"
      >
        {/* Dark Overlay */}
        <View className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <View className="flex-1 px-5 pt-12 pb-4 justify-between">
          {/* Location Badge - Animated */}
          <Animatable.View
            animation="fadeInDown"
            duration={400}
            className="flex-row items-center"
          >
            <MapPin size={16} color="#fff" strokeWidth={2} />
            <Text className="text-white text-sm font-medium ml-1">{location}</Text>
          </Animatable.View>

          {/* Greeting Text - Animated */}
          <Animatable.View animation="fadeInUp" delay={100} duration={400} className="mb-4">
            <Text className="text-white text-2xl font-bold">
              Olá, {userName}! Diz-nos para onde
            </Text>
            <Text className="text-white text-2xl font-bold">queres ir</Text>
          </Animatable.View>

          {/* Glass Search Bar with Blur - Animated */}
          <Animatable.View
            ref={searchBarRef}
            animation="fadeIn"
            delay={200}
            duration={400}
            style={{ borderRadius: 9999, overflow: 'hidden' }}
          >
            <BlurView
              intensity={30}
              tint="light"
              experimentalBlurMethod="dimezisBlurView"
              style={{
                borderRadius: 9999,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
                activeOpacity={1}
                className="flex-row items-center py-3.5 px-4"
              >
                <Search size={20} color="#fff" strokeWidth={2} />
                <View className="flex-1 ml-3">
                  <Text className="text-white text-base font-medium">Pesquisar locais</Text>
                  <Text className="text-white/70 text-xs">
                    Datas • Número de hóspedes
                  </Text>
                </View>
              </TouchableOpacity>
            </BlurView>
          </Animatable.View>
        </View>
      </ImageBackground>
    </View>
  );
}
