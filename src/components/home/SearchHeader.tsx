import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Search, MapPin } from 'lucide-react-native';

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
          {/* Location Badge */}
          <View className="flex-row items-center">
            <MapPin size={16} color="#fff" strokeWidth={2} />
            <Text className="text-white text-sm font-medium ml-1">{location}</Text>
          </View>

          {/* Greeting Text */}
          <View className="mb-4">
            <Text className="text-white text-2xl font-bold">
              Hey, {userName}! Tell us where you
            </Text>
            <Text className="text-white text-2xl font-bold">want to go</Text>
          </View>

          {/* Glass Search Bar with Blur */}
          <View style={{ borderRadius: 9999, overflow: 'hidden' }}>
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
                onPress={onSearchPress}
                activeOpacity={0.9}
                className="flex-row items-center py-3.5 px-4"
              >
                <Search size={20} color="#fff" strokeWidth={2} />
                <View className="flex-1 ml-3">
                  <Text className="text-white text-base font-medium">Search places</Text>
                  <Text className="text-white/70 text-xs">
                    Date range • Number of guests
                  </Text>
                </View>
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
