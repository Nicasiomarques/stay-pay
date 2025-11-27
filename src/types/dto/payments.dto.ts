/**
 * Data Transfer Objects (DTOs) for Payments API responses
 * These types represent the raw data structure from the API
 */

export type PaymentMethodType = 'card' | 'mobile-money';
export type PaymentStatus = 'success' | 'pending' | 'failed';

export interface ProcessPaymentRequestDTO {
  bookingId: string;
  paymentMethod: PaymentMethodType;
  amount: number;
  currency: string;
  paymentDetails: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export interface ProcessPaymentResponseDTO {
  transactionId: string;
  status: PaymentStatus;
  bookingId: string;
  amount: number;
  currency: string;
  timestamp: string;
}

export interface MobileMoneyRequestDTO {
  bookingId: string;
  phoneNumber: string;
  amount: number;
  provider: string;
}

export interface MobileMoneyResponseDTO {
  transactionId: string;
  status: PaymentStatus;
  message: string;
}

export interface PaymentStatusResponseDTO {
  transactionId: string;
  status: PaymentStatus;
  bookingId: string;
}

export interface RefundRequestDTO {
  bookingId: string;
  amount: number;
  reason?: string;
}

export interface RefundResponseDTO {
  refundId: string;
  status: string;
  estimatedTime: string;
}
