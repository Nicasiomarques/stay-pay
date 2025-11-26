import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Star } from 'lucide-react-native';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gold' | 'black';
  showReviews?: boolean;
}

const sizeMap = {
  sm: { star: 12, text: 'text-xs', reviewText: 'text-xs' },
  md: { star: 16, text: 'text-base', reviewText: 'text-sm' },
  lg: { star: 20, text: 'text-lg', reviewText: 'text-base' },
};

const variantColors = {
  gold: '#F59E0B',
  black: '#000000',
};

function StarRating({
  rating,
  reviews,
  size = 'md',
  variant = 'gold',
  showReviews = true,
}: StarRatingProps) {
  const { star, text, reviewText } = sizeMap[size];
  const starColor = variantColors[variant];

  const formatReviews = (count: number) => {
    if (count >= 1000) {
      return `(${(count / 1000).toFixed(1)}K)`;
    }
    return `(${count})`;
  };

  return (
    <View className="flex-row items-center gap-1">
      <Star size={star} color={starColor} fill={starColor} strokeWidth={0} />
      <Text className={`${text} font-semibold text-gray-900`}>{rating}</Text>
      {showReviews && reviews !== undefined && (
        <Text className={`${reviewText} text-gray-400`}>
          {formatReviews(reviews)}
        </Text>
      )}
    </View>
  );
}

export default memo(StarRating);
