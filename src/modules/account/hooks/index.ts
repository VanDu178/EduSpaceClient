import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMySubscriptionsApi,
  fetchMyTransactionsApi,
  fetchCurrentUserProfileApi,
  cancelTransactionApi,
  downloadInvoicePdfApi,
} from '../services';
import toast from 'react-hot-toast';

export const ACCOUNT_QUERY_KEYS = {
  all: ['account'] as const,
  mySubscriptions: () => [...ACCOUNT_QUERY_KEYS.all, 'mySubscriptions'] as const,
  myTransactions: () => [...ACCOUNT_QUERY_KEYS.all, 'myTransactions'] as const,
  profile: () => [...ACCOUNT_QUERY_KEYS.all, 'profile'] as const,
};

/**
 * Hook lấy thông tin gói dịch vụ & lịch sử đăng ký cá nhân
 */
export function useMySubscriptions(enabled = true) {
  return useQuery({
    queryKey: ACCOUNT_QUERY_KEYS.mySubscriptions(),
    queryFn: fetchMySubscriptionsApi,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

/**
 * Hook lấy lịch sử giao dịch thanh toán cá nhân
 */
export function useMyTransactions(enabled = true) {
  return useQuery({
    queryKey: ACCOUNT_QUERY_KEYS.myTransactions(),
    queryFn: fetchMyTransactionsApi,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook lấy thông tin chi tiết cá nhân mới nhất của người dùng từ Backend
 */
export function useCurrentUserProfile(enabled = true) {
  return useQuery({
    queryKey: ACCOUNT_QUERY_KEYS.profile(),
    queryFn: fetchCurrentUserProfileApi,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook hủy giao dịch thanh toán đang chờ xử lý
 */
export function useCancelTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => cancelTransactionApi(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEYS.myTransactions() });
    },
  });
}

/**
 * Hook tải file PDF Hóa đơn điện tử
 */
export function useDownloadInvoicePdf() {
  return useMutation({
    mutationFn: (code: string) => downloadInvoicePdfApi(code),
    onSuccess: () => {
      toast.success('Tải hóa đơn thành công!');
    },
    onError: (error: any) => {
      console.error('Lỗi khi tải hóa đơn:', error);
      toast.error(error?.message || 'Không thể tải hóa đơn.');
    },
  });
}
