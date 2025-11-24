import { View, Text, StyleSheet } from 'react-native';
import { Hotel } from 'lucide-react-native';
import { colors } from '@theme';

export function WelcomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Hotel size={40} color={colors.white} />
      </View>

      <Text style={styles.title}>Bem-vindo ao StayGo</Text>
      <Text style={styles.subtitle}>
        Reserve a sua estadia perfeita em segundos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 48,
    textAlign: 'center',
  },
});
