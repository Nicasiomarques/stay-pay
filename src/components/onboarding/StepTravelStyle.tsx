/**
 * StepTravelStyle
 * Segunda tela do onboarding - Estilo de viagem preferido
 */

import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useOnboarding } from '@/contexts';
import { TRAVEL_STYLE_OPTIONS, TravelStyle } from '@types';
import { PreferenceCard } from './PreferenceCard';
import { OnboardingIllustration } from './OnboardingIllustration';

export function StepTravelStyle() {
  const { state, setTravelStyle } = useOnboarding();
  const { preferences } = state;

  const handleSelect = (style: TravelStyle) => {
    setTravelStyle(style);
  };

  return (
    <View className="items-center">
      {/* Ilustração */}
      <View className="mb-6">
        <OnboardingIllustration type="travelStyle" />
      </View>

      {/* Título */}
      <Animatable.Text
        animation="fadeInUp"
        delay={200}
        duration={600}
        className="text-3xl font-bold text-gray-900 text-center mb-2"
      >
        Como costuma viajar?
      </Animatable.Text>

      {/* Subtítulo */}
      <Animatable.Text
        animation="fadeInUp"
        delay={300}
        duration={600}
        className="text-base text-gray-500 text-center mb-8 px-4"
      >
        Selecione o seu estilo de viagem preferido para personalizarmos as suas recomendações.
      </Animatable.Text>

      {/* Grid de opções */}
      <View className="w-full flex-row flex-wrap justify-between gap-y-3">
        {TRAVEL_STYLE_OPTIONS.map((option, index) => (
          <PreferenceCard
            key={option.id}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={preferences.travelStyle === option.id}
            onPress={() => handleSelect(option.id)}
            variant="grid"
            animationDelay={400 + index * 100}
          />
        ))}
      </View>
    </View>
  );
}
