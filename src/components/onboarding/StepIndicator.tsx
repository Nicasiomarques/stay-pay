/**
 * StepIndicator
 * Indicador de progresso para o fluxo de onboarding
 */

import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View className="flex-row gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Animatable.View
          key={index}
          animation="fadeIn"
          delay={900 + index * 100}
          className={`w-8 h-1 rounded-sm ${
            index <= currentStep ? 'bg-gray-900' : 'bg-gray-200'
          }`}
        />
      ))}
    </View>
  );
}
