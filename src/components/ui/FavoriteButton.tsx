import React, { memo, useState, useRef } from 'react';
import { TouchableOpacity, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Heart } from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { glass, glassRadius } from '@/utils/glassmorphism';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onPress?: (newState: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glass' | 'solid' | 'airbnb';
  style?: StyleProp<ViewStyle>;
}

const sizeMap = {
  sm: { icon: 16, container: 'w-8 h-8' },
  md: { icon: 20, container: 'w-10 h-10' },
  lg: { icon: 24, container: 'w-12 h-12' },
};

const variantStyles = {
  glass: {
    active: { fill: '#EF4444', stroke: '#EF4444' },
    inactive: { fill: 'transparent', stroke: '#FFFFFF' },
  },
  solid: {
    active: { fill: '#FFFFFF', stroke: '#FFFFFF' },
    inactive: { fill: 'transparent', stroke: '#10B981' },
  },
  airbnb: {
    active: { fill: '#FF385C', stroke: '#FF385C' },
    inactive: { fill: 'rgba(0,0,0,0.5)', stroke: '#FFFFFF' },
  },
};

function FavoriteButton({
  isFavorite: initialFavorite = false,
  onPress,
  size = 'md',
  variant = 'glass',
  style,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const heartRef = useRef<Animatable.View & { pulse: (duration?: number) => void }>(null);

  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    haptics.medium();
    heartRef.current?.pulse?.(300);
    const newState = !isFavorite;
    setIsFavorite(newState);
    onPress?.(newState);
  };

  const { icon, container } = sizeMap[size];
  const colors = variantStyles[variant][isFavorite ? 'active' : 'inactive'];

  const containerStyle = variant === 'glass'
    ? [glass.light, { borderRadius: glassRadius.full }]
    : undefined;

  return (
    <TouchableOpacity
      className={`${container} items-center justify-center`}
      onPress={handlePress}
      activeOpacity={0.8}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[containerStyle, style]}
    >
      <Animatable.View ref={heartRef}>
        <Heart
          size={icon}
          color={colors.stroke}
          fill={colors.fill}
          strokeWidth={2}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}

export default memo(FavoriteButton);
