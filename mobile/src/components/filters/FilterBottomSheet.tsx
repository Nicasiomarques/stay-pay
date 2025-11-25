/**
 * FilterBottomSheet Component
 * Main filter drawer with all filter controls
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { X, Sparkles, Star, Users as UsersIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@theme';
import { FilterState, QUICK_FILTERS } from '@/constants/filters';
import { useFilterState } from '@/hooks/useFilterState';
import { haptics } from '@/utils/haptics';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { PriceRangeSlider } from './PriceRangeSlider';
import { PropertyTypeGrid } from './PropertyTypeGrid';
import { AmenitiesCheckboxes } from './AmenitiesCheckboxes';
import { QuickFilterChips } from './QuickFilterChips';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  initialFilters?: Partial<FilterState>;
  onApplyFilters: (filters: FilterState) => void;
  resultsCount?: number;
}

export function FilterBottomSheet({
  visible,
  onClose,
  initialFilters,
  onApplyFilters,
  resultsCount = 0,
}: FilterBottomSheetProps) {
  const {
    filters,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    activeFiltersCount,
  } = useFilterState(initialFilters);

  // Animation values
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showContent, setShowContent] = useState(false);

  // Animate on visibility change
  useEffect(() => {
    if (visible) {
      setShowContent(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowContent(false);
      });
    }
  }, [visible]);

  const handleApplyQuickFilter = (filterId: string) => {
    haptics.light();
    const quickFilter = QUICK_FILTERS.find(f => f.id === filterId);
    if (!quickFilter) return;

    // Toggle or apply quick filter
    switch (quickFilter.filterKey) {
      case 'amenities':
        const amenities = quickFilter.value as string[];
        // Toggle all amenities in the quick filter
        amenities.forEach(amenity => {
          const isActive = filters.amenities.includes(amenity);
          if (!isActive) {
            toggleArrayFilter('amenities', amenity);
          }
        });
        break;

      case 'minRating':
        const rating = quickFilter.value as number;
        updateFilter('minRating', filters.minRating === rating ? 0 : rating);
        break;

      case 'priceRange':
        const priceRange = quickFilter.value as [number, number];
        updateFilter('priceRange', priceRange);
        break;

      case 'propertyTypes':
        const types = quickFilter.value as string[];
        types.forEach(type => {
          const isActive = filters.propertyTypes.includes(type);
          if (!isActive) {
            toggleArrayFilter('propertyTypes', type);
          }
        });
        break;
    }
  };

  const handleApply = () => {
    haptics.medium();
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    haptics.light();
    resetFilters();
  };

  const handleClose = () => {
    haptics.light();
    onClose();
  };

  if (!showContent) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>

      {/* Modal Content */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.container}>
          {/* Header with Glassmorphism */}
          <LinearGradient
            colors={[colors.primary, colors.primary + 'DD']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <View style={[styles.iconButton, glass.light, { borderRadius: glassRadius.full }]}>
                <X size={20} color={colors.white} strokeWidth={2} />
              </View>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Sparkles size={18} color={colors.white} strokeWidth={2} />
              <Text style={styles.headerTitle}>Filtros</Text>
            </View>
            <TouchableOpacity onPress={handleReset} style={styles.resetButtonContainer}>
              <Text style={styles.resetButton}>Limpar</Text>
            </TouchableOpacity>
          </LinearGradient>

        {/* Quick Filters */}
        <QuickFilterChips
          filters={filters}
          onApplyQuickFilter={handleApplyQuickFilter}
        />

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Price Range */}
          <View style={styles.section}>
            <PriceRangeSlider
              value={filters.priceRange}
              onChange={(value) => updateFilter('priceRange', value)}
            />
          </View>

          <View style={styles.divider} />

          {/* Property Types */}
          <View style={styles.section}>
            <PropertyTypeGrid
              selected={filters.propertyTypes}
              onToggle={(typeId) => toggleArrayFilter('propertyTypes', typeId)}
            />
          </View>

          <View style={styles.divider} />

          {/* Amenities */}
          <View style={styles.section}>
            <AmenitiesCheckboxes
              selected={filters.amenities}
              onToggle={(amenityId) => toggleArrayFilter('amenities', amenityId)}
            />
          </View>

          <View style={styles.divider} />

          {/* Star Rating */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Classificação Mínima</Text>
            <View style={styles.ratingRow}>
              {[0, 3, 4, 5].map((rating) => {
                const isActive = filters.minRating === rating;
                return (
                  <Pressable
                    key={rating}
                    style={[
                      styles.ratingChip,
                      isActive && styles.ratingChipActive,
                    ]}
                    onPress={() => {
                      haptics.light();
                      updateFilter('minRating', rating);
                    }}
                  >
                    {rating > 0 && (
                      <View style={[styles.ratingIconBadge, isActive && styles.ratingIconBadgeActive]}>
                        <Star
                          size={16}
                          color={isActive ? colors.primary : colors.text.secondary}
                          strokeWidth={2}
                          fill={isActive ? colors.primary : 'transparent'}
                        />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.ratingChipLabel,
                        isActive && styles.ratingChipLabelActive,
                      ]}
                    >
                      {rating === 0 ? 'Todos' : `${rating}+`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Guest Capacity */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Capacidade de Hóspedes</Text>
            <View style={styles.capacityRow}>
              {[undefined, 2, 4, 6, 8].map((capacity) => {
                const isActive = filters.guestCapacity === capacity;
                return (
                  <Pressable
                    key={capacity ?? 'any'}
                    style={[
                      styles.capacityChip,
                      isActive && styles.capacityChipActive,
                    ]}
                    onPress={() => {
                      haptics.light();
                      updateFilter('guestCapacity', capacity);
                    }}
                  >
                    {capacity && (
                      <View style={[styles.capacityIconBadge, isActive && styles.capacityIconBadgeActive]}>
                        <UsersIcon
                          size={16}
                          color={isActive ? colors.primary : colors.text.secondary}
                          strokeWidth={2}
                        />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.capacityChipLabel,
                        isActive && styles.capacityChipLabelActive,
                      ]}
                    >
                      {capacity ? `${capacity}+` : 'Todos'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Bottom spacing for floating button */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

          {/* Sticky Footer with Glassmorphism */}
          <View style={[styles.footer, glass.light]}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.98)']}
              style={styles.footerGradient}
            >
              <View style={styles.resultsInfo}>
                <View style={styles.resultsRow}>
                  <Sparkles size={16} color={colors.primary} strokeWidth={2} />
                  <Text style={styles.resultsCount}>{resultsCount} hotéis</Text>
                </View>
                {activeFiltersCount > 0 && (
                  <View style={[styles.filterBadge, glass.light, { borderRadius: glassRadius.full }]}>
                    <Text style={styles.filterBadgeText}>
                      {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.applyButton} onPress={handleApply} activeOpacity={0.8}>
                <LinearGradient
                  colors={[colors.primary, colors.primary + 'DD']}
                  style={styles.applyButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.applyButtonText}>Mostrar Resultados</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.92,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    width: 60,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  resetButtonContainer: {
    width: 60,
    alignItems: 'flex-end',
  },
  resetButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  section: {
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingChip: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 6,
  },
  ratingChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  ratingIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.text.secondary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingIconBadgeActive: {
    backgroundColor: colors.primary + '20',
  },
  ratingChipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  ratingChipLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  capacityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  capacityChip: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 6,
  },
  capacityChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  capacityIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.text.secondary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capacityIconBadgeActive: {
    backgroundColor: colors.primary + '20',
  },
  capacityChipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  capacityChipLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: 120,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  footerGradient: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 14,
  },
  resultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultsCount: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  filterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary + '20',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  applyButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  applyButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
