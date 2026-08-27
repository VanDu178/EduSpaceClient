import { BillingCycle } from '@/features/membership/types';

export interface ActivePaymentMethod {
  id: number;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface PaymentTransactionData {
  id: number;
  code: string;
  userId: number;
  planId: number;
  billingCycle: BillingCycle;
  amount: number;
  paymentMethod: string;
  transferContent: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  bankCode?: string;
  accountNo?: string;
  accountHolder?: string;
  qrCodeUrl?: string;
  expiredAt: string;
  paidAt?: string | null;
  paymentAccount?: {
    id: number;
    bankCode: string;
    accountNo: string;
    accountHolder: string;
    bank?: {
      name: string;
      shortName: string;
      logo?: string;
    };
  };
  plan?: {
    id: number;
    code: string;
    name: string;
  };
}
