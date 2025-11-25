import { View, Text } from 'react-native';
import { Hotel, Sparkles, Shield, Clock } from 'lucide-react-native';

export function WelcomeHeader() {
  return (
    <View className="items-center">
      {/* Icon with Glassmorphism Effect */}
      <View
        className="w-24 h-24 bg-primary rounded-3xl items-center justify-center mb-8 relative overflow-hidden"
        style={{
          shadowColor: '#0E64D2',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        <View className="absolute -top-5 -right-5 w-[60px] h-[60px] bg-white/20 rounded-full" />
        <Hotel size={40} color="#FFFFFF" strokeWidth={2} />
      </View>

      <Text className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
        Bem-vindo ao StayGo
      </Text>
      <Text className="text-base text-gray-500 mb-8 text-center leading-6">
        Reserve a sua estadia perfeita em segundos
      </Text>

      {/* Trust Signals */}
      <View className="flex-row items-center justify-center gap-4 py-4 px-6 bg-gray-50 rounded-lg border border-gray-200 mb-12">
        <View className="flex-row items-center gap-1.5">
          <Sparkles size={16} color="#0E64D2" strokeWidth={2} />
          <Text className="text-xs font-semibold text-gray-500">+10k hotéis</Text>
        </View>
        <View className="w-px h-4 bg-gray-200" />
        <View className="flex-row items-center gap-1.5">
          <Shield size={16} color="#0E64D2" strokeWidth={2} />
          <Text className="text-xs font-semibold text-gray-500">100% seguro</Text>
        </View>
        <View className="w-px h-4 bg-gray-200" />
        <View className="flex-row items-center gap-1.5">
          <Clock size={16} color="#0E64D2" strokeWidth={2} />
          <Text className="text-xs font-semibold text-gray-500">Reserva rápida</Text>
        </View>
      </View>
    </View>
  );
}
