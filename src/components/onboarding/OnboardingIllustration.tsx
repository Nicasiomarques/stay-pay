/**
 * OnboardingIllustration
 * Ilustrações compostas por ícones para cada step do onboarding
 */

import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
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
  MapPin,
  Plane,
} from 'lucide-react-native';
import { colors } from '@theme';

type IllustrationType = 'travelStyle' | 'budget' | 'amenities';

interface OnboardingIllustrationProps {
  type: IllustrationType;
}

export function OnboardingIllustration({ type }: OnboardingIllustrationProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de flutuação contínua
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const renderTravelStyleIllustration = () => (
    <View className="w-[260px] h-[200px] items-center justify-center">
      {/* Container principal com glassmorphism */}
      <Animated.View
        style={{ transform: [{ translateY: floatAnim }] }}
        className="items-center"
      >
        {/* Círculo central grande */}
        <View className="w-32 h-32 rounded-full bg-primary/10 items-center justify-center mb-4">
          <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center">
            <Plane size={48} color={colors.primary} strokeWidth={1.5} />
          </View>
        </View>

        {/* Ícones flutuantes ao redor */}
        <View className="absolute -top-2 -left-4">
          <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
            <View className="w-12 h-12 rounded-xl bg-white shadow-md items-center justify-center">
              <Briefcase size={24} color={colors.gray500} strokeWidth={1.5} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute -top-2 -right-4">
          <Animatable.View animation="pulse" iterationCount="infinite" duration={2200} delay={200}>
            <View className="w-12 h-12 rounded-xl bg-white shadow-md items-center justify-center">
              <Heart size={24} color="#EF4444" strokeWidth={1.5} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute -bottom-8 -left-8">
          <Animatable.View animation="pulse" iterationCount="infinite" duration={2400} delay={400}>
            <View className="w-12 h-12 rounded-xl bg-white shadow-md items-center justify-center">
              <Users size={24} color={colors.gray500} strokeWidth={1.5} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute -bottom-8 -right-8">
          <Animatable.View animation="pulse" iterationCount="infinite" duration={2600} delay={600}>
            <View className="w-12 h-12 rounded-xl bg-white shadow-md items-center justify-center">
              <Palmtree size={24} color="#10B981" strokeWidth={1.5} />
            </View>
          </Animatable.View>
        </View>
      </Animated.View>
    </View>
  );

  const renderBudgetIllustration = () => (
    <View className="w-[260px] h-[200px] items-center justify-center">
      <Animated.View
        style={{ transform: [{ translateY: floatAnim }] }}
        className="items-center"
      >
        {/* Três níveis de orçamento */}
        <View className="flex-row items-end gap-4">
          {/* Budget */}
          <View className="items-center">
            <View className="w-16 h-20 rounded-xl bg-gray-100 items-center justify-center mb-2">
              <Wallet size={28} color={colors.gray500} strokeWidth={1.5} />
            </View>
            <View className="w-2 h-2 rounded-full bg-gray-300" />
          </View>

          {/* Moderate */}
          <View className="items-center">
            <View className="w-20 h-28 rounded-xl bg-primary/20 items-center justify-center mb-2">
              <CreditCard size={32} color={colors.primary} strokeWidth={1.5} />
            </View>
            <View className="w-2 h-2 rounded-full bg-primary" />
          </View>

          {/* Luxury */}
          <View className="items-center">
            <View className="w-16 h-24 rounded-xl bg-yellow-100 items-center justify-center mb-2">
              <Crown size={28} color="#F59E0B" strokeWidth={1.5} />
            </View>
            <View className="w-2 h-2 rounded-full bg-yellow-400" />
          </View>
        </View>

        {/* Sparkles decorativos */}
        <View className="absolute top-0 right-4">
          <Animatable.View animation="pulse" iterationCount="infinite" duration={1500}>
            <Sparkles size={20} color="#F59E0B" strokeWidth={1.5} />
          </Animatable.View>
        </View>
      </Animated.View>
    </View>
  );

  const renderAmenitiesIllustration = () => (
    <View className="w-[260px] h-[200px] items-center justify-center">
      <Animated.View
        style={{ transform: [{ translateY: floatAnim }] }}
        className="items-center"
      >
        {/* Hotel central */}
        <View className="w-20 h-20 rounded-2xl bg-primary items-center justify-center mb-4 shadow-lg">
          <MapPin size={36} color={colors.white} strokeWidth={1.5} />
        </View>

        {/* Ícones de comodidades ao redor */}
        <View className="absolute -top-4 left-1/2 -ml-6">
          <Animatable.View animation="bounceIn" delay={100}>
            <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center shadow-sm">
              <Wifi size={22} color="#3B82F6" strokeWidth={2} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute top-8 -left-8">
          <Animatable.View animation="bounceIn" delay={200}>
            <View className="w-12 h-12 rounded-full bg-cyan-100 items-center justify-center shadow-sm">
              <Waves size={22} color="#06B6D4" strokeWidth={2} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute top-8 -right-8">
          <Animatable.View animation="bounceIn" delay={300}>
            <View className="w-12 h-12 rounded-full bg-amber-100 items-center justify-center shadow-sm">
              <Coffee size={22} color="#F59E0B" strokeWidth={2} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute bottom-4 -left-4">
          <Animatable.View animation="bounceIn" delay={400}>
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center shadow-sm">
              <Car size={22} color={colors.gray500} strokeWidth={2} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute bottom-4 -right-4">
          <Animatable.View animation="bounceIn" delay={500}>
            <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center shadow-sm">
              <Dumbbell size={22} color="#EA580C" strokeWidth={2} />
            </View>
          </Animatable.View>
        </View>

        <View className="absolute -bottom-8 left-1/2 -ml-6">
          <Animatable.View animation="bounceIn" delay={600}>
            <View className="w-12 h-12 rounded-full bg-pink-100 items-center justify-center shadow-sm">
              <Sparkles size={22} color="#EC4899" strokeWidth={2} />
            </View>
          </Animatable.View>
        </View>
      </Animated.View>
    </View>
  );

  return (
    <Animatable.View animation="fadeIn" duration={600}>
      {type === 'travelStyle' && renderTravelStyleIllustration()}
      {type === 'budget' && renderBudgetIllustration()}
      {type === 'amenities' && renderAmenitiesIllustration()}
    </Animatable.View>
  );
}
