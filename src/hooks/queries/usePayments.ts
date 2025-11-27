/**
 * usePayments Hook
 * React Query hooks for payment mutations
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { getPaymentGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import {
  PaymentResult,
  MobileMoneyResult,
  PaymentStatusResult,
  RefundResult,
} from '@/mappers';
import {
  ProcessCardPaymentData,
  ProcessMobileMoneyData,
  RefundData,
} from '@/repositories/PaymentGateway';
import { showToast } from '@/utils';

/**
 * Hook to process card payment
 */
export const useProcessCardPayment = (
  options?: UseMutationOptions<PaymentResult, Error, ProcessCardPaymentData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProcessCardPaymentData) => getPaymentGateway().processCardPayment(data),
    onSuccess: (result) => {
      // Invalidate bookings to reflect the payment
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      // Invalidate notifications
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      showToast.success('Pagamento processado com sucesso');
    },
    onError: () => {
      showToast.error('Erro ao processar pagamento');
    },
    ...options,
  });
};

/**
 * Hook to process mobile money payment
 */
export const useProcessMobileMoneyPayment = (
  options?: UseMutationOptions<MobileMoneyResult, Error, ProcessMobileMoneyData>
) => {
  return useMutation({
    mutationFn: (data: ProcessMobileMoneyData) => getPaymentGateway().processMobileMoneyPayment(data),
    onSuccess: (result) => {
      if (result.status === 'pending') {
        showToast.info(result.message);
      } else {
        showToast.success('Pagamento processado com sucesso');
      }
    },
    onError: () => {
      showToast.error('Erro ao processar pagamento Mobile Money');
    },
    ...options,
  });
};

/**
 * Hook to check payment status
 */
export const usePaymentStatus = (
  transactionId: string,
  options?: Omit<UseQueryOptions<PaymentStatusResult>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['payment-status', transactionId],
    queryFn: () => getPaymentGateway().checkPaymentStatus(transactionId),
    enabled: !!transactionId,
    refetchInterval: (data) => {
      // Stop polling when payment is no longer pending
      if (data?.status !== 'pending') {
        return false;
      }
      return 3000; // Poll every 3 seconds while pending
    },
    ...options,
  });
};

/**
 * Hook to request refund
 */
export const useRequestRefund = (
  options?: UseMutationOptions<RefundResult, Error, RefundData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RefundData) => getPaymentGateway().requestRefund(data),
    onSuccess: (result) => {
      // Invalidate bookings
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      showToast.success(`Reembolso solicitado. ${result.estimatedTime}`);
    },
    onError: () => {
      showToast.error('Erro ao solicitar reembolso');
    },
    ...options,
  });
};
