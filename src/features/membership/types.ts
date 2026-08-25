export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeature {
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
  isCurrentPlan?: boolean;
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
}
