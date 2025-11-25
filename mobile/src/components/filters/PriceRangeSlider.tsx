/**
 * PriceRangeSlider Component
 * Dual-handle price range slider with live value display
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { DollarSign } from 'lucide-react-native';
import { colors } from '@theme';
import { formatCurrency } from '@/utils';
import { PRICE_RANGE_CONFIG } from '@/constants/filters';

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeSlider({ value, onChange }: PriceRangeSliderProps) {
  const [minValue, maxValue] = value;

  const handleMinChange = (newMin: number) => {
    // Ensure min doesn't exceed max
    const adjustedMin = Math.min(newMin, maxValue - PRICE_RANGE_CONFIG.step);
    onChange([adjustedMin, maxValue]);
  };

  const handleMaxChange = (newMax: number) => {
    // Ensure max doesn't go below min
    const adjustedMax = Math.max(newMax, minValue + PRICE_RANGE_CONFIG.step);
    onChange([minValue, adjustedMax]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.labelWithIcon}>
          <View style={styles.iconBadge}>
            <DollarSign size={16} color={colors.primary} strokeWidth={2} />
          </View>
          <Text style={styles.label}>Faixa de Preço</Text>
        </View>
        <Text style={styles.value}>
          {formatCurrency(minValue)} - {formatCurrency(maxValue)}
        </Text>
      </View>

      {/* Minimum Price Slider */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelRow}>
          <Text style={styles.sliderLabel}>Mínimo</Text>
          <Text style={styles.sliderValue}>{formatCurrency(minValue)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={PRICE_RANGE_CONFIG.min}
          maximumValue={PRICE_RANGE_CONFIG.max}
          step={PRICE_RANGE_CONFIG.step}
          value={minValue}
          onValueChange={handleMinChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.gray300}
          thumbTintColor={colors.primary}
        />
      </View>

      {/* Maximum Price Slider */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelRow}>
          <Text style={styles.sliderLabel}>Máximo</Text>
          <Text style={styles.sliderValue}>{formatCurrency(maxValue)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={PRICE_RANGE_CONFIG.min}
          maximumValue={PRICE_RANGE_CONFIG.max}
          step={PRICE_RANGE_CONFIG.step}
          value={maxValue}
          onValueChange={handleMaxChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.gray300}
          thumbTintColor={colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
