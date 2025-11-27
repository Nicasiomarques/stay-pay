import { View, Text, ScrollView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, Users, CreditCard } from 'lucide-react-native';
import { Button, Card } from '@/components/ui';
import { useBooking } from '@/contexts';
import { formatCurrency, formatGuestCount, formatNightCount } from '@/utils';
import { colors } from '@theme';

export default function BookingReviewScreen() {
  const router = useRouter();
  const { booking, calculateTotal, getNights } = useBooking();

  if (!booking.hotel) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center">
          <Text className="text-base text-gray-500">Nenhum hotel selecionado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const nights = getNights();
  const selectedRoom = booking.hotel.rooms[booking.selectedRoom];
  const subtotal = nights * selectedRoom.price;
  const serviceFee = 15;
  const tax = Math.round(subtotal * 0.08);
  const total = calculateTotal();

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleContinue = () => {
    router.push('/payment');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View
          animation="fadeInDown"
          duration={500}
          className="bg-white p-6 pt-8 border-b border-gray-200"
        >
          <Text className="text-[28px] font-bold text-gray-900 mb-2">
            Reveja a Reserva
          </Text>
          <Text className="text-base text-gray-500">
            Confirme os detalhes antes de prosseguir
          </Text>
        </Animatable.View>

        <View className="p-6 gap-4">
          {/* Hotel Card */}
          <Animatable.View animation="fadeInUp" delay={100} duration={500}>
            <Card className="overflow-hidden p-0">
              <Image
                source={{ uri: booking.hotel.image }}
                className="w-full h-[150px]"
                resizeMode="cover"
              />
              <View className="p-4">
                <Text className="text-xl font-semibold text-gray-900 mb-1">
                  {booking.hotel.name}
                </Text>
                <Text className="text-sm text-gray-500 mb-3">
                  {booking.hotel.location}
                </Text>
                <View
                  className="self-start px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <Text className="text-xs font-semibold text-primary">
                    {selectedRoom.type}
                  </Text>
                </View>
              </View>
            </Card>
          </Animatable.View>

          {/* Booking Details */}
          <Animatable.View animation="fadeInUp" delay={200} duration={500}>
            <Card className="p-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Detalhes da Reserva
              </Text>

              <Animatable.View animation="fadeIn" delay={300} className="flex-row mb-4">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <Calendar size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Datas</Text>
                  <Text className="text-base font-semibold text-gray-900">
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    {formatNightCount(nights)}
                  </Text>
                </View>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={400} className="flex-row mb-4">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <Users size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Hóspedes</Text>
                  <Text className="text-base font-semibold text-gray-900">
                    {formatGuestCount(booking.guests)}
                  </Text>
                </View>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={500} className="flex-row">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <CreditCard size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Pagamento</Text>
                  <Text className="text-base font-semibold text-gray-900">
                    {booking.paymentMethod === 'card' ? 'Cartão' :
                     booking.paymentMethod === 'mobile' ? 'Mobile Money' :
                     'Na Propriedade'}
                  </Text>
                </View>
              </Animatable.View>
            </Card>
          </Animatable.View>

          {/* Price Breakdown */}
          <Animatable.View animation="fadeInUp" delay={300} duration={500}>
            <Card className="p-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Resumo de Preços
              </Text>

              <Animatable.View animation="fadeIn" delay={400} className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-500">
                  {formatCurrency(selectedRoom.price)} × {nights} {nights === 1 ? 'noite' : 'noites'}
                </Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {formatCurrency(subtotal)}
                </Text>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={450} className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-500">Taxa de serviço</Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {formatCurrency(serviceFee)}
                </Text>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={500} className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-500">Impostos (8%)</Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {formatCurrency(tax)}
                </Text>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={550} className="h-px bg-gray-200 my-3" />

              <Animatable.View animation="pulse" delay={600} className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-900">Total</Text>
                <Text className="text-xl font-bold text-primary">
                  {formatCurrency(total)}
                </Text>
              </Animatable.View>
            </Card>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <Animatable.View
        animation="slideInUp"
        delay={500}
        duration={500}
        className="p-6 bg-white border-t border-gray-200 gap-4"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-gray-500">Total</Text>
          <Text className="text-2xl font-bold text-primary">
            {formatCurrency(total)}
          </Text>
        </View>
        <Button size="lg" fullWidth onPress={handleContinue}>
          Prosseguir para Pagamento
        </Button>
      </Animatable.View>
    </SafeAreaView>
  );
}
