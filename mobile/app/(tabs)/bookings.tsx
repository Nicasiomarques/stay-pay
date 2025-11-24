import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Card } from '@/components/ui';
import { Calendar, MapPin } from 'lucide-react-native';
import { colors } from '@theme';

// Mock data
const mockBookings = [
  {
    id: 1,
    hotel: 'Hotel Trópico',
    location: 'Luanda, Angola',
    dates: '15-20 Dez 2024',
    status: 'Confirmed' as const,
    bookingNumber: 'BK-001234',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  },
];

export default function BookingsScreen() {
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
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Reservas</Text>
        <Text style={styles.subtitle}>
          {mockBookings.length} reserva{mockBookings.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {mockBookings.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhuma reserva ainda</Text>
          <Text style={styles.emptySubtext}>
            Suas reservas aparecerão aqui
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <Text style={styles.hotelName}>{item.hotel}</Text>
                <View
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
                </View>
              </View>

              <View style={styles.bookingInfo}>
                <View style={styles.infoRow}>
                  <MapPin size={16} color={colors.gray500} />
                  <Text style={styles.infoText}>{item.location}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Calendar size={16} color={colors.gray500} />
                  <Text style={styles.infoText}>{item.dates}</Text>
                </View>
              </View>

              <View style={styles.bookingFooter}>
                <Text style={styles.bookingNumber}>
                  #{item.bookingNumber}
                </Text>
              </View>
            </Card>
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookingNumber: {
    fontSize: 12,
    color: colors.gray400,
    fontWeight: '600',
  },
});
