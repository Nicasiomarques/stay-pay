import { View, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar, MapPin, Users, CreditCard, QrCode, X, RefreshCw } from 'lucide-react-native';
import { Button, Card } from '@/components/ui';
import { useBooking, useCancelBooking } from '@/hooks/queries';
import { formatCurrency, showToast } from '@/utils';
import { colors } from '@theme';

export default function BookingDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const bookingId = String(id);

  const { data: booking, isLoading, error } = useBooking(bookingId);
  const cancelMutation = useCancelBooking();

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Reserva',
      'Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelMutation.mutateAsync(bookingId);
              showToast.success('Reserva cancelada com sucesso');
              router.back();
            } catch (err) {
              showToast.error('Não foi possível cancelar a reserva');
            }
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    showToast.info('A funcionalidade de reagendamento estará disponível em breve');
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center p-6">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="mt-4 text-base text-gray-500">Carregando reserva...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !booking) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">Reserva não encontrada</Text>
          <Text className="text-sm text-gray-500 text-center">
            {error instanceof Error ? error.message : 'Erro ao carregar reserva'}
          </Text>
          <Button onPress={() => router.back()} className="mt-4">
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    );
  }

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

  const canCancel = booking.status === 'Confirmed';
  const canReschedule = booking.status === 'Confirmed';

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <X size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Detalhes da Reserva</Text>
          <View className="w-6" />
        </View>

        <View className="p-6">
          {/* Status Badge */}
          <View
            className="self-center px-4 py-2 rounded-2xl mb-6"
            style={{ backgroundColor: getStatusColor(booking.status) + '20' }}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: getStatusColor(booking.status) }}
            >
              {booking.status}
            </Text>
          </View>

          {/* Hotel Info */}
          <Card className="p-4 mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-4">Hotel</Text>
            <Text className="text-xl font-bold text-gray-900 mb-2">{booking.hotel}</Text>
            <View className="flex-row items-center gap-2">
              <MapPin size={16} color={colors.gray500} />
              <Text className="text-sm text-gray-500">{booking.location}</Text>
            </View>
          </Card>

          {/* Booking Details */}
          <Card className="p-4 mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-4">Detalhes da Reserva</Text>

            <View className="flex-row items-center gap-3 mb-4">
              <Text className="text-sm text-gray-500 mb-0.5">Código de Confirmação</Text>
              <Text className="text-base text-gray-900 font-medium">{booking.confirmationCode}</Text>
            </View>

            <View className="flex-row items-center gap-3 mb-4">
              <Text className="text-sm text-gray-500 mb-0.5">Número da Reserva</Text>
              <Text className="text-base text-gray-900 font-medium">#{booking.id}</Text>
            </View>

            <View className="flex-row items-center gap-3 mb-4">
              <Calendar size={16} color={colors.gray500} />
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-0.5">Check-in</Text>
                <Text className="text-base text-gray-900 font-medium">
                  {new Date(booking.checkIn).toLocaleDateString('pt-PT', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 mb-4">
              <Calendar size={16} color={colors.gray500} />
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-0.5">Check-out</Text>
                <Text className="text-base text-gray-900 font-medium">
                  {new Date(booking.checkOut).toLocaleDateString('pt-PT', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Users size={16} color={colors.gray500} />
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-0.5">Hóspedes</Text>
                <Text className="text-base text-gray-900 font-medium">
                  {booking.guests} pessoa{booking.guests > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          </Card>

          {/* Guest Details */}
          <Card className="p-4 mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-4">Informações do Hóspede</Text>

            <View className="flex-row items-center gap-3 mb-4">
              <Text className="text-sm text-gray-500 mb-0.5">Nome</Text>
              <Text className="text-base text-gray-900 font-medium">{booking.guestDetails.name}</Text>
            </View>

            <View className="flex-row items-center gap-3 mb-4">
              <Text className="text-sm text-gray-500 mb-0.5">Email</Text>
              <Text className="text-base text-gray-900 font-medium">{booking.guestDetails.email}</Text>
            </View>

            <View className="flex-row items-center gap-3">
              <Text className="text-sm text-gray-500 mb-0.5">Telefone</Text>
              <Text className="text-base text-gray-900 font-medium">{booking.guestDetails.phone}</Text>
            </View>
          </Card>

          {/* Payment Info */}
          <Card className="p-4 mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-4">Informações de Pagamento</Text>

            <View className="flex-row items-center gap-3 mb-4">
              <CreditCard size={16} color={colors.gray500} />
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-0.5">Método de Pagamento</Text>
                <Text className="text-base text-gray-900 font-medium">
                  {booking.paymentMethod === 'card' ? 'Cartão de Crédito' : 'Mobile Money'}
                </Text>
              </View>
            </View>

            {booking.paymentDetails?.cardNumber && (
              <View className="flex-row items-center gap-3 mb-4">
                <Text className="text-sm text-gray-500 mb-0.5">Cartão</Text>
                <Text className="text-base text-gray-900 font-medium">{booking.paymentDetails.cardNumber}</Text>
              </View>
            )}

            <View className="h-px bg-gray-200 my-3" />

            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm text-gray-500">Subtotal</Text>
              <Text className="text-sm text-gray-900 font-medium">{formatCurrency(booking.pricing.subtotal)}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm text-gray-500">Taxa de Serviço</Text>
              <Text className="text-sm text-gray-900 font-medium">{formatCurrency(booking.pricing.serviceFee)}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm text-gray-500">Impostos</Text>
              <Text className="text-sm text-gray-900 font-medium">{formatCurrency(booking.pricing.tax)}</Text>
            </View>

            <View className="h-px bg-gray-200 my-3" />

            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-gray-900">Total</Text>
              <Text className="text-xl font-bold text-primary">{formatCurrency(booking.pricing.total)}</Text>
            </View>
          </Card>

          {/* QR Code */}
          {booking.qrCode && (
            <Card className="p-4 mb-4">
              <View className="items-center p-4 gap-3">
                <QrCode size={32} color={colors.primary} />
                <Text className="text-sm text-gray-500">QR Code disponível no app</Text>
              </View>
            </Card>
          )}

          {/* Action Buttons */}
          {(canCancel || canReschedule) && (
            <View className="gap-3 mt-2">
              {canReschedule && (
                <Button
                  variant="outline"
                  onPress={handleReschedule}
                  className="flex-row items-center justify-center gap-2"
                >
                  <RefreshCw size={16} color={colors.primary} />
                  <Text className="text-base font-semibold text-primary">Reagendar</Text>
                </Button>
              )}

              {canCancel && (
                <Button
                  variant="outline"
                  onPress={handleCancel}
                  className="flex-row items-center justify-center gap-2 border-error"
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending ? (
                    <ActivityIndicator size="small" color={colors.error} />
                  ) : (
                    <>
                      <X size={16} color={colors.error} />
                      <Text className="text-base font-semibold text-error">Cancelar Reserva</Text>
                    </>
                  )}
                </Button>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
