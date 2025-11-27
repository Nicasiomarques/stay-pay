/**
 * useOnboardingPreferences Hook
 * Gerencia a persistência das preferências do onboarding via AsyncStorage
 */

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OnboardingPreferences } from '@types';

const STORAGE_KEYS = {
  ONBOARDING_PREFERENCES: '@staygo:onboarding_preferences',
  ONBOARDING_COMPLETED: '@staygo:onboarding_completed',
  ONBOARDING_SKIPPED: '@staygo:onboarding_skipped',
};

const DEFAULT_PREFERENCES: OnboardingPreferences = {
  phoneNumber: '',
  phoneCountryCode: 'AO',
  travelStyle: null,
  budgetRange: null,
  priorityAmenities: [],
  completedAt: null,
};

export function useOnboardingPreferences() {
  const [preferences, setPreferences] = useState<OnboardingPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [wasSkipped, setWasSkipped] = useState(false);

  // Carregar dados ao montar
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const [savedPreferences, completed, skipped] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_PREFERENCES),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_SKIPPED),
      ]);

      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
      setIsComplete(completed === 'true');
      setWasSkipped(skipped === 'true');
    } catch (error) {
      console.error('Erro ao carregar preferências do onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = useCallback(async (newPreferences: OnboardingPreferences) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_PREFERENCES,
        JSON.stringify(newPreferences)
      );
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Erro ao salvar preferências do onboarding:', error);
    }
  }, []);

  const markAsComplete = useCallback(async () => {
    try {
      const completedPreferences: OnboardingPreferences = {
        ...preferences,
        completedAt: new Date().toISOString(),
      };

      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true'),
        AsyncStorage.setItem(
          STORAGE_KEYS.ONBOARDING_PREFERENCES,
          JSON.stringify(completedPreferences)
        ),
      ]);

      setPreferences(completedPreferences);
      setIsComplete(true);
    } catch (error) {
      console.error('Erro ao marcar onboarding como completo:', error);
    }
  }, [preferences]);

  const markAsSkipped = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_SKIPPED, 'true'),
        AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true'),
      ]);

      setWasSkipped(true);
      setIsComplete(true);
    } catch (error) {
      console.error('Erro ao marcar onboarding como ignorado:', error);
    }
  }, []);

  const resetPreferences = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_PREFERENCES),
        AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
        AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDING_SKIPPED),
      ]);

      setPreferences(DEFAULT_PREFERENCES);
      setIsComplete(false);
      setWasSkipped(false);
    } catch (error) {
      console.error('Erro ao resetar preferências do onboarding:', error);
    }
  }, []);

  return {
    preferences,
    isLoading,
    isComplete,
    wasSkipped,
    savePreferences,
    markAsComplete,
    markAsSkipped,
    resetPreferences,
  };
}
