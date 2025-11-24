import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Button, Input } from '@/components/ui';
import { useBooking } from '@context';
import { colors } from '@theme';

export default function HomeScreen() {
  const router = useRouter();
  const { booking, setSearchLocation, setGuests } = useBooking();
  const [location, setLocation] = useState(booking.searchLocation);
  const [guests, setGuestsInput] = useState(booking.guests.toString());

  const handleSearch = () => {
    setSearchLocation(location);
    if (guests) {
      setGuests(parseInt(guests));
    }
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Encontre a sua{'\n'}estadia perfeita</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Input
            label="Destino"
            placeholder="Para onde vai?"
            value={location}
            onChangeText={setLocation}
            leftIcon={<Search size={20} color={colors.gray400} />}
          />

          <Input
            label="Hóspedes"
            placeholder="Número de hóspedes"
            value={guests}
            onChangeText={setGuestsInput}
            keyboardType="number-pad"
          />

          <Button
            size="lg"
            fullWidth
            onPress={handleSearch}
            disabled={!location}
          >
            Pesquisar
          </Button>
        </View>

        {/* Quick Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            🏨 Descubra os melhores hotéis
          </Text>
          <Text style={styles.infoText}>
            ⭐ Avaliações verificadas
          </Text>
          <Text style={styles.infoText}>
            💰 Melhores preços garantidos
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    lineHeight: 40,
  },
  searchSection: {
    backgroundColor: colors.white,
    padding: 24,
    marginTop: 8,
  },
  infoSection: {
    backgroundColor: colors.white,
    padding: 24,
    marginTop: 8,
    gap: 16,
  },
  infoText: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
});
