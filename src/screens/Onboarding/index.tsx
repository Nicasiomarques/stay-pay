import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { IsometricHotel } from '@/components/illustrations';
import { PhoneInput } from '@/components/ui/PhoneInput';

export default function OnboardingScreen() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (phone) {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-[60px] pb-10 justify-between">
          {/* Top Section: Illustration + Text */}
          <View className="items-center">
            {/* 3D Hotel Illustration - SVG with Animation */}
            <View className="w-[280px] h-[280px] mb-6">
              <IsometricHotel width={280} height={280} />
            </View>

            {/* Headline */}
            <Text className="text-4xl font-bold text-gray-900 text-center leading-10 mb-3">
              Stay In Style!{'\n'}Book With A Smile!
            </Text>

            {/* Subtitle */}
            <Text className="text-base text-gray-500 text-center leading-6 mb-10 px-4">
              Your perfect stay is just a reservation away, book now and make
              moments that matter.
            </Text>

            {/* Phone Input */}
            <View className="w-full mb-6">
              <PhoneInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Número de telefone"
                defaultCode="AO"
              />
            </View>
          </View>

          {/* Bottom Section: Buttons */}
          <View className="flex-row items-center justify-between w-full">
            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleSkip}
              activeOpacity={0.7}
              className="py-4"
            >
              <Text className="text-base font-medium text-gray-500">Skip</Text>
            </TouchableOpacity>

            {/* Progress Indicator */}
            <View className="flex-row gap-2">
              <View className="w-8 h-1 bg-gray-900 rounded-sm" />
              <View className="w-8 h-1 bg-gray-200 rounded-sm" />
              <View className="w-8 h-1 bg-gray-200 rounded-sm" />
            </View>

            {/* Continue Button - Circular Green */}
            <TouchableOpacity
              onPress={handleContinue}
              disabled={!phone}
              activeOpacity={0.8}
              className={`w-14 h-14 rounded-full items-center justify-center ${
                phone ? 'bg-secondary' : 'bg-gray-300'
              }`}
              style={phone ? {
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              } : {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <ArrowRight size={24} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
