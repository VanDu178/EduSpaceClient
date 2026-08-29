import api from '@/core/services/api';
import { BillingCycle, PaymentMethod } from '@/features/membership/types';
import { PAYMENT_METHOD_CODES } from '@/features/paymentMethods/constants';
import { PaymentTransactionData, PaymentTransactionStatusResponse } from '../types';

/**
 * Khởi tạo đơn thanh toán mới từ Backend API
 */
export async function createPaymentTransactionApi(
  planId: number | string,
  billingCycle: BillingCycle,
  paymentMethod: PaymentMethod = PAYMENT_METHOD_CODES.VIETQR
): Promise<PaymentTransactionData> {
  const response = await api.post('/payment-transactions', {
    planId: Number(planId),
    billingCycle,
    paymentMethod,
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
): Promise<PaymentTransactionData> {
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
