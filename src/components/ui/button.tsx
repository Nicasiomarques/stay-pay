import { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors } from '@theme';
import { haptics } from '@/utils/haptics';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonRef = useRef<any>(null);

  const handlePressIn = () => {
    if (!isDisabled) {
      buttonRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.96 } }, 100);
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      buttonRef.current?.animate?.({ 0: { scale: 0.96 }, 1: { scale: 1 } }, 100);
    }
  };

  const handlePress = () => {
    if (!isDisabled) {
      if (variant === 'primary') {
        haptics.medium();
      } else {
        haptics.light();
      }
      onPress?.();
    }
  };

  return (
    <Animatable.View ref={buttonRef} style={fullWidth && styles.fullWidth}>
      <TouchableOpacity
        style={[
          styles.base,
          styles[variant],
          styles[`size_${size}`],
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={1}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? colors.white : colors.primary}
            size="small"
          />
        ) : (
          <Text style={[styles.text, styles[`text_${variant}`], styles[`text_${size}`], textStyle]}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.gray100,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  size_sm: {
    height: 40,
    paddingHorizontal: 16,
  },
  size_md: {
    height: 48,
    paddingHorizontal: 20,
  },
  size_lg: {
    height: 56,
    paddingHorizontal: 24,
  },

  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    fontWeight: '600',
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.text.primary,
  },
  text_outline: {
    color: colors.text.primary,
  },
  text_ghost: {
    color: colors.primary,
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
});
