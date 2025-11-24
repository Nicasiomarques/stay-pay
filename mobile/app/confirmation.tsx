import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, MapPin, Users, CreditCard, Download, CheckCircle } from 'lucide-react-native';
import { Button, Card } from '@/components/ui';
import { useBooking } from '@context';
import { formatCurrency, formatGuestCount } from '@/utils';
import { colors } from '@theme';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { booking, calculateTotal, getNights, resetBooking } = useBooking();

  if (!booking.hotel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Nenhuma reserva encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const bookingNumber = `BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const selectedRoom = booking.hotel.rooms[booking.selectedRoom];

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('pt-PT', {
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <CheckCircle size={80} color={colors.success} />
        </View>

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Reserva Confirmada!</Text>
          <Text style={styles.subtitle}>
            A sua reserva foi confirmada com sucesso
          </Text>
        </View>

        <View style={styles.content}>
          {/* Booking Number */}
          <Card style={styles.bookingNumberCard}>
            <Text style={styles.bookingNumberLabel}>Número da Reserva</Text>
            <Text style={styles.bookingNumber}>{bookingNumber}</Text>
          </Card>

          {/* Hotel Info */}
          <Card style={styles.infoCard}>
            <Text style={styles.cardTitle}>Detalhes da Reserva</Text>

            <View style={styles.hotelHeader}>
              <Text style={styles.hotelName}>{booking.hotel.name}</Text>
              <View style={styles.roomBadge}>
                <Text style={styles.roomBadgeText}>{selectedRoom.type}</Text>
              </View>
            </View>

            <View style={styles.detailsList}>
              <View style={styles.detailItem}>
                <MapPin size={20} color={colors.gray500} />
                <Text style={styles.detailText}>{booking.hotel.location}</Text>
              </View>

              <View style={styles.detailItem}>
                <Calendar size={20} color={colors.gray500} />
                <View>
                  <Text style={styles.detailText}>
                    {formatDate(booking.checkIn)}
                  </Text>
                  <Text style={styles.detailSubtext}>
                    até {formatDate(booking.checkOut)} ({getNights()} {getNights() === 1 ? 'noite' : 'noites'})
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Users size={20} color={colors.gray500} />
                <Text style={styles.detailText}>
                  {formatGuestCount(booking.guests)}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <CreditCard size={20} color={colors.gray500} />
                <Text style={styles.detailText}>
                  {booking.paymentMethod === 'card' ? 'Cartão' :
                   booking.paymentMethod === 'mobile' ? 'Mobile Money' :
                   'Pagar na Propriedade'}
                </Text>
              </View>
            </View>
          </Card>

          {/* Price Summary */}
          <Card style={styles.priceCard}>
            <Text style={styles.cardTitle}>Total Pago</Text>
            <Text style={styles.totalAmount}>{formatCurrency(calculateTotal())}</Text>
            {booking.paymentMethod === 'property' && (
              <Text style={styles.paymentNote}>
                * Pagamento será realizado no check-in
              </Text>
            )}
          </Card>

          {/* Next Steps */}
          <Card style={styles.nextStepsCard}>
            <Text style={styles.cardTitle}>Próximos Passos</Text>
            <View style={styles.stepsList}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  Recebera um email de confirmação
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Chegue no hotel na data de check-in
                </Text>
              </View>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Apresente o número da reserva na recepção
                </Text>
              </View>
            </View>
          </Card>

          {/* Download Button */}
          <Button
            variant="outline"
            fullWidth
            style={styles.downloadButton}
          >
            <Download size={20} color={colors.primary} />
            <Text style={styles.downloadText}>Baixar Comprovante</Text>
          </Button>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        <Button
          variant="outline"
          fullWidth
          onPress={handleViewBookings}
          style={styles.footerButton}
        >
          Ver Minhas Reservas
        </Button>
        <Button
          fullWidth
          onPress={handleBackToHome}
          style={styles.footerButton}
        >
          Voltar ao Início
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  successIcon: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    gap: 16,
  },
  bookingNumberCard: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  bookingNumberLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  bookingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  infoCard: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  hotelHeader: {
    marginBottom: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  roomBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roomBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray700,
  },
  detailsList: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  detailSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  priceCard: {
    padding: 16,
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.success,
    marginVertical: 8,
  },
  paymentNote: {
    fontSize: 12,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  nextStepsCard: {
    padding: 16,
  },
  stepsList: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    paddingTop: 4,
  },
  downloadButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    padding: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  footerButton: {
    marginBottom: 0,
  },
});
