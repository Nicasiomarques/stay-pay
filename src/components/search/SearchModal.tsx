/**
 * SearchModal Component
 * Full-screen search modal with autocomplete and suggestions
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '@theme';
import { LocationAutocomplete } from './LocationAutocomplete';
import { RecentSearches } from './RecentSearches';
import { PopularDestinations } from './PopularDestinations';
import { RecentSearchesService } from '@/services/recentSearches';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  initialValue?: string;
  onSearch: (location: string) => void;
}

export function SearchModal({
  visible,
  onClose,
  initialValue = '',
  onSearch,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  useEffect(() => {
    if (visible) {
      setSearchQuery(initialValue);
    }
  }, [visible, initialValue]);

  const handleSelectLocation = async (location: string) => {
    // Save to recent searches
    await RecentSearchesService.add(location);

    // Trigger search
    onSearch(location);

    // Close modal
    onClose();
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  // Show recent searches and popular destinations when no query
  const showSuggestions = searchQuery.length === 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
            <Pressable onPress={onClose} className="p-1 w-20" hitSlop={12}>
              <ArrowLeft size={24} color={colors.text.primary} />
            </Pressable>
            <Text className="text-lg font-semibold text-gray-900">Pesquisar</Text>
            {searchQuery.length > 0 ? (
              <Pressable onPress={handleClear}>
                <Text className="text-[15px] font-medium text-primary w-20 text-right">
                  Limpar
                </Text>
              </Pressable>
            ) : (
              <View className="w-20" />
            )}
          </View>

          {/* Search Input */}
          <View className="px-6 py-4 bg-white">
            <LocationAutocomplete
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSelectLocation={handleSelectLocation}
              placeholder="Para onde vai?"
              autoFocus={true}
            />
          </View>

          {/* Suggestions Content */}
          {showSuggestions && (
            <ScrollView
              className="flex-1"
              contentContainerClassName="pb-6"
              keyboardShouldPersistTaps="handled"
            >
              <RecentSearches onSelectSearch={handleSelectLocation} />
              <PopularDestinations onSelectDestination={handleSelectLocation} />
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
