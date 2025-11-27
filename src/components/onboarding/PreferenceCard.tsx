/**
 * PreferenceCard
 * Card selecionável para opções de preferência no onboarding
 */

import { useRef } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Briefcase,
  Palmtree,
  Users,
  Heart,
  Wallet,
  CreditCard,
  Crown,
  Wifi,
  Waves,
  Coffee,
  Car,
  Dumbbell,
  Sparkles,
  Check,
} from 'lucide-react-native';
import { colors } from '@theme';
import { haptics } from '@/utils/haptics';

// Mapeamento de ícones
const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string; strokeWidth?: number }>> = {
  Briefcase,
  Palmtree,
  Users,
  Heart,
  Wallet,
  CreditCard,
  Crown,
  Wifi,
  Waves,
  Coffee,
  Car,
  Dumbbell,
  Sparkles,
};

interface PreferenceCardProps {
  label: string;
  description?: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  variant?: 'grid' | 'list';
  disabled?: boolean;
  animationDelay?: number;
}

export function PreferenceCard({
  label,
  description,
  icon,
  selected,
  onPress,
  variant = 'grid',
  disabled = false,
  animationDelay = 0,
}: PreferenceCardProps) {
  const cardRef = useRef<any>(null);
  const IconComponent = ICON_MAP[icon] || Briefcase;

  const handlePressIn = () => {
    if (!disabled) {
      cardRef.current?.animate?.({ 0: { scale: 1 }, 1: { scale: 0.96 } }, 100);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      cardRef.current?.animate?.({ 0: { scale: 0.96 }, 1: { scale: 1 } }, 100);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      haptics.light();
      onPress();
    }
  };

  if (variant === 'list') {
    return (
      <Animatable.View
        ref={cardRef}
        animation="fadeInUp"
        delay={animationDelay}
        duration={500}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={1}
          className={`
            flex-row items-center p-4 rounded-2xl border-2 mb-3
            ${selected ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200'}
            ${disabled ? 'opacity-50' : ''}
          `}
        >
          {/* Ícone */}
          <View
            className={`
              w-14 h-14 rounded-xl items-center justify-center mr-4
              ${selected ? 'bg-primary' : 'bg-gray-100'}
            `}
          >
            <IconComponent
              size={24}
              color={selected ? colors.white : colors.gray500}
              strokeWidth={2}
            />
          </View>

          {/* Texto */}
          <View className="flex-1">
            <Text
              className={`text-base font-semibold ${selected ? 'text-primary' : 'text-gray-900'}`}
            >
              {label}
            </Text>
            {description && (
              <Text className="text-sm text-gray-500 mt-0.5">{description}</Text>
            )}
          </View>

          {/* Indicador de seleção */}
          {selected && (
            <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
              <Check size={14} color={colors.white} strokeWidth={3} />
            </View>
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  // Variant: grid (padrão)
  return (
    <Animatable.View
      ref={cardRef}
      animation="fadeInUp"
      delay={animationDelay}
      duration={500}
      className="w-[48%]"
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={1}
        className={`
          items-center p-4 rounded-2xl border-2
          ${selected ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200'}
          ${disabled ? 'opacity-50' : ''}
        `}
      >
        {/* Ícone */}
        <View
          className={`
            w-16 h-16 rounded-2xl items-center justify-center mb-3
            ${selected ? 'bg-primary' : 'bg-gray-100'}
          `}
        >
          <IconComponent
            size={28}
            color={selected ? colors.white : colors.gray500}
            strokeWidth={2}
          />
        </View>

        {/* Label */}
        <Text
          className={`text-sm font-semibold text-center ${selected ? 'text-primary' : 'text-gray-900'}`}
        >
          {label}
        </Text>

        {/* Descrição (opcional) */}
        {description && (
          <Text className="text-xs text-gray-500 text-center mt-1">{description}</Text>
        )}

        {/* Badge de seleção */}
        {selected && (
          <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary items-center justify-center">
            <Check size={12} color={colors.white} strokeWidth={3} />
          </View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}
