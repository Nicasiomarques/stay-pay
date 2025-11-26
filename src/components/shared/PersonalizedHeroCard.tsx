import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, MapPin, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { haptics } from '@/utils/haptics';
import { glass, glassRadius } from '@/utils/glassmorphism';
import { colors } from '@theme';

const { width } = Dimensions.get('window');

type HeroVariant = 'welcome' | 'continue' | 'recommended';

interface PersonalizedHeroCardProps {
  variant: HeroVariant;
  lastSearchLocation?: string;
  recommendedDestination?: string;
  onCTAPress?: () => void;
}

const containerShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
  elevation: 8,
};

const ctaButtonShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
};

export function PersonalizedHeroCard({
  variant,
  lastSearchLocation,
  recommendedDestination,
  onCTAPress,
}: PersonalizedHeroCardProps) {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(20));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCTAPress = () => {
    haptics.medium();
    if (onCTAPress) {
      onCTAPress();
    } else {
      router.push('/search');
    }
  };

  const getHeroContent = () => {
    switch (variant) {
      case 'welcome':
        return {
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop',
          icon: Sparkles,
          title: 'Bem-vindo ao StayGo',
          subtitle: 'Descubra acomodações incríveis em todo o mundo',
          ctaText: 'Explorar Hotéis',
        };
      case 'continue':
        return {
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop',
          icon: MapPin,
          title: `Continue sua busca`,
          subtitle: lastSearchLocation
            ? `Vimos que você buscou por ${lastSearchLocation}`
            : 'Retome de onde parou',
          ctaText: 'Ver Resultados',
        };
      case 'recommended':
        return {
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=600&fit=crop',
          icon: TrendingUp,
          title: `Recomendado para você`,
          subtitle: recommendedDestination
            ? `Baseado nas suas buscas, você pode gostar de ${recommendedDestination}`
            : 'Ofertas selecionadas especialmente',
          ctaText: 'Descobrir Agora',
        };
    }
  };

  const content = getHeroContent();
  const Icon = content.icon;

  return (
    <Animated.View
      className="mx-6 my-4 rounded-3xl overflow-hidden"
      style={[
        {
          width: width - 48,
          height: 220,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        containerShadow,
      ]}
    >
      <TouchableOpacity
        onPress={handleCTAPress}
        activeOpacity={0.9}
        className="w-full h-full"
      >
        <ImageBackground
          source={{ uri: content.image }}
          className="w-full h-full"
          imageStyle={{ borderRadius: 24 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
            className="flex-1 p-6 justify-between"
          >
            {/* Icon Badge */}
            <View
              className="self-start w-12 h-12 items-center justify-center"
              style={[glass.light, { borderRadius: glassRadius.full }]}
            >
              <Icon size={20} color={colors.white} />
            </View>

            {/* Content */}
            <View className="gap-3">
              <Text className="text-[26px] font-bold text-white leading-8">
                {content.title}
              </Text>
              <Text className="text-[15px] text-white opacity-95 leading-[22px]">
                {content.subtitle}
              </Text>

              {/* CTA Button */}
              <TouchableOpacity
                className="self-start bg-white px-6 py-3.5 rounded-[28px] mt-2"
                style={ctaButtonShadow}
                onPress={handleCTAPress}
                activeOpacity={0.8}
              >
                <Text className="text-base font-semibold text-primary">
                  {content.ctaText}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}
