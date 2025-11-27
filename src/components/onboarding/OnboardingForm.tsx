import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/components/ui';
import { Mail, Apple, Chrome } from 'lucide-react-native';

interface OnboardingFormProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onContinue: () => void;
}

export function OnboardingForm({ phone, onPhoneChange, onContinue }: OnboardingFormProps) {
  return (
    <View className="w-full">
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
      <View className="flex-row items-center my-6 gap-3">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="text-[13px] font-medium text-gray-500">ou continue com</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* Social Login Options */}
      <View className="flex-row justify-center gap-4 mb-6">
        <TouchableOpacity
          className="w-14 h-14 rounded-lg bg-white border-[1.5px] border-gray-200 items-center justify-center"
          activeOpacity={0.7}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Mail size={20} color="#171717" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-14 h-14 rounded-lg bg-white border-[1.5px] border-gray-200 items-center justify-center"
          activeOpacity={0.7}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Apple size={20} color="#171717" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-14 h-14 rounded-lg bg-white border-[1.5px] border-gray-200 items-center justify-center"
          activeOpacity={0.7}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Chrome size={20} color="#171717" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Text className="text-xs text-gray-400 text-center leading-[18px]">
        Ao continuar, concorda com os nossos{' '}
        <Text className="text-primary font-semibold">Termos de Serviço</Text> e{' '}
        <Text className="text-primary font-semibold">Política de Privacidade</Text>
      </Text>
    </View>
  );
}
