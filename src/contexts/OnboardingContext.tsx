/**
 * OnboardingContext
 * Gerencia o estado do fluxo de onboarding multi-step
 */

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type {
  OnboardingStep,
  OnboardingState,
  OnboardingContextType,
  OnboardingPreferences,
  TravelStyle,
  BudgetRange,
  Amenity,
} from '@types';
import { STEP_ORDER, MAX_AMENITIES } from '@types';
import { useOnboardingPreferences } from '@/hooks/useOnboardingPreferences';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: OnboardingPreferences = {
  phoneNumber: '',
  phoneCountryCode: 'AO',
  travelStyle: null,
  budgetRange: null,
  priorityAmenities: [],
  completedAt: null,
};

const initialState: OnboardingState = {
  currentStep: 'welcome',
  preferences: DEFAULT_PREFERENCES,
  isComplete: false,
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [state, setState] = useState<OnboardingState>(initialState);
  const { savePreferences, markAsComplete, markAsSkipped } = useOnboardingPreferences();

  const currentStepIndex = useMemo(
    () => STEP_ORDER.indexOf(state.currentStep),
    [state.currentStep]
  );

  const totalSteps = STEP_ORDER.length;

  const canGoBack = currentStepIndex > 0;

  const goToStep = useCallback((step: OnboardingStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setState(prev => ({ ...prev, currentStep: STEP_ORDER[nextIndex] }));
    }
  }, [currentStepIndex]);

  const previousStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setState(prev => ({ ...prev, currentStep: STEP_ORDER[prevIndex] }));
    }
  }, [currentStepIndex]);

  const setPhoneNumber = useCallback((phone: string, countryCode: string) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        phoneNumber: phone,
        phoneCountryCode: countryCode,
      },
    }));
  }, []);

  const setTravelStyle = useCallback((style: TravelStyle) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        travelStyle: style,
      },
    }));
  }, []);

  const setBudgetRange = useCallback((budget: BudgetRange) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        budgetRange: budget,
      },
    }));
  }, []);

  const toggleAmenity = useCallback((amenity: Amenity) => {
    setState(prev => {
      const currentAmenities = prev.preferences.priorityAmenities;
      const isSelected = currentAmenities.includes(amenity);

      let newAmenities: Amenity[];
      if (isSelected) {
        // Remover se já estiver selecionado
        newAmenities = currentAmenities.filter(a => a !== amenity);
      } else if (currentAmenities.length < MAX_AMENITIES) {
        // Adicionar se ainda não atingiu o máximo
        newAmenities = [...currentAmenities, amenity];
      } else {
        // Não fazer nada se já atingiu o máximo
        return prev;
      }

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          priorityAmenities: newAmenities,
        },
      };
    });
  }, []);

  const completeOnboarding = useCallback(async () => {
    const completedPreferences: OnboardingPreferences = {
      ...state.preferences,
      completedAt: new Date().toISOString(),
    };

    await savePreferences(completedPreferences);
    await markAsComplete();

    setState(prev => ({
      ...prev,
      preferences: completedPreferences,
      isComplete: true,
    }));
  }, [state.preferences, savePreferences, markAsComplete]);

  const skipOnboarding = useCallback(async () => {
    await markAsSkipped();
    setState(prev => ({ ...prev, isComplete: true }));
  }, [markAsSkipped]);

  const resetOnboarding = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo<OnboardingContextType>(
    () => ({
      state,
      goToStep,
      nextStep,
      previousStep,
      canGoBack,
      currentStepIndex,
      totalSteps,
      setPhoneNumber,
      setTravelStyle,
      setBudgetRange,
      toggleAmenity,
      completeOnboarding,
      skipOnboarding,
      resetOnboarding,
    }),
    [
      state,
      goToStep,
      nextStep,
      previousStep,
      canGoBack,
      currentStepIndex,
      totalSteps,
      setPhoneNumber,
      setTravelStyle,
      setBudgetRange,
      toggleAmenity,
      completeOnboarding,
      skipOnboarding,
      resetOnboarding,
    ]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding deve ser usado dentro de um OnboardingProvider');
  }
  return context;
}
