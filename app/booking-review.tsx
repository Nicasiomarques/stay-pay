import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, Users, CreditCard } from 'lucide-react-native';
import { Button, Card } from '@/components/ui';
import { useBooking } from '@context';
import { formatCurrency, formatGuestCount, formatNightCount } from '@/utils';
import { colors } from '@theme';

export default function BookingReviewScreen() {
  const router = useRouter();
  const { booking, calculateTotal, getNights } = useBooking();

  if (!booking.hotel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Nenhum hotel selecionado</Text>
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={500} style={styles.header}>
          <Text style={styles.title}>Reveja a Reserva</Text>
          <Text style={styles.subtitle}>
            Confirme os detalhes antes de prosseguir
          </Text>
        </Animatable.View>

        <View style={styles.content}>
          {/* Hotel Card */}
          <Animatable.View animation="fadeInUp" delay={100} duration={500}>
            <Card style={styles.hotelCard}>
              <Image
                source={{ uri: booking.hotel.image }}
                style={styles.hotelImage}
                resizeMode="cover"
              />
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>{booking.hotel.name}</Text>
                <Text style={styles.hotelLocation}>{booking.hotel.location}</Text>
                <View style={styles.roomBadge}>
                  <Text style={styles.roomBadgeText}>{selectedRoom.type}</Text>
                </View>
              </View>
            </Card>
          </Animatable.View>

          {/* Booking Details */}
          <Animatable.View animation="fadeInUp" delay={200} duration={500}>
            <Card style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Detalhes da Reserva</Text>

              <Animatable.View animation="fadeIn" delay={300} style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Calendar size={20} color={colors.primary} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Datas</Text>
                  <Text style={styles.detailValue}>
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </Text>
                  <Text style={styles.detailSubvalue}>
                    {formatNightCount(nights)}
                  </Text>
                </View>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={400} style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Users size={20} color={colors.primary} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Hóspedes</Text>
                  <Text style={styles.detailValue}>
                    {formatGuestCount(booking.guests)}
                  </Text>
                </View>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={500} style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <CreditCard size={20} color={colors.primary} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Pagamento</Text>
                  <Text style={styles.detailValue}>
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
            <Card style={styles.priceCard}>
              <Text style={styles.sectionTitle}>Resumo de Preços</Text>

              <Animatable.View animation="fadeIn" delay={400} style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  {formatCurrency(selectedRoom.price)} × {nights} {nights === 1 ? 'noite' : 'noites'}
                </Text>
                <Text style={styles.priceValue}>{formatCurrency(subtotal)}</Text>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={450} style={styles.priceRow}>
                <Text style={styles.priceLabel}>Taxa de serviço</Text>
                <Text style={styles.priceValue}>{formatCurrency(serviceFee)}</Text>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={500} style={styles.priceRow}>
                <Text style={styles.priceLabel}>Impostos (8%)</Text>
                <Text style={styles.priceValue}>{formatCurrency(tax)}</Text>
              </Animatable.View>

              <Animatable.View animation="fadeIn" delay={550} style={styles.priceDivider} />

              <Animatable.View animation="pulse" delay={600} style={styles.priceRow}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>{formatCurrency(total)}</Text>
              </Animatable.View>
            </Card>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <Animatable.View animation="slideInUp" delay={500} duration={500} style={styles.footer}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerTotal}>{formatCurrency(total)}</Text>
        </View>
        <Button size="lg" fullWidth onPress={handleContinue}>
          Prosseguir para Pagamento
        </Button>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
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
  header: {
    backgroundColor: colors.white,
    padding: 24,
    paddingTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  hotelCard: {
    overflow: 'hidden',
    padding: 0,
  },
  hotelImage: {
    width: '100%',
    height: 150,
  },
  hotelInfo: {
    padding: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  hotelLocation: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  roomBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roomBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  detailsCard: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  detailSubvalue: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  priceCard: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  priceDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  priceTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  priceTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: {
    padding: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 16,
  },
  footerSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  footerTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
