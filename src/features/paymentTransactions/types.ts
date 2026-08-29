import { BillingCycle, PaymentMethod } from '@/features/membership/types';

export type PaymentTransactionStatus = 'pending' | 'completed' | 'expired' | 'cancelled';

export interface CreatePaymentTransactionParams {
  planId: number | string;
  billingCycle: BillingCycle;
  paymentMethod?: PaymentMethod;
  expectedPrice?: number;
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
  status: PaymentTransactionStatus;
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

export interface PaymentTransactionStatusResponse {
  id?: number;
  code?: string;
  status: PaymentTransactionStatus;
  amount?: number;
  transferContent?: string;
  qrCodeUrl?: string;
  expiredAt?: string;
  paidAt?: string | null;
}
