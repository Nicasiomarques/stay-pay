import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import PhoneNumberInput from 'react-native-phone-number-input';
import { colors } from '@theme';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  placeholder?: string;
  defaultCode?: string;
}

// PhoneNumberInput requires inline styles for its internal components
// These cannot be converted to NativeWind className props
const phoneInputStyles = {
  container: {
    width: '100%' as const,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 0,
  },
  textInput: {
    fontSize: 16,
    color: colors.text.primary,
    padding: 0,
    height: 54,
  },
  codeText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500' as const,
  },
  flagButton: {
    marginLeft: 12,
  },
  countryPickerButton: {
    paddingHorizontal: 8,
  },
};

export function PhoneInput({
  value,
  onChangeText,
  onChangeFormattedText,
  placeholder = 'Número de telefone',
  defaultCode = 'AO',
}: PhoneInputProps) {
  const phoneInput = useRef<PhoneNumberInput>(null);
  const [formattedValue, setFormattedValue] = useState('');

  return (
    <View className="w-full">
      <PhoneNumberInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode={defaultCode as any}
        layout="first"
        onChangeText={(text) => {
          onChangeText(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
          onChangeFormattedText?.(text);
        }}
        containerStyle={phoneInputStyles.container}
        textContainerStyle={phoneInputStyles.textContainer}
        textInputStyle={phoneInputStyles.textInput}
        codeTextStyle={phoneInputStyles.codeText}
        flagButtonStyle={phoneInputStyles.flagButton}
        countryPickerButtonStyle={phoneInputStyles.countryPickerButton}
        placeholder={placeholder}
        textInputProps={{
          placeholderTextColor: colors.gray400,
        }}
      />
    </View>
  );
}
