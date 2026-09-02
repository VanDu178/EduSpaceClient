import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPaymentTransactionApi,
  getPaymentTransactionByCodeApi,
  getPaymentTransactionStatusApi,
  cancelPaymentTransactionApi,
} from '../services/paymentTransactionService';
import { PaymentTransactionData, PaymentTransactionStatusResponse, CreatePaymentTransactionParams } from '../types';

export const PAYMENT_TRANSACTION_QUERY_KEYS = {
  all: ['paymentTransactions'] as const,
  byCode: (code: string) => [...PAYMENT_TRANSACTION_QUERY_KEYS.all, 'byCode', code] as const,
  status: (code: string) => [...PAYMENT_TRANSACTION_QUERY_KEYS.all, 'status', code] as const,
};

export interface UsePaymentTransactionStatusOptions {
  enabled?: boolean;
  refetchInterval?: number | false | ((query: any) => number | false);
}

/**
 * Hook lấy chi tiết đầy đủ đơn hàng giao dịch thanh toán theo Code (Cho lần nạp đầu)
 */
export function usePaymentTransactionByCode(code: string, enabled = true) {
  return useQuery<PaymentTransactionData>({
    queryKey: PAYMENT_TRANSACTION_QUERY_KEYS.byCode(code),
    queryFn: () => getPaymentTransactionByCodeApi(code),
    enabled: Boolean(code) && enabled,
    staleTime: 1000 * 60 * 5, // Cache detail data trong 5 phút
  });
}

/**
 * Hook lấy & theo dõi trạng thái đơn hàng giao dịch thanh toán (hỗ trợ Polling)
 */
export function usePaymentTransactionStatus(
  code: string,
  options?: UsePaymentTransactionStatusOptions
) {
  const { enabled = true, refetchInterval } = options || {};

  return useQuery<PaymentTransactionStatusResponse>({
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
      cancelCode,
      forceNew,
    }: CreatePaymentTransactionParams) =>
      createPaymentTransactionApi(planId, billingCycle, paymentMethod, expectedPrice, cancelCode, forceNew),
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
