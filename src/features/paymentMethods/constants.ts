import { ActivePaymentMethod } from './types';

export const DEFAULT_FALLBACK_PAYMENT_METHODS: ActivePaymentMethod[] = [
  { id: 1, code: 'vietqr', name: 'VietQR', description: null, icon: 'QrCodeIcon', sortOrder: 1, isActive: true },
  { id: 2, code: 'credit_card', name: 'Thẻ NH', description: null, icon: 'CreditCardIcon', sortOrder: 2, isActive: true },
  { id: 3, code: 'e_wallet', name: 'Ví điện tử', description: null, icon: 'DevicePhoneMobileIcon', sortOrder: 3, isActive: true },
];
