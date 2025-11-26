/**
 * LocationAutocomplete Component
 * Search input with animated dropdown suggestions
 */

import React, { useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '@theme';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import { LocationSuggestionItem } from './LocationSuggestionItem';
import { shadows } from '@/utils/shadows';

interface LocationAutocompleteProps {
  value: string;
  onChangeText: (text: string) => void;
  onSelectLocation: (location: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function LocationAutocomplete({
  value,
  onChangeText,
  onSelectLocation,
  placeholder = 'Para onde vai?',
  autoFocus = true,
}: LocationAutocompleteProps) {
  const inputRef = useRef<TextInput>(null);
  const debouncedQuery = useDebounce(value, 300);
  const suggestions = useLocationSuggestions(debouncedQuery);

  const handleSelectLocation = (location: string) => {
    onChangeText(location);
    onSelectLocation(location);
    inputRef.current?.blur();
  };

  const showSuggestions = value.length >= 1 && suggestions.length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="z-[1000]"
    >
      {/* Search Input */}
      <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border-[1.5px] border-gray-200">
        <View className="mr-3">
          <Search size={20} color={colors.text.secondary} />
        </View>
        <TextInput
          ref={inputRef}
          className="flex-1 text-base text-gray-900 p-0"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          autoFocus={autoFocus}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <View
          className="absolute top-[60px] left-0 right-0 bg-white rounded-xl max-h-[350px] z-[1001]"
          style={shadows.dropdown}
        >
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <LocationSuggestionItem
                name={item.name}
                hotelCount={item.hotelCount}
                onPress={() => handleSelectLocation(item.name)}
              />
            )}
            keyboardShouldPersistTaps="handled"
            className="flex-grow-0"
            contentContainerClassName="py-1"
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
