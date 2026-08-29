import api from '@/core/services/api';
import { ActivePaymentMethod } from '../types';

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
