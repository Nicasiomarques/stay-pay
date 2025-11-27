import { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CreditCard, Smartphone, Building2, Check } from 'lucide-react-native';
import { Button, Input, Card } from '@/components/ui';
import { useBooking } from '@/contexts';
import { PaymentMethod } from '@/contexts';
import { useCreateBooking, useUserProfile } from '@/hooks/queries';
import { formatCurrency, showToast } from '@/utils';
import { colors } from '@theme';

export default function PaymentScreen() {
  const router = useRouter();
  const { booking, setPaymentMethod, calculateTotal, getTotalGuests } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(booking.paymentMethod);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const checkRefs = useRef<Record<string, any>>({});

  // Get user profile for guest details
  const { data: userProfile } = useUserProfile();

  // Create booking mutation
  const createBookingMutation = useCreateBooking({
    onSuccess: (data) => {
      // Navigate to confirmation with booking ID
      router.push(`/confirmation?bookingId=${data.booking.id}`);
    },
    onError: () => {
      showToast.error('Erro ao criar reserva. Tente novamente.');
    },
  });

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      icon: CreditCard,
      title: 'Cartão de Crédito/Débito',
      subtitle: 'Visa, Mastercard, etc.',
    },
    {
      id: 'mobile' as PaymentMethod,
      icon: Smartphone,
      title: 'Mobile Money',
      subtitle: 'Unitel Money, Multicaixa',
    },
    {
      id: 'property' as PaymentMethod,
      icon: Building2,
      title: 'Pagar na Propriedade',
      subtitle: 'Pague no check-in',
    },
  ];

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentMethod(method);
    // Animate checkmark
    checkRefs.current[method]?.bounceIn?.(400);
  };

  const handleConfirmPayment = () => {
    // Validação básica
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        showToast.warning('Por favor, preencha todos os campos do cartão');
        return;
      }
    }

    if (!booking.hotel || !booking.checkIn || !booking.checkOut) {
      showToast.error('Dados da reserva incompletos');
      return;
    }

    const selectedRoom = booking.hotel.rooms[booking.selectedRoom];

    // Create booking via API
    createBookingMutation.mutate({
      hotelId: booking.hotel.id,
      roomId: selectedRoom.id,
      checkIn: booking.checkIn.toISOString(),
      checkOut: booking.checkOut.toISOString(),
      guests: getTotalGuests(),
      guestName: userProfile?.name || 'Hóspede',
      guestEmail: userProfile?.email || 'guest@example.com',
      guestPhone: userProfile?.phone || '',
      paymentMethod: selectedMethod === 'mobile' ? 'mobile-money' : 'card',
      cardNumber: selectedMethod === 'card' ? cardNumber : undefined,
      cardHolder: selectedMethod === 'card' ? cardName : undefined,
    });
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
            Pagamento
          </Text>
          <Text className="text-base text-gray-500">
            Escolha o método de pagamento
          </Text>
        </Animatable.View>

        <View className="p-6 gap-4">
          {/* Payment Methods */}
          <View className="gap-3">
            {paymentMethods.map((method, index) => {
              const isSelected = selectedMethod === method.id;
              return (
                <Animatable.View
                  key={method.id}
                  animation="fadeInUp"
                  delay={100 + index * 100}
                  duration={500}
                >
                  <Pressable
                    className={`flex-row items-center p-4 bg-white rounded-xl border-2 ${
                      isSelected ? 'border-primary' : 'border-gray-200'
                    }`}
                    style={isSelected ? { backgroundColor: colors.primary + '10' } : undefined}
                    onPress={() => handlePaymentMethodSelect(method.id)}
                  >
                    <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
                      <method.icon
                        size={24}
                        color={isSelected ? colors.primary : colors.gray600}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-900 mb-1">
                        {method.title}
                      </Text>
                      <Text className="text-sm text-gray-500">{method.subtitle}</Text>
                    </View>
                    {isSelected && (
                      <Animatable.View
                        ref={(ref) => { checkRefs.current[method.id] = ref; }}
                        animation="bounceIn"
                        duration={400}
                        className="w-7 h-7 rounded-full bg-primary items-center justify-center"
                      >
                        <Check size={20} color={colors.white} />
                      </Animatable.View>
                    )}
                  </Pressable>
                </Animatable.View>
              );
            })}
          </View>

          {/* Card Details Form */}
          {selectedMethod === 'card' && (
            <Animatable.View animation="fadeInUp" duration={400}>
              <Card className="p-4">
                <Text className="text-lg font-semibold text-gray-900 mb-4">
                  Detalhes do Cartão
                </Text>

                <Input
                  label="Número do Cartão"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={19}
                />

                <Input
                  label="Nome no Cartão"
                  placeholder="JOÃO SILVA"
                  value={cardName}
                  onChangeText={setCardName}
                  autoCapitalize="characters"
                />

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Input
                      label="Validade"
                      placeholder="MM/AA"
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                      keyboardType="number-pad"
                      maxLength={5}
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                  <View className="flex-1">
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={cvv}
                      onChangeText={setCvv}
                      keyboardType="number-pad"
                      maxLength={3}
                      secureTextEntry
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                </View>
              </Card>
            </Animatable.View>
          )}

          {/* Mobile Money Info */}
          {selectedMethod === 'mobile' && (
            <Animatable.View animation="fadeInUp" duration={400}>
              <Card className="p-4">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                  Instruções
                </Text>
                <Text className="text-sm text-gray-500 leading-5">
                  Será redirecionado para o seu serviço de Mobile Money para completar o pagamento.
                </Text>
              </Card>
            </Animatable.View>
          )}

          {/* Property Payment Info */}
          {selectedMethod === 'property' && (
            <Animatable.View animation="fadeInUp" duration={400}>
              <Card className="p-4">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                  Pagamento na Propriedade
                </Text>
                <Text className="text-sm text-gray-500 leading-5">
                  Você pode pagar no check-in com dinheiro ou cartão. A reserva será confirmada mas o pagamento será processado no hotel.
                </Text>
              </Card>
            </Animatable.View>
          )}

          {/* Total Summary */}
          <Animatable.View animation="fadeIn" delay={400} duration={500}>
            <Card
              className="p-4 border border-primary/40"
              style={{ backgroundColor: colors.primary + '10' }}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-900">
                  Total a Pagar
                </Text>
                <Animatable.Text
                  animation="pulse"
                  iterationCount={1}
                  className="text-2xl font-bold text-primary"
                >
                  {formatCurrency(calculateTotal())}
                </Animatable.Text>
              </View>
            </Card>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <Animatable.View
        animation="slideInUp"
        delay={500}
        duration={500}
        className="p-6 bg-white border-t border-gray-200"
      >
        <Button
          size="lg"
          fullWidth
          onPress={handleConfirmPayment}
          disabled={createBookingMutation.isPending}
        >
          {createBookingMutation.isPending
            ? 'A processar...'
            : selectedMethod === 'property'
            ? 'Confirmar Reserva'
            : 'Pagar Agora'}
        </Button>
      </Animatable.View>
    </SafeAreaView>
  );
}
