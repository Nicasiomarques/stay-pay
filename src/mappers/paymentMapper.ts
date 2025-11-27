/**
 * Payment Mapper
 * Transforms payment DTOs to domain models
 */

import {
  ProcessPaymentResponseDTO,
  MobileMoneyResponseDTO,
  PaymentStatusResponseDTO,
  RefundResponseDTO,
  PaymentStatus,
} from '@/types/dto';

/**
 * Domain model for Payment Result
 */
export interface PaymentResult {
  transactionId: string;
  status: PaymentStatus;
  bookingId: string;
  amount: number;
  currency: string;
  timestamp: string;
}

/**
 * Domain model for Mobile Money Result
 */
export interface MobileMoneyResult {
  transactionId: string;
  status: PaymentStatus;
  message: string;
}

/**
 * Domain model for Payment Status
 */
export interface PaymentStatusResult {
  transactionId: string;
  status: PaymentStatus;
  bookingId: string;
}

/**
 * Domain model for Refund Result
 */
export interface RefundResult {
  refundId: string;
  status: string;
  estimatedTime: string;
}

/**
 * Maps ProcessPaymentResponseDTO to PaymentResult domain model
 */
export const mapPaymentResponseToPaymentResult = (dto: ProcessPaymentResponseDTO): PaymentResult => {
  return {
    transactionId: dto.transactionId,
    status: dto.status,
    bookingId: dto.bookingId,
    amount: dto.amount,
    currency: dto.currency,
    timestamp: dto.timestamp,
  };
};

/**
 * Maps MobileMoneyResponseDTO to MobileMoneyResult domain model
 */
export const mapMobileMoneyResponseToResult = (dto: MobileMoneyResponseDTO): MobileMoneyResult => {
  return {
    transactionId: dto.transactionId,
    status: dto.status,
    message: dto.message,
  };
};

/**
 * Maps PaymentStatusResponseDTO to PaymentStatusResult domain model
 */
export const mapPaymentStatusResponseToResult = (dto: PaymentStatusResponseDTO): PaymentStatusResult => {
  return {
    transactionId: dto.transactionId,
    status: dto.status,
    bookingId: dto.bookingId,
  };
};

/**
 * Maps RefundResponseDTO to RefundResult domain model
 */
export const mapRefundResponseToResult = (dto: RefundResponseDTO): RefundResult => {
  return {
    refundId: dto.refundId,
    status: dto.status,
    estimatedTime: dto.estimatedTime,
  };
};
