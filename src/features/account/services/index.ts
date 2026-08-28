import api from '@/core/services/api';
import { AccountSubscriptionData, UserTransactionItem } from '../types';
import { User } from '@/features/auth/types';


/**
 * Lấy lịch sử đăng ký gói & gói hiện tại của người dùng đang đăng nhập
 */
export async function fetchMySubscriptionsApi(): Promise<AccountSubscriptionData> {
  const response = await api.get('/subscriptions/my-subscriptions');
  if (response.data?.success && response.data.data) {
    return {
      subscriptions: response.data.data.subscriptions || [],
      activeSubscription: response.data.data.activeSubscription || null,
    };
  }
  return { subscriptions: [], activeSubscription: null };
}

/**
 * Lấy danh sách giao dịch thanh toán cá nhân của người dùng
 */
export async function fetchMyTransactionsApi(): Promise<UserTransactionItem[]> {
  try {
    const response = await api.get('/payment-transactions/my-transactions');
    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
  } catch (error) {
    console.error('Không thể lấy lịch sử giao dịch:', error);
  }
  return [];
}


/**
 * Lấy thông tin chi tiết user mới nhất
 */
export async function fetchCurrentUserProfileApi(): Promise<User> {
  const response = await api.get('/auth/me');
  return response.data.data.user;
}

/**
 * Hủy giao dịch thanh toán đang chờ xử lý
 */
export async function cancelTransactionApi(code: string): Promise<boolean> {
  const response = await api.post(`/payment-transactions/cancel/${code}`);
  return Boolean(response.data?.success);
}

/**
 * Tải file Hóa đơn PDF từ backend
 */
export async function downloadInvoicePdfApi(code: string): Promise<void> {
  const response = await api.get(`/payment-transactions/${code}/pdf`, {
    responseType: 'blob',
  });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Invoice-TradeVerse-${code}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
}

