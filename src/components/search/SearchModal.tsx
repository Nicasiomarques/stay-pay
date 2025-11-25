/**
 * SearchModal Component
 * Full-screen search modal with autocomplete and suggestions
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.backButton} hitSlop={12}>
              <ArrowLeft size={24} color={colors.text.primary} />
            </Pressable>
            <Text style={styles.headerTitle}>Pesquisar</Text>
            {searchQuery.length > 0 && (
              <Pressable onPress={handleClear}>
                <Text style={styles.clearText}>Limpar</Text>
              </Pressable>
            )}
            {searchQuery.length === 0 && <View style={styles.placeholder} />}
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
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
              style={styles.suggestionsScroll}
              contentContainerStyle={styles.suggestionsContent}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
    width: 80,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  clearText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
    width: 80,
    textAlign: 'right',
  },
  placeholder: {
    width: 80,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  suggestionsScroll: {
    flex: 1,
  },
  suggestionsContent: {
    paddingBottom: 24,
  },
});
