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
  paymentMethod?: PaymentMethod,
  expectedPrice?: number,
  cancelCode?: string,
  forceNew?: boolean
): Promise<PaymentTransactionData> {
  const response = await api.post('/payment-transactions', {
    planId: Number(planId),
    billingCycle,
    paymentMethod,
    expectedPrice,
    cancelCode,
    forceNew,
  });

  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Khởi tạo đơn thanh toán thất bại');
}

/**
 * Lấy chi tiết đầy đủ đơn thanh toán theo Mã code (Cho lần load đầu tiên)
 */
export async function getPaymentTransactionByCodeApi(
  code: string
): Promise<PaymentTransactionData> {
  const response = await api.get(`/payment-transactions/by-code/${code}`);
  if (response.data?.success && response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data?.message || 'Không lấy được thông tin đơn thanh toán');
}

/**
 * Lấy trạng thái đơn thanh toán (Phục vụ Polling 3s/lần trên Client)
 */
export async function getPaymentTransactionStatusApi(
  code: string
): Promise<PaymentTransactionStatusResponse> {
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
