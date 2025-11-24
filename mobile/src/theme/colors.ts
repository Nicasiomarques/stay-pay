/**
 * StayGo Theme Colors
 * Based on the original web app design
 */

export const colors = {
  // Primary Brand Color
  primary: '#0E64D2',
  primaryLight: '#3B82F6',
  primaryDark: '#0A4FA3',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',

  // Gray Scale
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',

  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // UI Colors
  border: '#E5E5E5',
  divider: '#F5F5F5',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text Colors
  text: {
    primary: '#171717',
    secondary: '#737373',
    tertiary: '#A3A3A3',
    inverse: '#FFFFFF',
    link: '#0E64D2',
  },

  // Status Colors
  status: {
    confirmed: '#10B981',
    completed: '#3B82F6',
    cancelled: '#EF4444',
  },
} as const;

export type Colors = typeof colors;
