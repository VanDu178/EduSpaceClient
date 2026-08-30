import { BillingCycle, PaymentMethod } from '@/features/membership/types';

export type PaymentTransactionStatus = 'pending' | 'partially_paid' | 'completed' | 'overpaid' | 'expired' | 'cancelled';

export interface CreatePaymentTransactionParams {
  planId: number | string;
  billingCycle: BillingCycle;
  paymentMethod?: PaymentMethod;
  expectedPrice?: number;
}

export interface PaymentRefund {
  id: number;
  code: string;
  paymentTxId: number;
  amount: number;
  refundRef?: string | null;
  proofUrls?: string[] | null;
  notes?: string | null;
  refundedBy?: number | null;
  createdAt: string;
  refundedByUser?: {
    id: number;
    name?: string;
    email?: string;
  };
}

export interface PaymentTransactionData {
  id: number;
  code: string;
  userId: number;
  planId: number;
  billingCycle: BillingCycle;
  amount: number;
  paidAmount?: number;
  overpaidAmount?: number;
  remainingAmount?: number;
  totalRefundedAmount?: number;
  notes?: string | null;
  paymentMethod: string;
  transferContent: string;
  status: PaymentTransactionStatus;
  bankCode?: string;
  accountNo?: string;
  accountHolder?: string;
  qrCodeUrl?: string;
  expiredAt: string;
  paidAt?: string | null;
  refunds?: PaymentRefund[];
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
  paidAmount?: number;
  overpaidAmount?: number;
  remainingAmount?: number;
  totalRefundedAmount?: number;
  notes?: string | null;
  transferContent?: string;
  qrCodeUrl?: string;
  expiredAt?: string;
  paidAt?: string | null;
  refunds?: PaymentRefund[];
}
