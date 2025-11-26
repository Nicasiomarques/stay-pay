import { View, ViewStyle, Pressable } from 'react-native';
import { colors } from '@theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
  className?: string;
}

const elevationStyles = {
  1: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  2: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  3: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
};

export function Card({ children, style, onPress, elevation = 2, className }: CardProps) {
  const Container = onPress ? Pressable : View;
  const shadowStyle = elevationStyles[elevation as keyof typeof elevationStyles] || elevationStyles[2];

  return (
    <Container
      className={`bg-white rounded-2xl border border-gray-200 ${className || ''}`}
      style={[shadowStyle, style]}
      onPress={onPress}
    >
      {children}
    </Container>
  );
}
