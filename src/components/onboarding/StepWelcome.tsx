/**
 * StepWelcome
 * Primeira tela do onboarding - Boas-vindas e input de telefone
 */

import { useRef } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { IsometricHotel } from '@/components/illustrations';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { useOnboarding } from '@/contexts';

export function StepWelcome() {
  const { state, setPhoneNumber } = useOnboarding();
  const { preferences } = state;

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value, preferences.phoneCountryCode);
  };

  return (
    <View className="items-center">
      {/* Ilustração 3D do Hotel */}
      <Animatable.View
        animation="bounceIn"
        duration={1000}
        className="w-[280px] h-[280px] mb-6"
      >
        <IsometricHotel width={280} height={280} />
      </Animatable.View>

      {/* Título */}
      <Animatable.Text
        animation="fadeInUp"
        delay={200}
        duration={600}
        className="text-4xl font-bold text-gray-900 text-center leading-10 mb-3"
      >
        Fique Com Estilo!{'\n'}Reserve Com Um Sorriso!
      </Animatable.Text>

      {/* Subtítulo */}
      <Animatable.Text
        animation="fadeInUp"
        delay={400}
        duration={600}
        className="text-base text-gray-500 text-center leading-6 mb-10 px-4"
      >
        A sua estadia perfeita está a uma reserva de distância. Reserve agora e
        crie momentos inesquecíveis.
      </Animatable.Text>

      {/* Input de Telefone */}
      <Animatable.View
        animation="fadeInUp"
        delay={600}
        duration={600}
        className="w-full mb-6"
      >
        <PhoneInput
          value={preferences.phoneNumber}
          onChangeText={handlePhoneChange}
          placeholder="Número de telefone"
          defaultCode="AO"
        />
      </Animatable.View>
    </View>
  );
}
