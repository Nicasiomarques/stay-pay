import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { formatCurrency } from '@/utils/formatters';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
}

const sizeMap = {
  sm: { price: 'text-sm', suffix: 'text-xs', original: 'text-xs' },
  md: { price: 'text-lg', suffix: 'text-sm', original: 'text-sm' },
  lg: { price: 'text-xl', suffix: 'text-base', original: 'text-base' },
};

function PriceDisplay({
  price,
  originalPrice,
  suffix = ' / noite',
  size = 'md',
  showDiscount = true,
}: PriceDisplayProps) {
  const { price: priceSize, suffix: suffixSize, original: originalSize } = sizeMap[size];

  const hasDiscount = showDiscount && originalPrice && originalPrice > price;

  return (
    <View className="flex-row items-baseline gap-1">
      {hasDiscount && (
        <Text className={`${originalSize} text-gray-400 line-through`}>
          {formatCurrency(originalPrice)}
        </Text>
      )}
      <Text className={`${priceSize} font-semibold text-gray-900`}>
        {formatCurrency(price)}
      </Text>
      {suffix && (
        <Text className={`${suffixSize} text-gray-500`}>{suffix}</Text>
      )}
    </View>
  );
}

export default memo(PriceDisplay);
