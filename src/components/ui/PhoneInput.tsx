import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PhoneNumberInput from 'react-native-phone-number-input';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  placeholder?: string;
  defaultCode?: string;
}

export function PhoneInput({
  value,
  onChangeText,
  onChangeFormattedText,
  placeholder = 'Número de telefone',
  defaultCode = 'AO', // Angola
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
        containerStyle={styles.container}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
        flagButtonStyle={styles.flagButton}
        countryPickerButtonStyle={styles.countryPickerButton}
        placeholder={placeholder}
        textInputProps={{
          placeholderTextColor: '#A3A3A3',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
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
    color: '#171717',
    padding: 0,
    height: 54,
  },
  codeText: {
    fontSize: 16,
    color: '#171717',
    fontWeight: '500',
  },
  flagButton: {
    marginLeft: 12,
  },
  countryPickerButton: {
    paddingHorizontal: 8,
  },
});
