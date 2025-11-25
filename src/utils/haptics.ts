/**
 * Haptic Feedback Utility
 * Provides consistent haptic feedback throughout the app
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Light impact haptic feedback
 * Use for: Button taps, chip selections, small interactions
 */
export async function lightHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Medium impact haptic feedback
 * Use for: Modal opens, filter applications, significant actions
 */
export async function mediumHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Heavy impact haptic feedback
 * Use for: Important confirmations, booking submissions, critical actions
 */
export async function heavyHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Success notification haptic feedback
 * Use for: Successful bookings, confirmations, positive outcomes
 */
export async function successHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Warning notification haptic feedback
 * Use for: Warnings, important notices, cautions
 */
export async function warningHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Error notification haptic feedback
 * Use for: Errors, failed actions, validation errors
 */
export async function errorHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Selection changed haptic feedback
 * Use for: Slider changes, picker selections, value changes
 */
export async function selectionHaptic() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      // Haptics not available, fail silently
    }
  }
}

/**
 * Haptic utilities object for easier imports
 */
export const haptics = {
  light: lightHaptic,
  medium: mediumHaptic,
  heavy: heavyHaptic,
  success: successHaptic,
  warning: warningHaptic,
  error: errorHaptic,
  selection: selectionHaptic,
};
