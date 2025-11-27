/**
 * PaymentGateway
 * Handles all payment-related API calls
 */

import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapPaymentResponseToPaymentResult,
  mapMobileMoneyResponseToResult,
  mapPaymentStatusResponseToResult,
  mapRefundResponseToResult,
  PaymentResult,
  MobileMoneyResult,
  PaymentStatusResult,
  RefundResult,
} from '@/mappers';

export interface ProcessCardPaymentData {
  bookingId: string;
  amount: number;
  currency: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface ProcessMobileMoneyData {
  bookingId: string;
  phoneNumber: string;
  amount: number;
  provider: string;
}

export interface RefundData {
  bookingId: string;
  amount: number;
  reason?: string;
}

export const createPaymentGateway = (httpClient: IHttpClient) => {
  const processCardPayment = async (data: ProcessCardPaymentData): Promise<PaymentResult> => {
    const requestBody: DTOs.ProcessPaymentRequestDTO = {
      bookingId: data.bookingId,
      paymentMethod: 'card',
      amount: data.amount,
      currency: data.currency,
      paymentDetails: {
        cardNumber: data.cardNumber,
        cardHolder: data.cardHolder,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
      },
    };

    const response = await httpClient.post<DTOs.ProcessPaymentResponseDTO>(
      '/payments/process',
      requestBody
    );

    return mapPaymentResponseToPaymentResult(response.data);
  };

  const processMobileMoneyPayment = async (data: ProcessMobileMoneyData): Promise<MobileMoneyResult> => {
    const requestBody: DTOs.MobileMoneyRequestDTO = {
      bookingId: data.bookingId,
      phoneNumber: data.phoneNumber,
      amount: data.amount,
      provider: data.provider,
    };

    const response = await httpClient.post<DTOs.MobileMoneyResponseDTO>(
      '/payments/mobile-money',
      requestBody
    );

    return mapMobileMoneyResponseToResult(response.data);
  };

  const checkPaymentStatus = async (transactionId: string): Promise<PaymentStatusResult> => {
    const response = await httpClient.get<DTOs.PaymentStatusResponseDTO>(
      `/payments/${transactionId}/status`
    );

    return mapPaymentStatusResponseToResult(response.data);
  };

  const requestRefund = async (data: RefundData): Promise<RefundResult> => {
    const requestBody: DTOs.RefundRequestDTO = {
      bookingId: data.bookingId,
      amount: data.amount,
      reason: data.reason,
    };

    const response = await httpClient.post<DTOs.RefundResponseDTO>(
      '/payments/refund',
      requestBody
    );

    return mapRefundResponseToResult(response.data);
  };

  return {
    processCardPayment,
    processMobileMoneyPayment,
    checkPaymentStatus,
    requestRefund,
  };
};

export type PaymentGateway = ReturnType<typeof createPaymentGateway>;
