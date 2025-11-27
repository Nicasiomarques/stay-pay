/**
 * Tipos para o fluxo de onboarding com preferências do cliente
 */

export type OnboardingStep = 'welcome' | 'travelStyle' | 'budget' | 'amenities';

export type TravelStyle = 'business' | 'leisure' | 'family' | 'romantic';

export type BudgetRange = 'budget' | 'moderate' | 'luxury';

export type Amenity = 'wifi' | 'pool' | 'breakfast' | 'parking' | 'gym' | 'spa';

export interface OnboardingPreferences {
  phoneNumber: string;
  phoneCountryCode: string;
  travelStyle: TravelStyle | null;
  budgetRange: BudgetRange | null;
  priorityAmenities: Amenity[];
  completedAt: string | null;
}

export interface OnboardingState {
  currentStep: OnboardingStep;
  preferences: OnboardingPreferences;
  isComplete: boolean;
}

export interface OnboardingContextType {
  state: OnboardingState;
  // Navegação
  goToStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  canGoBack: boolean;
  currentStepIndex: number;
  totalSteps: number;
  // Setters de dados
  setPhoneNumber: (phone: string, countryCode: string) => void;
  setTravelStyle: (style: TravelStyle) => void;
  setBudgetRange: (budget: BudgetRange) => void;
  toggleAmenity: (amenity: Amenity) => void;
  // Controle do fluxo
  completeOnboarding: () => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
}

// Opções de preferências com labels em português
export interface PreferenceOption<T> {
  id: T;
  label: string;
  description?: string;
  icon: string;
}

export const TRAVEL_STYLE_OPTIONS: PreferenceOption<TravelStyle>[] = [
  { id: 'business', label: 'Negócios', description: 'Viagens a trabalho', icon: 'Briefcase' },
  { id: 'leisure', label: 'Lazer', description: 'Férias e descanso', icon: 'Palmtree' },
  { id: 'family', label: 'Família', description: 'Viagens em família', icon: 'Users' },
  { id: 'romantic', label: 'Romântico', description: 'Escapadas a dois', icon: 'Heart' },
];

export const BUDGET_OPTIONS: PreferenceOption<BudgetRange>[] = [
  { id: 'budget', label: 'Económico', description: 'Até 50.000 Kz/noite', icon: 'Wallet' },
  { id: 'moderate', label: 'Moderado', description: '50.000 - 150.000 Kz/noite', icon: 'CreditCard' },
  { id: 'luxury', label: 'Luxo', description: 'Acima de 150.000 Kz/noite', icon: 'Crown' },
];

export const AMENITY_OPTIONS: PreferenceOption<Amenity>[] = [
  { id: 'wifi', label: 'Wi-Fi Rápido', icon: 'Wifi' },
  { id: 'pool', label: 'Piscina', icon: 'Waves' },
  { id: 'breakfast', label: 'Pequeno-almoço', icon: 'Coffee' },
  { id: 'parking', label: 'Estacionamento', icon: 'Car' },
  { id: 'gym', label: 'Ginásio', icon: 'Dumbbell' },
  { id: 'spa', label: 'Spa & Bem-estar', icon: 'Sparkles' },
];

export const MAX_AMENITIES = 3;

export const STEP_ORDER: OnboardingStep[] = ['welcome', 'travelStyle', 'budget', 'amenities'];
