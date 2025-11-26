import { useRef } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
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

const variantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-gray-100',
  outline: 'bg-transparent border border-gray-200',
  ghost: 'bg-transparent',
};

const sizeClasses = {
  sm: 'h-10 px-4',
  md: 'h-12 px-5',
  lg: 'h-14 px-6',
};

const textVariantClasses = {
  primary: 'text-white',
  secondary: 'text-gray-900',
  outline: 'text-gray-900',
  ghost: 'text-primary',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

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
    <Animatable.View ref={buttonRef} className={fullWidth ? 'w-full' : undefined}>
      <TouchableOpacity
        className={`
          rounded-xl items-center justify-center flex-row
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${isDisabled ? 'opacity-50' : ''}
        `}
        style={style}
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
          <Text
            className={`
              font-semibold
              ${textVariantClasses[variant]}
              ${textSizeClasses[size]}
            `}
            style={textStyle}
          >
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}
