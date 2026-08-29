/**
 * HẰNG SỐ CHUẨN DUY NHẤT DÙNG CHO CÁC MÃ PHƯƠNG THỨC THANH TOÁN (PAYMENT METHOD CODES)
 * Tất cả các mã đều viết dưới dạng IN HOA (UPPERCASE)
 */
export const PAYMENT_METHOD_CODES = {
  VIETQR: 'VIETQR',
  CREDIT_CARD: 'CREDIT_CARD',
  E_WALLET: 'E_WALLET',
} as const;

export type PaymentMethodCode = keyof typeof PAYMENT_METHOD_CODES;
