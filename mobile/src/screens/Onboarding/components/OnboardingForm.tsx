import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/components/ui';
import { Mail, Apple, Chrome } from 'lucide-react-native';
import { colors } from '@theme';

interface OnboardingFormProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onContinue: () => void;
}

export function OnboardingForm({ phone, onPhoneChange, onContinue }: OnboardingFormProps) {
  return (
    <View style={styles.container}>
      <Input
        label="Número de Telefone"
        placeholder="+244 900 000 000"
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
      />

      <Button
        size="lg"
        fullWidth
        onPress={onContinue}
        disabled={!phone}
      >
        Continuar
      </Button>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou continue com</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Login Options */}
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Mail size={20} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Apple size={20} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Chrome size={20} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        Ao continuar, concorda com os nossos{' '}
        <Text style={styles.link}>Termos de Serviço</Text> e{' '}
        <Text style={styles.link}>Política de Privacidade</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.gray400,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});
