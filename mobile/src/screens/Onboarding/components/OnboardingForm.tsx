import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from '@/components/ui';
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
  disclaimer: {
    fontSize: 12,
    color: colors.gray400,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 18,
  },
});
