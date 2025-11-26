import { View, Text, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { colors } from '@theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  ...props
}: InputProps) {
  return (
    <View className="mb-4" style={containerStyle}>
      {label && (
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center h-14 border rounded-xl bg-white px-4
          ${error ? 'border-error' : 'border-gray-200'}
        `}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}

        <TextInput
          className={`
            flex-1 text-base text-gray-900 h-full
            ${leftIcon ? 'pl-2' : ''}
            ${rightIcon ? 'pr-2' : ''}
          `}
          style={style}
          placeholderTextColor={colors.gray400}
          {...props}
        />

        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>

      {error && (
        <Text className="text-xs text-error mt-1">{error}</Text>
      )}
    </View>
  );
}
