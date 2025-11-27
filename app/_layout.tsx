import '../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { BookingProvider } from '@/contexts';
import { queryClient } from '@/config/queryClient';
import { makeServer } from '@/mocks';
import { initializeAuth } from '@/hooks/queries';

// Initialize MirageJS server for development
if (__DEV__) {
  makeServer({ environment: 'development' });
}

export default function RootLayout() {
  // Initialize auth from AsyncStorage on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <BookingProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </BookingProvider>
      </QueryClientProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
