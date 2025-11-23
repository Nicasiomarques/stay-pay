import { CreditCard, Smartphone, Building2 } from 'lucide-react';

export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
  { id: 'property', label: 'Pay at Property', icon: Building2 },
] as const;
