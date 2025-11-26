import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui';
import { Calendar, MapPin, ChevronRight } from 'lucide-react-native';
import { useBookings } from '@/hooks/queries';
import { colors } from '@theme';

export default function BookingsScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useBookings();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="mt-4 text-base text-gray-500">
            Carregando reservas...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Erro ao carregar reservas
          </Text>
          <Text className="text-sm text-gray-500 text-center">
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const bookings = data?.bookings || [];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return colors.status.confirmed;
      case 'Completed':
        return colors.status.completed;
      case 'Cancelled':
        return colors.status.cancelled;
      default:
        return colors.gray500;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Animatable.View
        animation="fadeInDown"
        duration={500}
        className="bg-white px-6 pt-4 pb-4 border-b border-gray-200"
      >
        <Text className="text-[28px] font-bold text-gray-900 mb-1">
          Minhas Reservas
        </Text>
        <Text className="text-sm text-gray-500">
          {bookings.length} reserva{bookings.length !== 1 ? 's' : ''}
        </Text>
      </Animatable.View>

      {bookings.length === 0 ? (
        <Animatable.View
          animation="fadeIn"
          delay={200}
          className="flex-1 justify-center items-center p-6"
        >
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma reserva ainda
          </Text>
          <Text className="text-sm text-gray-500 text-center">
            Suas reservas aparecerão aqui
          </Text>
        </Animatable.View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 100}
              duration={500}
            >
              <TouchableOpacity onPress={() => router.push(`/booking/${item.id}`)}>
                <Card className="p-4 mb-4">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-lg font-semibold text-gray-900 flex-1">
                      {item.hotel}
                    </Text>
                    <Animatable.View
                      animation="fadeIn"
                      delay={index * 100 + 200}
                      className="px-3 py-1 rounded-xl"
                      style={{ backgroundColor: getStatusColor(item.status) + '20' }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: getStatusColor(item.status) }}
                      >
                        {item.status}
                      </Text>
                    </Animatable.View>
                  </View>

                  <View className="gap-2 mb-3">
                    <View className="flex-row items-center gap-2">
                      <MapPin size={16} color={colors.gray500} />
                      <Text className="text-sm text-gray-500">{item.location}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Calendar size={16} color={colors.gray500} />
                      <Text className="text-sm text-gray-500">
                        {new Date(item.checkIn).toLocaleDateString('pt-PT')} - {new Date(item.checkOut).toLocaleDateString('pt-PT')}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center pt-3 border-t border-gray-200">
                    <Text className="text-xs font-semibold text-gray-400">
                      #{item.id}
                    </Text>
                    <ChevronRight size={20} color={colors.gray400} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Animatable.View>
          )}
          contentContainerClassName="p-6"
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
