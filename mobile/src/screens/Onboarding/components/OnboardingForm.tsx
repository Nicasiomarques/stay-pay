import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@theme';

interface OnboardingFormProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onContinue: () => void;
}

export function OnboardingForm({ phone, onPhoneChange, onContinue }: OnboardingFormProps) {
  const isDisabled = !phone;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="+244 900 000 000"
          placeholderTextColor={colors.gray400}
          value={phone}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isDisabled && styles.buttonDisabled]}
        onPress={onContinue}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        Ao continuar, concorda com os nossos Termos de Serviço e Política de Privacidade
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.white,
  },
  button: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.gray300,
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.gray400,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 18,
  },
});
