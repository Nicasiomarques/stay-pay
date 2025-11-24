import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, Smartphone, Building2, Check } from 'lucide-react-native';
import { Button, Input, Card } from '@/components/ui';
import { useBooking } from '@context';
import { PaymentMethod } from '@context';
import { formatCurrency } from '@/utils';
import { colors } from '@theme';

export default function PaymentScreen() {
  const router = useRouter();
  const { booking, setPaymentMethod, calculateTotal } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(booking.paymentMethod);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      icon: CreditCard,
      title: 'Cartão de Crédito/Débito',
      subtitle: 'Visa, Mastercard, etc.',
    },
    {
      id: 'mobile' as PaymentMethod,
      icon: Smartphone,
      title: 'Mobile Money',
      subtitle: 'Unitel Money, Multicaixa',
    },
    {
      id: 'property' as PaymentMethod,
      icon: Building2,
      title: 'Pagar na Propriedade',
      subtitle: 'Pague no check-in',
    },
  ];

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    // Validação básica
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert('Por favor, preencha todos os campos do cartão');
        return;
      }
    }

    // Simular processamento
    router.push('/confirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pagamento</Text>
          <Text style={styles.subtitle}>
            Escolha o método de pagamento
          </Text>
        </View>

        <View style={styles.content}>
          {/* Payment Methods */}
          <View style={styles.methodsContainer}>
            {paymentMethods.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <Pressable
                  key={method.id}
                  style={[
                    styles.methodCard,
                    isSelected && styles.methodCardSelected,
                  ]}
                  onPress={() => handlePaymentMethodSelect(method.id)}
                >
                  <View style={styles.methodIcon}>
                    <method.icon
                      size={24}
                      color={isSelected ? colors.primary : colors.gray600}
                    />
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkIcon}>
                      <Check size={20} color={colors.white} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Card Details Form */}
          {selectedMethod === 'card' && (
            <Card style={styles.cardForm}>
              <Text style={styles.formTitle}>Detalhes do Cartão</Text>

              <Input
                label="Número do Cartão"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="number-pad"
                maxLength={19}
              />

              <Input
                label="Nome no Cartão"
                placeholder="JOÃO SILVA"
                value={cardName}
                onChangeText={setCardName}
                autoCapitalize="characters"
              />

              <View style={styles.cardRow}>
                <View style={styles.cardRowItem}>
                  <Input
                    label="Validade"
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    keyboardType="number-pad"
                    maxLength={5}
                    containerStyle={{ marginBottom: 0 }}
                  />
                </View>
                <View style={styles.cardRowItem}>
                  <Input
                    label="CVV"
                    placeholder="123"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                    containerStyle={{ marginBottom: 0 }}
                  />
                </View>
              </View>
            </Card>
          )}

          {/* Mobile Money Info */}
          {selectedMethod === 'mobile' && (
            <Card style={styles.infoCard}>
              <Text style={styles.infoTitle}>Instruções</Text>
              <Text style={styles.infoText}>
                Será redirecionado para o seu serviço de Mobile Money para completar o pagamento.
              </Text>
            </Card>
          )}

          {/* Property Payment Info */}
          {selectedMethod === 'property' && (
            <Card style={styles.infoCard}>
              <Text style={styles.infoTitle}>Pagamento na Propriedade</Text>
              <Text style={styles.infoText}>
                Você pode pagar no check-in com dinheiro ou cartão. A reserva será confirmada mas o pagamento será processado no hotel.
              </Text>
            </Card>
          )}

          {/* Total Summary */}
          <Card style={styles.totalCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a Pagar</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(calculateTotal())}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <Button size="lg" fullWidth onPress={handleConfirmPayment}>
          {selectedMethod === 'property' ? 'Confirmar Reserva' : 'Pagar Agora'}
        </Button>
      </View>
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
  methodsContainer: {
    gap: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  methodCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  methodSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  checkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardForm: {
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardRowItem: {
    flex: 1,
  },
  infoCard: {
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  totalCard: {
    padding: 16,
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: {
    padding: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
