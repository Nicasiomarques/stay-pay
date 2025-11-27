/**
 * OnboardingScreen
 * Orquestrador do fluxo de onboarding multi-step
 */

import { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useOnboarding } from '@/contexts';
import {
  StepIndicator,
  StepWelcome,
  StepTravelStyle,
  StepBudget,
  StepAmenities,
} from '@/components/onboarding';
import { haptics } from '@/utils/haptics';

export default function OnboardingScreen() {
  const router = useRouter();
  const {
    state,
    nextStep,
    previousStep,
    canGoBack,
    currentStepIndex,
    totalSteps,
    completeOnboarding,
    skipOnboarding,
  } = useOnboarding();

  const buttonRef = useRef<Animatable.View & View>(null);

  // Verifica se pode avançar com base no step atual
  const canContinue = () => {
    switch (state.currentStep) {
      case 'welcome':
        return state.preferences.phoneNumber.length > 0;
      case 'travelStyle':
        return state.preferences.travelStyle !== null;
      case 'budget':
        return state.preferences.budgetRange !== null;
      case 'amenities':
        return state.preferences.priorityAmenities.length > 0;
      default:
        return true;
    }
  };

  const handleContinue = async () => {
    if (!canContinue()) return;

    haptics.medium();

    // Se é o último step, completa o onboarding
    if (currentStepIndex === totalSteps - 1) {
      await completeOnboarding();
      router.replace('/(tabs)');
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      haptics.light();
      previousStep();
    }
  };

  const handleSkip = async () => {
    haptics.light();
    await skipOnboarding();
    router.replace('/(tabs)');
  };

  // Renderiza o step atual
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'welcome':
        return <StepWelcome />;
      case 'travelStyle':
        return <StepTravelStyle />;
      case 'budget':
        return <StepBudget />;
      case 'amenities':
        return <StepAmenities />;
      default:
        return <StepWelcome />;
    }
  };

  // Texto do botão baseado no step
  const getButtonText = () => {
    if (currentStepIndex === totalSteps - 1) {
      return 'Começar';
    }
    return 'Continuar';
  };

  const isLastStep = currentStepIndex === totalSteps - 1;
  const showContinueEnabled = canContinue();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-[60px] pb-10 justify-between">
          {/* Conteúdo do Step */}
          <Animatable.View
            key={state.currentStep}
            animation="fadeIn"
            duration={300}
          >
            {renderCurrentStep()}
          </Animatable.View>

          {/* Navegação inferior */}
          <Animatable.View
            animation="fadeInUp"
            delay={800}
            duration={600}
            className="flex-row items-center justify-between w-full mt-6"
          >
            {/* Botão Voltar / Pular */}
            {canGoBack ? (
              <TouchableOpacity
                onPress={handleBack}
                activeOpacity={0.7}
                className="flex-row items-center py-4"
              >
                <ArrowLeft size={18} color="#737373" strokeWidth={2} />
                <Text className="text-base font-medium text-gray-500 ml-1">
                  Voltar
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSkip}
                activeOpacity={0.7}
                className="py-4"
              >
                <Text className="text-base font-medium text-gray-500">
                  Pular
                </Text>
              </TouchableOpacity>
            )}

            {/* Indicador de Progresso */}
            <StepIndicator
              currentStep={currentStepIndex}
              totalSteps={totalSteps}
            />

            {/* Botão Continuar */}
            <Animatable.View
              ref={buttonRef}
              animation="bounceIn"
              delay={1000}
              duration={800}
            >
              <TouchableOpacity
                onPress={handleContinue}
                disabled={!showContinueEnabled}
                activeOpacity={0.8}
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  showContinueEnabled ? 'bg-secondary' : 'bg-gray-300'
                }`}
                style={
                  showContinueEnabled
                    ? {
                        shadowColor: '#10B981',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                      }
                    : {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 5,
                      }
                }
              >
                <ArrowRight size={24} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
