export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeature {
  code?: string;
  text: string;
  isIncluded: boolean;
  isHighlighted?: boolean;
}

export interface MembershipPlan {
  id: string;
  code: string;
  name: string;
  tagLine: string;
  monthlyPrice: number; // in VND, 0 for free
  yearlyPrice: number; // in VND per year
  yearlyDiscountPercent?: number; // % discount when billed yearly
  popularBadge?: string; // e.g. "Phổ biến nhất", "Khuyên dùng"
  tierLevel?: number;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'outline' | 'gradient' | 'ghost' | 'danger';
}

export interface FeatureHighlightSlide {
  id: number;
  title: string;
  description: string;
  badgeText: string;
  illustrationType: 'tuduy' | 'phuongphap' | 'quant';
}

export interface PremiumAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle?: string;
  recommendedPlanCode?: string;
  requiredFeatureCode?: string;
  isUpgradeTier?: boolean;
  currentPlanName?: string;
}

import { PAYMENT_METHOD_CODES } from '@/features/paymentMethods/constants';

export type PaymentMethod = (typeof PAYMENT_METHOD_CODES)[keyof typeof PAYMENT_METHOD_CODES] | (string & {});





