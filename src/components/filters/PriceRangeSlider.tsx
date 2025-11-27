/**
 * PriceRangeSlider Component
 * Dual-handle price range slider with live value display
 */

import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { DollarSign } from 'lucide-react-native';
import { formatCurrency } from '@/utils';
import { PRICE_RANGE_CONFIG } from '@/config/constants/filters';

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
    <View className="py-2">
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center gap-2.5">
          <View className="w-8 h-8 rounded-full bg-primary/15 items-center justify-center">
            <DollarSign size={16} color="#0E64D2" strokeWidth={2} />
          </View>
          <Text className="text-base font-semibold text-gray-900">Faixa de Preço</Text>
        </View>
        <Text className="text-[15px] font-bold text-primary">
          {formatCurrency(minValue)} - {formatCurrency(maxValue)}
        </Text>
      </View>

      {/* Minimum Price Slider */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">
            Mínimo
          </Text>
          <Text className="text-sm font-semibold text-gray-900">
            {formatCurrency(minValue)}
          </Text>
        </View>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={PRICE_RANGE_CONFIG.min}
          maximumValue={PRICE_RANGE_CONFIG.max}
          step={PRICE_RANGE_CONFIG.step}
          value={minValue}
          onValueChange={handleMinChange}
          minimumTrackTintColor="#0E64D2"
          maximumTrackTintColor="#D4D4D4"
          thumbTintColor="#0E64D2"
        />
      </View>

      {/* Maximum Price Slider */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">
            Máximo
          </Text>
          <Text className="text-sm font-semibold text-gray-900">
            {formatCurrency(maxValue)}
          </Text>
        </View>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={PRICE_RANGE_CONFIG.min}
          maximumValue={PRICE_RANGE_CONFIG.max}
          step={PRICE_RANGE_CONFIG.step}
          value={maxValue}
          onValueChange={handleMaxChange}
          minimumTrackTintColor="#0E64D2"
          maximumTrackTintColor="#D4D4D4"
          thumbTintColor="#0E64D2"
        />
      </View>
    </View>
  );
}
