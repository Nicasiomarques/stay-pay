import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, Settings, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { Card } from '@/components/ui';
import { showToast } from '@/utils';
import { colors } from '@theme';

export default function ProfileScreen() {
  const menuItems = [
    { icon: Settings, label: 'Configurações', action: () => showToast.info('Funcionalidade em breve') },
    { icon: Bell, label: 'Notificações', action: () => showToast.info('Funcionalidade em breve') },
    { icon: HelpCircle, label: 'Ajuda & Suporte', action: () => showToast.info('Funcionalidade em breve') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={40} color={colors.white} />
          </View>
          <Text style={styles.name}>João Silva</Text>
          <Text style={styles.email}>joao.silva@email.com</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.content}>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Mail size={20} color={colors.gray500} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>joao.silva@email.com</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Phone size={20} color={colors.gray500} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <Text style={styles.infoValue}>+244 900 000 000</Text>
              </View>
            </View>
          </Card>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={styles.menuItem}
                onPress={item.action}
              >
                <View style={styles.menuItemLeft}>
                  <item.icon size={20} color={colors.gray600} />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={colors.gray400} />
              </Pressable>
            ))}
          </View>

          {/* Logout */}
          <Pressable
            style={styles.logoutButton}
            onPress={() => showToast.info('Funcionalidade de logout em breve')}
          >
            <LogOut size={20} color={colors.error} />
            <Text style={styles.logoutText}>Sair</Text>
          </Pressable>
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
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  content: {
    padding: 24,
  },
  infoCard: {
    padding: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  menuSection: {
    marginTop: 24,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    marginTop: 24,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error + '40',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});
