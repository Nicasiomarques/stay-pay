import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, Button, Input, HeaderWithBack } from '@components';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import { CreditCard, Smartphone, Building2, AlertCircle } from 'lucide-react';
import { useBooking } from '@context';
import { formatCurrency } from '@/utils/formatters';

type PaymentMethodType = 'card' | 'mobile' | 'property';

interface ValidationErrors {
  cardNumber?: string;
  cardHolder?: string;
  expiry?: string;
  cvv?: string;
  phoneNumber?: string;
  email?: string;
  billingPhone?: string;
}

export default function Payment() {
  const navigate = useNavigate();
  const { booking, setPaymentMethod, calculateTotal } = useBooking();
  const [paymentMethod, setLocalPaymentMethod] = useState<PaymentMethodType>(
    (booking.paymentMethod as PaymentMethodType) || 'card'
  );
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = calculateTotal();

  const paymentMethods = [
    { id: 'card', label: 'Cartão de Crédito/Débito', icon: CreditCard },
    { id: 'mobile', label: 'Dinheiro Móvel', icon: Smartphone },
    { id: 'property', label: 'Pagar na Propriedade', icon: Building2 },
  ];

  const validateCardNumber = (num: string): boolean => {
    const cleaned = num.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  };

  const validateExpiry = (exp: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [month, year] = exp.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
  };

  const validateCVV = (cvvValue: string): boolean => {
    return /^\d{3,4}$/.test(cvvValue);
  };

  const validatePhone = (phone: string): boolean => {
    return /^[\d\s+()-]{10,}$/.test(phone);
  };

  const validateEmail = (emailValue: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate billing info for all payment methods
    if (!email || !validateEmail(email)) {
      newErrors.email = 'Por favor, insira um endereço de e-mail válido';
    }
    if (!billingPhone || !validatePhone(billingPhone)) {
      newErrors.billingPhone = 'Por favor, insira um número de telefone válido';
    }

    // Validate payment method specific fields
    if (paymentMethod === 'card') {
      if (!cardNumber || !validateCardNumber(cardNumber)) {
        newErrors.cardNumber = 'Por favor, insira um número de cartão válido (13-19 dígitos)';
      }
      if (!cardHolder || cardHolder.trim().length < 3) {
        newErrors.cardHolder = 'Por favor, insira o nome do titular do cartão';
      }
      if (!expiry || !validateExpiry(expiry)) {
        newErrors.expiry = 'Por favor, insira uma data de validade válida (MM/AA)';
      }
      if (!cvv || !validateCVV(cvv)) {
        newErrors.cvv = 'Por favor, insira um CVV válido (3-4 dígitos)';
      }
    } else if (paymentMethod === 'mobile') {
      if (!phoneNumber || !validatePhone(phoneNumber)) {
        newErrors.phoneNumber = 'Por favor, insira um número de telefone válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setPaymentMethod(paymentMethod);

    // Simulate payment processing
    setTimeout(() => {
      navigate('/confirmation');
    }, 500);
  };

  const handlePaymentMethodChange = (method: string) => {
    setLocalPaymentMethod(method as PaymentMethodType);
    setErrors({});
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 23); // Max 19 digits + 4 spaces
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <HeaderWithBack title="Pagamento" />

      <div className="p-6 space-y-6 pb-32">
        {/* Payment Method Selection */}
        <div>
          <h2 className="text-gray-900 mb-4">Método de Pagamento</h2>
          <PaymentMethodSelector
            methods={paymentMethods}
            selectedMethod={paymentMethod}
            onMethodChange={handlePaymentMethodChange}
          />
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Detalhes do Cartão</h2>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  label="Número do Cartão"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  icon={<CreditCard className="w-5 h-5" />}
                />
                {errors.cardNumber && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.cardNumber}</span>
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="João Silva"
                  label="Nome do Titular"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                />
                {errors.cardHolder && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.cardHolder}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="MM/AA"
                    label="Data de Validade"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  />
                  {errors.expiry && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.expiry}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="123"
                    label="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  />
                  {errors.cvv && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.cvv}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Money */}
        {paymentMethod === 'mobile' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Dinheiro Móvel</h2>
            <div className="space-y-4">
              <div>
                <Input
                  type="tel"
                  placeholder="+244 900 000 000"
                  label="Número de Telefone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  icon={<Smartphone className="w-5 h-5" />}
                />
                {errors.phoneNumber && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.phoneNumber}</span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-[#0E64D2]/5 rounded-xl border border-[#0E64D2]/10">
                <p className="text-sm text-gray-600">
                  Receberá uma solicitação no seu telefone para aprovar o pagamento.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pay at Property */}
        {paymentMethod === 'property' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Pagar na Propriedade</h2>
            <div className="p-4 bg-[#0E64D2]/5 rounded-xl border border-[#0E64D2]/10">
              <p className="text-sm text-gray-600 mb-3">
                Pague quando chegar à propriedade. Pode ser necessário um depósito para garantir a sua reserva.
              </p>
              <p className="text-sm text-gray-900">
                Nota: As políticas de cancelamento continuam a aplicar-se.
              </p>
            </div>
          </div>
        )}

        {/* Billing Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Informações de Faturação</h2>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="joao@exemplo.com"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
            <div>
              <Input
                type="tel"
                placeholder="+244 900 000 000"
                label="Número de Telefone"
                value={billingPhone}
                onChange={(e) => setBillingPhone(e.target.value)}
              />
              {errors.billingPhone && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.billingPhone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Valor Total</span>
          <span className="text-gray-900">{formatCurrency(total)}</span>
        </div>
        <Button fullWidth onClick={handlePayment} disabled={isSubmitting}>
          {isSubmitting ? 'A processar...' : 'Concluir Reserva'}
        </Button>
      </div>
    </MobileScreen>
  );
}