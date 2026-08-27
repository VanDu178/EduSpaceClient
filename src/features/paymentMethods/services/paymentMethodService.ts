import api from '@/core/services/api';
import { ActivePaymentMethod, PaymentTransactionData } from '../types';
import { BillingCycle } from '@/features/membership/types';

/**
 * Lấy danh sách các phương thức thanh toán đang hoạt động
 */
export async function fetchActivePaymentMethodsApi(): Promise<ActivePaymentMethod[]> {
  try {
    const response = await api.get('/payment-methods/active');
    if (response.data?.success && Array.isArray(response.data.data?.paymentMethods)) {
      return response.data.data.paymentMethods;
    }
  } catch (error) {
    console.error('Không thể tải danh sách phương thức thanh toán:', error);
  }
  return [];
}

/**
 * Khởi tạo đơn thanh toán VietQR mới từ Backend API
 */
export async function createPaymentTransactionApi(
  planId: number | string,
  billingCycle: BillingCycle
): Promise<PaymentTransactionData> {
  const response = await api.post('/payment-transactions', {
    planId: Number(planId),
    billingCycle,
  });

  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Khởi tạo đơn thanh toán thất bại');
}

/**
 * Lấy trạng thái đơn thanh toán (Phục vụ Polling 3s/lần trên Client)
 */
export async function getPaymentTransactionStatusApi(
  code: string
): Promise<{
  id?: number;
  code?: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  amount?: number;
  transferContent?: string;
  qrCodeUrl?: string;
  expiredAt?: string;
  paidAt?: string | null;
}> {
  const response = await api.get(`/payment-transactions/status/${code}`);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Không lấy được trạng thái đơn thanh toán');
}

/**
 * Hủy giao dịch thanh toán
 */
export async function cancelPaymentTransactionApi(code: string): Promise<boolean> {
  const response = await api.post(`/payment-transactions/cancel/${code}`);
  return Boolean(response.data?.success);
}
