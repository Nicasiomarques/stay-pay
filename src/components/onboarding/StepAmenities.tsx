/**
 * StepAmenities
 * Quarta tela do onboarding - Comodidades prioritárias
 */

import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useOnboarding } from '@/contexts';
import { AMENITY_OPTIONS, MAX_AMENITIES, Amenity } from '@types';
import { PreferenceCard } from './PreferenceCard';
import { OnboardingIllustration } from './OnboardingIllustration';

export function StepAmenities() {
  const { state, toggleAmenity } = useOnboarding();
  const { preferences } = state;

  const selectedCount = preferences.priorityAmenities.length;
  const isMaxReached = selectedCount >= MAX_AMENITIES;

  const handleToggle = (amenity: Amenity) => {
    toggleAmenity(amenity);
  };

  return (
    <View className="items-center">
      {/* Ilustração */}
      <View className="mb-6">
        <OnboardingIllustration type="amenities" />
      </View>

      {/* Título */}
      <Animatable.Text
        animation="fadeInUp"
        delay={200}
        duration={600}
        className="text-3xl font-bold text-gray-900 text-center mb-2"
      >
        O que não pode faltar?
      </Animatable.Text>

      {/* Subtítulo */}
      <Animatable.Text
        animation="fadeInUp"
        delay={300}
        duration={600}
        className="text-base text-gray-500 text-center mb-2 px-4"
      >
        Selecione até {MAX_AMENITIES} comodidades essenciais para a sua estadia.
      </Animatable.Text>

      {/* Contador */}
      <Animatable.View animation="fadeInUp" delay={350} duration={600} className="mb-6">
        <View className="flex-row items-center gap-1">
          <Text className={`text-sm font-semibold ${selectedCount > 0 ? 'text-primary' : 'text-gray-400'}`}>
            {selectedCount}
          </Text>
          <Text className="text-sm text-gray-400">/ {MAX_AMENITIES} selecionadas</Text>
        </View>
      </Animatable.View>

      {/* Grid de opções 3x2 */}
      <View className="w-full flex-row flex-wrap justify-between gap-y-3">
        {AMENITY_OPTIONS.map((option, index) => {
          const isSelected = preferences.priorityAmenities.includes(option.id);
          const isDisabled = !isSelected && isMaxReached;

          return (
            <PreferenceCard
              key={option.id}
              label={option.label}
              icon={option.icon}
              selected={isSelected}
              onPress={() => handleToggle(option.id)}
              variant="grid"
              disabled={isDisabled}
              animationDelay={400 + index * 80}
            />
          );
        })}
      </View>
    </View>
  );
}
