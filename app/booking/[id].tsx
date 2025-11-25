import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando reserva...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Reserva não encontrada</Text>
          <Text style={styles.errorSubtext}>
            {error instanceof Error ? error.message : 'Erro ao carregar reserva'}
          </Text>
          <Button onPress={() => router.back()} style={{ marginTop: 16 }}>
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <X size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da Reserva</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(booking.status) + '20' },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(booking.status) },
              ]}
            >
              {booking.status}
            </Text>
          </View>

          {/* Hotel Info */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Hotel</Text>
            <Text style={styles.hotelName}>{booking.hotel}</Text>
            <View style={styles.infoRow}>
              <MapPin size={16} color={colors.gray500} />
              <Text style={styles.infoText}>{booking.location}</Text>
            </View>
          </Card>

          {/* Booking Details */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Detalhes da Reserva</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Código de Confirmação</Text>
              <Text style={styles.detailValue}>{booking.confirmationCode}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Número da Reserva</Text>
              <Text style={styles.detailValue}>#{booking.id}</Text>
            </View>

            <View style={styles.detailRow}>
              <Calendar size={16} color={colors.gray500} />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>Check-in</Text>
                <Text style={styles.detailValue}>
                  {new Date(booking.checkIn).toLocaleDateString('pt-PT', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Calendar size={16} color={colors.gray500} />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>Check-out</Text>
                <Text style={styles.detailValue}>
                  {new Date(booking.checkOut).toLocaleDateString('pt-PT', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Users size={16} color={colors.gray500} />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>Hóspedes</Text>
                <Text style={styles.detailValue}>{booking.guests} pessoa{booking.guests > 1 ? 's' : ''}</Text>
              </View>
            </View>
          </Card>

          {/* Guest Details */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Informações do Hóspede</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nome</Text>
              <Text style={styles.detailValue}>{booking.guestDetails.name}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{booking.guestDetails.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Telefone</Text>
              <Text style={styles.detailValue}>{booking.guestDetails.phone}</Text>
            </View>
          </Card>

          {/* Payment Info */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Informações de Pagamento</Text>

            <View style={styles.detailRow}>
              <CreditCard size={16} color={colors.gray500} />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>Método de Pagamento</Text>
                <Text style={styles.detailValue}>
                  {booking.paymentMethod === 'card' ? 'Cartão de Crédito' : 'Mobile Money'}
                </Text>
              </View>
            </View>

            {booking.paymentDetails?.cardNumber && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cartão</Text>
                <Text style={styles.detailValue}>{booking.paymentDetails.cardNumber}</Text>
              </View>
            )}

            <View style={styles.separator} />

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>{formatCurrency(booking.pricing.subtotal)}</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxa de Serviço</Text>
              <Text style={styles.priceValue}>{formatCurrency(booking.pricing.serviceFee)}</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Impostos</Text>
              <Text style={styles.priceValue}>{formatCurrency(booking.pricing.tax)}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(booking.pricing.total)}</Text>
            </View>
          </Card>

          {/* QR Code */}
          {booking.qrCode && (
            <Card style={styles.section}>
              <View style={styles.qrContainer}>
                <QrCode size={32} color={colors.primary} />
                <Text style={styles.qrText}>QR Code disponível no app</Text>
              </View>
            </Card>
          )}

          {/* Action Buttons */}
          {(canCancel || canReschedule) && (
            <View style={styles.actions}>
              {canReschedule && (
                <Button
                  variant="outline"
                  onPress={handleReschedule}
                  style={styles.actionButton}
                >
                  <RefreshCw size={16} color={colors.primary} />
                  <Text style={styles.rescheduleText}>Reagendar</Text>
                </Button>
              )}

              {canCancel && (
                <Button
                  variant="outline"
                  onPress={handleCancel}
                  style={[styles.actionButton, styles.cancelButton]}
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending ? (
                    <ActivityIndicator size="small" color={colors.error} />
                  ) : (
                    <>
                      <X size={16} color={colors.error} />
                      <Text style={styles.cancelText}>Cancelar Reserva</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  content: {
    padding: 24,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  priceValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  qrContainer: {
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  qrText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButton: {
    borderColor: colors.error,
  },
  rescheduleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
