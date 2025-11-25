/**
 * Toast Notification Utility
 * Centralized helper for displaying toast notifications across the app
 */

import Toast from 'react-native-toast-message';

export const showToast = {
  /**
   * Show success toast
   * @param message - Success message to display
   */
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      topOffset: 60,
    });
  },

  /**
   * Show error toast
   * @param message - Error message to display
   */
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 4000,
      topOffset: 60,
    });
  },

  /**
   * Show info toast
   * @param message - Info message to display
   */
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      position: 'top',
      visibilityTime: 3000,
      topOffset: 60,
    });
  },

  /**
   * Show warning toast (uses info type with different styling)
   * @param message - Warning message to display
   */
  warning: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      position: 'top',
      visibilityTime: 3500,
      topOffset: 60,
    });
  },
};
