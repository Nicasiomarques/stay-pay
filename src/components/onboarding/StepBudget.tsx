/**
 * StepBudget
 * Terceira tela do onboarding - Faixa de orçamento preferida
 */

import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useOnboarding } from '@/contexts';
import { BUDGET_OPTIONS, BudgetRange } from '@types';
import { PreferenceCard } from './PreferenceCard';
import { OnboardingIllustration } from './OnboardingIllustration';

export function StepBudget() {
  const { state, setBudgetRange } = useOnboarding();
  const { preferences } = state;

  const handleSelect = (budget: BudgetRange) => {
    setBudgetRange(budget);
  };

  return (
    <View className="items-center">
      {/* Ilustração */}
      <View className="mb-6">
        <OnboardingIllustration type="budget" />
      </View>

      {/* Título */}
      <Animatable.Text
        animation="fadeInUp"
        delay={200}
        duration={600}
        className="text-3xl font-bold text-gray-900 text-center mb-2"
      >
        Qual o seu orçamento?
      </Animatable.Text>

      {/* Subtítulo */}
      <Animatable.Text
        animation="fadeInUp"
        delay={300}
        duration={600}
        className="text-base text-gray-500 text-center mb-8 px-4"
      >
        Escolha a faixa de preço que melhor se adequa às suas necessidades.
      </Animatable.Text>

      {/* Lista de opções */}
      <View className="w-full">
        {BUDGET_OPTIONS.map((option, index) => (
          <PreferenceCard
            key={option.id}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={preferences.budgetRange === option.id}
            onPress={() => handleSelect(option.id)}
            variant="list"
            animationDelay={400 + index * 100}
          />
        ))}
      </View>
    </View>
  );
}
