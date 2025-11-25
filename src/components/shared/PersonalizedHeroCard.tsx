/**
 * PersonalizedHeroCard Component
 * Dynamic hero card with context-aware variants
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleCTAPress}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <ImageBackground
          source={{ uri: content.image }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            {/* Icon Badge */}
            <View style={[styles.iconBadge, glass.light, { borderRadius: glassRadius.full }]}>
              <Icon size={20} color={colors.white} />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.subtitle}>{content.subtitle}</Text>

              {/* CTA Button */}
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={handleCTAPress}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaText}>{content.ctaText}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 48,
    height: 220,
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 24,
  },
  gradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  iconBadge: {
    alignSelf: 'flex-start',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.white,
    opacity: 0.95,
    lineHeight: 22,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 28,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
