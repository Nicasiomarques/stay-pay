import { PRICING } from '@/constants/pricing';

export const calculateTax = (subtotal: number): number => {
  return Math.round(subtotal * PRICING.TAX_RATE);
};

export const calculateTotal = (
  subtotal: number,
  serviceFee: number = PRICING.SERVICE_FEE
): number => {
  const tax = calculateTax(subtotal);
  return subtotal + serviceFee + tax;
};
