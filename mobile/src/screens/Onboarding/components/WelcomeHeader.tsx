import { View, Text, StyleSheet } from 'react-native';
import { Hotel, Sparkles, Shield, Clock } from 'lucide-react-native';
import { colors } from '@theme';

export function WelcomeHeader() {
  return (
    <View style={styles.container}>
      {/* Icon with Glassmorphism Effect */}
      <View style={styles.iconContainer}>
        <View style={styles.iconGlow} />
        <Hotel size={40} color={colors.white} strokeWidth={2} />
      </View>

      <Text style={styles.title}>Bem-vindo ao StayGo</Text>
      <Text style={styles.subtitle}>
        Reserve a sua estadia perfeita em segundos
      </Text>

      {/* Trust Signals */}
      <View style={styles.trustSignals}>
        <View style={styles.trustItem}>
          <Sparkles size={16} color={colors.primary} strokeWidth={2} />
          <Text style={styles.trustText}>+10k hotéis</Text>
        </View>
        <View style={styles.trustDivider} />
        <View style={styles.trustItem}>
          <Shield size={16} color={colors.primary} strokeWidth={2} />
          <Text style={styles.trustText}>100% seguro</Text>
        </View>
        <View style={styles.trustDivider} />
        <View style={styles.trustItem}>
          <Clock size={16} color={colors.primary} strokeWidth={2} />
          <Text style={styles.trustText}>Reserva rápida</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    backgroundColor: colors.primary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  iconGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.gray900,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  trustSignals: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 48,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  trustDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.border,
  },
});
