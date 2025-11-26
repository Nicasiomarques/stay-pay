import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
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
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando reservas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Erro ao carregar reservas</Text>
          <Text style={styles.errorSubtext}>
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
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={500} style={styles.header}>
        <Text style={styles.title}>Minhas Reservas</Text>
        <Text style={styles.subtitle}>
          {bookings.length} reserva{bookings.length !== 1 ? 's' : ''}
        </Text>
      </Animatable.View>

      {bookings.length === 0 ? (
        <Animatable.View animation="fadeIn" delay={200} style={styles.empty}>
          <Text style={styles.emptyText}>Nenhuma reserva ainda</Text>
          <Text style={styles.emptySubtext}>
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
                <Card style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <Text style={styles.hotelName}>{item.hotel}</Text>
                    <Animatable.View
                      animation="fadeIn"
                      delay={index * 100 + 200}
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(item.status) + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(item.status) },
                        ]}
                      >
                        {item.status}
                      </Text>
                    </Animatable.View>
                  </View>

                  <View style={styles.bookingInfo}>
                    <View style={styles.infoRow}>
                      <MapPin size={16} color={colors.gray500} />
                      <Text style={styles.infoText}>{item.location}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Calendar size={16} color={colors.gray500} />
                      <Text style={styles.infoText}>
                        {new Date(item.checkIn).toLocaleDateString('pt-PT')} - {new Date(item.checkOut).toLocaleDateString('pt-PT')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.bookingFooter}>
                    <Text style={styles.bookingNumber}>
                      #{item.id}
                    </Text>
                    <ChevronRight size={20} color={colors.gray400} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Animatable.View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  list: {
    padding: 24,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  bookingCard: {
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingInfo: {
    gap: 8,
    marginBottom: 12,
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
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookingNumber: {
    fontSize: 12,
    color: colors.gray400,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
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
