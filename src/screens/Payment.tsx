import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileScreen from '../components/MobileScreen';
import Button from '../components/Button';
import Input from '../components/Input';
import { ArrowLeft, CreditCard, Smartphone, Building2, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Payment() {
  const navigate = useNavigate();
  const { booking, setPaymentMethod, calculateTotal } = useBooking();
  const [paymentMethod, setLocalPaymentMethod] = useState(booking.paymentMethod);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const total = calculateTotal();

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
    { id: 'property', label: 'Pay at Property', icon: Building2 },
  ];

  const handlePayment = () => {
    setPaymentMethod(paymentMethod);
    navigate('/confirmation');
  };

  const handlePaymentMethodChange = (method: string) => {
    setLocalPaymentMethod(method);
  };

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Payment</h1>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-32">
        {/* Payment Method Selection */}
        <div>
          <h2 className="text-gray-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    paymentMethod === method.id
                      ? 'border-[#0E64D2] bg-[#0E64D2]/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    paymentMethod === method.id ? 'bg-[#0E64D2]' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      paymentMethod === method.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <span className="text-gray-900 flex-1 text-left">{method.label}</span>
                  {paymentMethod === method.id && (
                    <Check className="w-5 h-5 text-[#0E64D2]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Card Details</h2>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                icon={<CreditCard className="w-5 h-5" />}
              />
              <Input
                type="text"
                placeholder="John Doe"
                label="Cardholder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="MM/YY"
                  label="Expiry Date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="123"
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Money */}
        {paymentMethod === 'mobile' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Mobile Money</h2>
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                label="Phone Number"
                icon={<Smartphone className="w-5 h-5" />}
              />
              <div className="p-4 bg-[#0E64D2]/5 rounded-xl border border-[#0E64D2]/10">
                <p className="text-sm text-gray-600">
                  You will receive a prompt on your phone to approve the payment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pay at Property */}
        {paymentMethod === 'property' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Pay at Property</h2>
            <div className="p-4 bg-[#0E64D2]/5 rounded-xl border border-[#0E64D2]/10">
              <p className="text-sm text-gray-600 mb-3">
                Pay when you arrive at the property. A deposit may be required to secure your booking.
              </p>
              <p className="text-sm text-gray-900">
                Please note: Cancellation policies still apply.
              </p>
            </div>
          </div>
        )}

        {/* Billing Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Billing Information</h2>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="john@example.com"
              label="Email"
            />
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              label="Phone Number"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-gray-900">${total}</span>
        </div>
        <Button fullWidth onClick={handlePayment}>
          Complete Booking
        </Button>
      </div>
    </MobileScreen>
  );
}