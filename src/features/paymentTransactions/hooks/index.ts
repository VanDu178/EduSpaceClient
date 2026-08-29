import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPaymentTransactionApi,
  getPaymentTransactionStatusApi,
  cancelPaymentTransactionApi,
} from '../services/paymentTransactionService';
import { PaymentTransactionData, CreatePaymentTransactionParams } from '../types';

export const PAYMENT_TRANSACTION_QUERY_KEYS = {
  all: ['paymentTransactions'] as const,
  status: (code: string) => [...PAYMENT_TRANSACTION_QUERY_KEYS.all, 'status', code] as const,
};

export interface UsePaymentTransactionStatusOptions {
  enabled?: boolean;
  refetchInterval?: number | false | ((query: any) => number | false);
}

/**
 * Hook lấy & theo dõi trạng thái đơn hàng giao dịch thanh toán (hỗ trợ Polling)
 */
export function usePaymentTransactionStatus(
  code: string,
  options?: UsePaymentTransactionStatusOptions
) {
  const { enabled = true, refetchInterval } = options || {};

  return useQuery<PaymentTransactionData>({
    queryKey: PAYMENT_TRANSACTION_QUERY_KEYS.status(code),
    queryFn: () => getPaymentTransactionStatusApi(code),
    enabled: Boolean(code) && enabled,
    refetchInterval,
  });
}

/**
 * Hook mutation khởi tạo đơn thanh toán mới từ Backend
 */
export function useCreatePaymentTransaction() {
  return useMutation({
    mutationFn: ({
      planId,
      billingCycle,
      paymentMethod,
      expectedPrice,
    }: CreatePaymentTransactionParams) =>
      createPaymentTransactionApi(planId, billingCycle, paymentMethod, expectedPrice),
  });
}

/**
 * Hook mutation hủy đơn thanh toán đang chờ xử lý
 */
export function useCancelPaymentTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => cancelPaymentTransactionApi(code),
    onSuccess: (_, code) => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_TRANSACTION_QUERY_KEYS.status(code) });
    },
  });
}
