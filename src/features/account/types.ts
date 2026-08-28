import { MembershipPlan } from '@/features/membership/types';

export interface UserSubscription {
  id: number;
  code: string;
  userId: number;
  planId: number;
  billingCycle: 'monthly' | 'annually' | 'yearly' | string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending' | string;
  pricePaid: number;
  paymentMethod?: string;
  paymentRef?: string;
  plan?: MembershipPlan;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileUpdateDTO {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface AccountSubscriptionData {
  subscriptions: UserSubscription[];
  activeSubscription: UserSubscription | null;
}

export interface UserTransactionItem {
  id: number;
  code: string;
  amount: number;
  billingCycle: 'monthly' | 'annually' | 'yearly' | string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled' | string;
  transferContent: string;
  qrCodeUrl?: string;
  createdAt: string;
  paidAt?: string | null;
  expiredAt?: string;
  plan?: MembershipPlan;
  paymentMethod?: string;
  paymentMethodCode?: string;
  bankCode?: string;
  accountNo?: string;
  accountHolder?: string;
  paymentAccount?: {
    bankCode?: string;
    accountNo?: string;
    accountHolder?: string;
    bank?: {
      name?: string;
      shortName?: string;
      logo?: string;
    };
  };
}

