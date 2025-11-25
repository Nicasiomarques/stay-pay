import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface SearchHeaderProps {
  onSearchPress: () => void;
  onFilterPress: () => void;
}

export function SearchHeader({ onSearchPress, onFilterPress }: SearchHeaderProps) {
  return (
    <View className="bg-gray-900 px-5 pt-4 pb-6 rounded-b-3xl">
      {/* Search Bar */}
      <TouchableOpacity
        className="flex-row items-center bg-white rounded-lg py-3.5 px-4 shadow-lg"
        onPress={onSearchPress}
        activeOpacity={0.9}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center mr-3">
          <Search size={20} color="#737373" strokeWidth={2} />
        </View>

        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-gray-900 mb-0.5">
            Where Do You Want To Go?
          </Text>
          <Text className="text-[13px] text-gray-500 font-normal">
            Date · Guests · Rooms
          </Text>
        </View>

        <TouchableOpacity
          className="w-11 h-11 rounded-xl bg-gray-100 items-center justify-center ml-3"
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <SlidersHorizontal size={20} color="#171717" strokeWidth={2} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
