import { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar, MapPin, Users, CreditCard, Download, CheckCircle } from 'lucide-react-native';
import { Button, Card } from '@/components/ui';
import { useBooking } from '@context';
import { useBooking as useBookingQuery } from '@/hooks/queries';
import { formatCurrency, formatGuestCount } from '@/utils';
import { colors } from '@theme';
import { haptics } from '@/utils/haptics';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { booking, calculateTotal, getNights, resetBooking, getTotalGuests } = useBooking();

  // Fetch booking details from API if we have a bookingId
  const { data: bookingData, isLoading } = useBookingQuery(bookingId || '', {
    enabled: !!bookingId,
  });

  useEffect(() => {
    if (booking.hotel || bookingData) {
      haptics.success();
    }
  }, [booking.hotel, bookingData]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="mt-4 text-base text-gray-500">A carregar confirmação...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!booking.hotel && !bookingData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-base text-gray-500">Nenhuma reserva encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Use API data if available, otherwise fall back to context
  const bookingNumber = bookingData?.confirmationCode || `BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const selectedRoom = booking.hotel?.rooms[booking.selectedRoom];

  // Helper to get total from API or context
  const totalAmount = bookingData?.pricing?.total || calculateTotal();
  const guestsCount = bookingData?.guests || getTotalGuests();

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatApiDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleViewBookings = () => {
    resetBooking();
    router.replace('/(tabs)/bookings');
  };

  const handleBackToHome = () => {
    resetBooking();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        {/* Success Icon */}
        <Animatable.View animation="bounceIn" duration={600} className="items-center pt-12 pb-6">
          <CheckCircle size={80} color={colors.success} />
        </Animatable.View>

        {/* Title */}
        <Animatable.View animation="fadeInUp" delay={200} duration={400} className="items-center px-6 mb-8">
          <Text className="text-[28px] font-bold text-gray-900 mb-2 text-center">
            Reserva Confirmada!
          </Text>
          <Text className="text-base text-gray-500 text-center">
            A sua reserva foi confirmada com sucesso
          </Text>
        </Animatable.View>

        <View className="px-6 gap-4">
          {/* Booking Number */}
          <Animatable.View animation="fadeInUp" delay={300} duration={400}>
            <Card
              className="p-5 items-center"
              style={{
                backgroundColor: colors.primary + '10',
                borderWidth: 1,
                borderColor: colors.primary + '40',
              }}
            >
              <Text className="text-sm text-gray-500 mb-2">Número da Reserva</Text>
              <Text className="text-2xl font-bold text-primary tracking-widest">
                {bookingNumber}
              </Text>
            </Card>
          </Animatable.View>

          {/* Hotel Info */}
          <Animatable.View animation="fadeInUp" delay={400} duration={400}>
            <Card className="p-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Detalhes da Reserva
              </Text>

              <View className="mb-4">
                <Text className="text-xl font-semibold text-gray-900 mb-2">
                  {booking.hotel?.name || 'Hotel'}
                </Text>
                {selectedRoom && (
                  <View className="self-start bg-gray-100 px-3 py-1.5 rounded-lg">
                    <Text className="text-xs font-semibold text-gray-700">
                      {selectedRoom.type}
                    </Text>
                  </View>
                )}
              </View>

              <View className="gap-4">
                <View className="flex-row items-start gap-3">
                  <MapPin size={20} color={colors.gray500} />
                  <Text className="text-base text-gray-900 flex-1">
                    {booking.hotel?.location || 'Localização'}
                  </Text>
                </View>

                <View className="flex-row items-start gap-3">
                  <Calendar size={20} color={colors.gray500} />
                  <View>
                    <Text className="text-base text-gray-900">
                      {bookingData ? formatApiDate(bookingData.checkIn) : formatDate(booking.checkIn)}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-0.5">
                      até {bookingData ? formatApiDate(bookingData.checkOut) : formatDate(booking.checkOut)} ({getNights()} {getNights() === 1 ? 'noite' : 'noites'})
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-start gap-3">
                  <Users size={20} color={colors.gray500} />
                  <Text className="text-base text-gray-900">
                    {bookingData
                      ? `${guestsCount} ${guestsCount === 1 ? 'hóspede' : 'hóspedes'}`
                      : formatGuestCount(booking.guests)}
                  </Text>
                </View>

                <View className="flex-row items-start gap-3">
                  <CreditCard size={20} color={colors.gray500} />
                  <Text className="text-base text-gray-900">
                    {booking.paymentMethod === 'card' ? 'Cartão' :
                     booking.paymentMethod === 'mobile' ? 'Mobile Money' :
                     'Pagar na Propriedade'}
                  </Text>
                </View>
              </View>
            </Card>
          </Animatable.View>

          {/* Price Summary */}
          <Animatable.View animation="fadeInUp" delay={500} duration={400}>
            <Card className="p-4 items-center">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Total Pago
              </Text>
              <Text className="text-[32px] font-bold text-success my-2">
                {formatCurrency(totalAmount)}
              </Text>
              {booking.paymentMethod === 'property' && (
                <Text className="text-xs text-gray-500 italic">
                  * Pagamento será realizado no check-in
                </Text>
              )}
            </Card>
          </Animatable.View>

          {/* Next Steps */}
          <Animatable.View animation="fadeInUp" delay={600} duration={400}>
            <Card className="p-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Próximos Passos
              </Text>
              <View className="gap-4">
                <View className="flex-row items-start gap-3">
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                    <Text className="text-sm font-bold text-white">1</Text>
                  </View>
                  <Text className="flex-1 text-sm text-gray-900 leading-5 pt-1">
                    Recebera um email de confirmação
                  </Text>
                </View>
                <View className="flex-row items-start gap-3">
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                    <Text className="text-sm font-bold text-white">2</Text>
                  </View>
                  <Text className="flex-1 text-sm text-gray-900 leading-5 pt-1">
                    Chegue no hotel na data de check-in
                  </Text>
                </View>
                <View className="flex-row items-start gap-3">
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                    <Text className="text-sm font-bold text-white">3</Text>
                  </View>
                  <Text className="flex-1 text-sm text-gray-900 leading-5 pt-1">
                    Apresente o número da reserva na recepção
                  </Text>
                </View>
              </View>
            </Card>
          </Animatable.View>

          {/* Download Button */}
          <Animatable.View animation="fadeInUp" delay={700} duration={400}>
            <Button variant="outline" fullWidth className="flex-row gap-2 items-center justify-center">
              <Download size={20} color={colors.primary} />
              <Text className="text-base font-semibold text-primary">
                Baixar Comprovante
              </Text>
            </Button>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <Animatable.View
        animation="slideInUp"
        delay={800}
        duration={400}
        className="p-6 bg-white border-t border-gray-200 gap-3"
      >
        <Button variant="outline" fullWidth onPress={handleViewBookings}>
          Ver Minhas Reservas
        </Button>
        <Button fullWidth onPress={handleBackToHome}>
          Voltar ao Início
        </Button>
      </Animatable.View>
    </SafeAreaView>
  );
}
