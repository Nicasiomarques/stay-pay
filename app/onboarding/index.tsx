import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { IsometricHotel } from '@/components/illustrations';
import { PhoneInput } from '@/components/ui/PhoneInput';

export default function OnboardingScreen() {
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const buttonRef = useRef<Animatable.View & View>(null);

  const handlePhoneChange = (value: string) => {
    const wasEmpty = !phone;
    setPhone(value);

    // Pop animation when phone becomes valid for the first time
    if (wasEmpty && value && buttonRef.current) {
      buttonRef.current.pulse?.(300);
    }
  };

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
            <Animatable.View
              animation="bounceIn"
              duration={1000}
              className="w-[280px] h-[280px] mb-6"
            >
              <IsometricHotel width={280} height={280} />
            </Animatable.View>

            {/* Headline */}
            <Animatable.Text
              animation="fadeInUp"
              delay={200}
              duration={600}
              className="text-4xl font-bold text-gray-900 text-center leading-10 mb-3"
            >
              Stay In Style!{'\n'}Book With A Smile!
            </Animatable.Text>

            {/* Subtitle */}
            <Animatable.Text
              animation="fadeInUp"
              delay={400}
              duration={600}
              className="text-base text-gray-500 text-center leading-6 mb-10 px-4"
            >
              Your perfect stay is just a reservation away, book now and make
              moments that matter.
            </Animatable.Text>

            {/* Phone Input */}
            <Animatable.View
              animation="fadeInUp"
              delay={600}
              duration={600}
              className="w-full mb-6"
            >
              <PhoneInput
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="Número de telefone"
                defaultCode="AO"
              />
            </Animatable.View>
          </View>

          {/* Bottom Section: Buttons */}
          <Animatable.View
            animation="fadeInUp"
            delay={800}
            duration={600}
            className="flex-row items-center justify-between w-full"
          >
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
              <Animatable.View
                animation="fadeIn"
                delay={900}
                className="w-8 h-1 bg-gray-900 rounded-sm"
              />
              <Animatable.View
                animation="fadeIn"
                delay={1000}
                className="w-8 h-1 bg-gray-200 rounded-sm"
              />
              <Animatable.View
                animation="fadeIn"
                delay={1100}
                className="w-8 h-1 bg-gray-200 rounded-sm"
              />
            </View>

            {/* Continue Button - Circular Green */}
            <Animatable.View
              ref={buttonRef}
              animation="bounceIn"
              delay={1000}
              duration={800}
            >
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
            </Animatable.View>
          </Animatable.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
