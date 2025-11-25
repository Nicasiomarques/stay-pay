/**
 * Glassmorphism Style Utilities
 * Provides reusable glassmorphism effects for modern UI design
 * Note: For full glassmorphism with blur, use @react-native-community/blur's BlurView
 */

import { ViewStyle } from 'react-native';
import { colors } from '@theme';

/**
 * Light glassmorphism style
 * Use for: Subtle overlays, badges on images, floating elements
 */
export const glassLight: ViewStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  // Note: For actual blur effect, wrap with BlurView component
};

/**
 * Medium glassmorphism style
 * Use for: Modal backgrounds, cards over images, prominent floating elements
 */
export const glassMedium: ViewStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
};

/**
 * Heavy glassmorphism style
 * Use for: Bottom sheets, main modals, important overlays
 */
export const glassHeavy: ViewStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.4)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 8,
};

/**
 * Dark glassmorphism style
 * Use for: Dark overlays, text on light images, dark mode elements
 */
export const glassDark: ViewStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 4,
};

/**
 * Primary colored glassmorphism style
 * Use for: Brand-colored overlays, CTAs over images, highlighted elements
 */
export const glassPrimary: ViewStyle = {
  backgroundColor: `${colors.primary}20`, // 20 = 12.5% opacity in hex
  borderWidth: 1,
  borderColor: `${colors.primary}40`, // 40 = 25% opacity in hex
  shadowColor: colors.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
};

/**
 * Success colored glassmorphism style
 * Use for: Success badges, confirmation overlays, positive indicators
 */
export const glassSuccess: ViewStyle = {
  backgroundColor: 'rgba(34, 197, 94, 0.2)', // green-500 with 20% opacity
  borderWidth: 1,
  borderColor: 'rgba(34, 197, 94, 0.3)',
  shadowColor: '#22c55e',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4,
};

/**
 * Creates a custom glassmorphism style
 * @param opacity - Background opacity (0-1)
 * @param borderOpacity - Border opacity (0-1)
 * @param baseColor - RGB base color (e.g., '255, 255, 255' for white)
 * @returns ViewStyle object with glassmorphism effect
 */
export function createGlassStyle(
  opacity: number = 0.25,
  borderOpacity: number = 0.3,
  baseColor: string = '255, 255, 255'
): ViewStyle {
  return {
    backgroundColor: `rgba(${baseColor}, ${opacity})`,
    borderWidth: 1,
    borderColor: `rgba(${baseColor}, ${borderOpacity})`,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  };
}

/**
 * Glassmorphism utilities object for easier imports
 */
export const glass = {
  light: glassLight,
  medium: glassMedium,
  heavy: glassHeavy,
  dark: glassDark,
  primary: glassPrimary,
  success: glassSuccess,
  custom: createGlassStyle,
};

/**
 * Common glassmorphism border radius values
 */
export const glassRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};
