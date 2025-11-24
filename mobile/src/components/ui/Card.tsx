import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { colors } from '@theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
}

export function Card({ children, style, onPress, elevation = 2 }: CardProps) {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      style={[
        styles.card,
        elevation === 1 && styles.elevation1,
        elevation === 2 && styles.elevation2,
        elevation === 3 && styles.elevation3,
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevation1: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  elevation2: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  elevation3: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
});
