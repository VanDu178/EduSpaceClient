import { useQuery } from '@tanstack/react-query';
import { fetchActivePaymentMethodsApi } from '../services/paymentMethodService';

export const PAYMENT_METHODS_QUERY_KEYS = {
  all: ['paymentMethods'] as const,
  active: () => [...PAYMENT_METHODS_QUERY_KEYS.all, 'active'] as const,
};

/**
 * Hook lấy danh sách các phương thức thanh toán đang hoạt động trên hệ thống
 */
export function useActivePaymentMethods(enabled = true) {
  return useQuery({
    queryKey: PAYMENT_METHODS_QUERY_KEYS.active(),
    queryFn: fetchActivePaymentMethodsApi,
    enabled,
    staleTime: 1000 * 60 * 10, // Cache 10 phút
  });
}
