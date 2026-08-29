import { MEMBERSHIP_QUERY_KEYS } from '@/features/membership/hooks';
import { APP_ROUTES } from './routes';
import { PAYMENT_METHODS_QUERY_KEYS } from '@/features/paymentMethods';

export interface ErrorCacheRule {
  queryKeys: readonly (readonly unknown[])[];
  redirectUrl?: string;
}

export const ERROR_CACHE_INVALIDATE_MAP: Record<string, ErrorCacheRule> = {
  //RELOAD KHI PLAN NGỪNG MỞ BÁN (BỐI CẢNH: NGƯỜI DÙNG ĐANG Ở TRANG CHECKOUT)
  PLAN_INACTIVE: {
    queryKeys: [MEMBERSHIP_QUERY_KEYS.plans()],
    redirectUrl: APP_ROUTES.PRICING,
  },
  //RELOAD KHI PMT UNAVAILABLE (BỐI CẢNH: NGƯỜI DÙNG ĐANG Ở TRANG CHECKOUT)
  PAYMENT_METHOD_UNAVAILABLE: {
    queryKeys: [PAYMENT_METHODS_QUERY_KEYS.active()],
  },
  //RELOAD KHI GIÁ PLAN THAY ĐỔI (BỐI CẢNH: NGƯỜI DÙNG ĐANG Ở TRANG CHECKOUT)
  PLAN_PRICE_CHANGED: {
    queryKeys: [MEMBERSHIP_QUERY_KEYS.plans()],
  }
};
