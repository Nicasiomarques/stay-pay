import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { WelcomeHeader, OnboardingForm } from './components';
import { colors } from '@theme';

export default function OnboardingScreen() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (phone) {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Subtle Gradient Background */}
      <LinearGradient
        colors={['#F0F9FF', '#FFFFFF', '#FEFCE8']}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.centerContent}>
          <WelcomeHeader />
          <OnboardingForm
            phone={phone}
            onPhoneChange={setPhone}
            onContinue={handleContinue}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 384,
    alignSelf: 'center',
  },
});
