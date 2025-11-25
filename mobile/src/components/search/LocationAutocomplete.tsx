/**
 * LocationAutocomplete Component
 * Search input with animated dropdown suggestions
 */

import React, { useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '@theme';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions';
import { LocationSuggestionItem } from './LocationSuggestionItem';

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
      style={styles.container}
    >
      {/* Search Input */}
      <View style={styles.inputContainer}>
        <View style={styles.searchIcon}>
          <Search size={20} color={colors.text.secondary} />
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
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
        <View style={styles.suggestionsContainer}>
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
            style={styles.suggestionsList}
            contentContainerStyle={styles.suggestionsContent}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    padding: 0,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    maxHeight: 350,
    zIndex: 1001,
  },
  suggestionsList: {
    flexGrow: 0,
  },
  suggestionsContent: {
    paddingVertical: 4,
  },
});
