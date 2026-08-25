'use client';

import { CheckIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { BillingCycle, MembershipPlan } from '../types';
import { Button } from '@/components/common';

interface MembershipPlanCardProps {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
  isLoading?: boolean;
  onSubscribe: (planCode: string) => void;
}

export function MembershipPlanCard({
  plan,
  billingCycle,
  isLoading = false,
  onSubscribe,
}: MembershipPlanCardProps) {
  const isPopular = Boolean(plan.popularBadge);
  const isFree = plan.monthlyPrice === 0;

  // Calculate pricing based on billing cycle
  const displayPrice =
    billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

  // Monthly equivalent when paying yearly
  const monthlyEquivalent =
    billingCycle === 'yearly' && plan.yearlyPrice > 0
      ? Math.round(plan.yearlyPrice / 12)
      : null;

  // Calculate discount percentage
  const discountPercent =
    plan.yearlyDiscountPercent !== undefined && plan.yearlyDiscountPercent !== null
      ? Number(plan.yearlyDiscountPercent)
      : 0;

  const formattedPrice = isFree
    ? 'Miễn phí'
    : `${displayPrice.toLocaleString('vi-VN')}đ`;

  const formattedMonthlyEq = monthlyEquivalent
    ? `${monthlyEquivalent.toLocaleString('vi-VN')}đ/tháng`
    : null;

  return (
    <div
      className={`relative rounded-2xl flex flex-col justify-between p-6 transition-all duration-200 ${isPopular
        ? 'bg-white border-2 border-primary'
        : 'bg-white border border-gray-200'
        }`}
    >
      {/* Popular Badge */}
      {plan.popularBadge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-btn-primary rounded-full uppercase tracking-wider">
            <SparklesIcon className="w-3.5 h-3.5" />
            {plan.popularBadge}
          </span>
        </div>
      )}

      {/* Top Header & Pricing Section */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {plan.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal min-h-[40px]">
            {plan.tagLine}
          </p>
        </div>

        {/* Pricing */}
        <div className="py-3 border-y border-gray-100 space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {formattedPrice}
            </span>
            {!isFree && (
              <span className="text-xs sm:text-sm text-gray-500 font-normal">
                / {billingCycle === 'yearly' ? 'năm' : 'tháng'}
              </span>
            )}
          </div>

          {formattedMonthlyEq && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-primary">
                Tương đương {formattedMonthlyEq}
              </span>
              {discountPercent > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-full">
                  Tiết kiệm {discountPercent}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">
            Quyền lợi nổi bật:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                {feature.isIncluded ? (
                  <div className="w-4 h-4 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="w-3 h-3 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                    <XMarkIcon className="w-3 h-3 stroke-[2]" />
                  </div>
                )}
                <span
                  className={`${feature.isIncluded
                    ? feature.isHighlighted
                      ? 'font-bold text-gray-900'
                      : 'text-gray-700'
                    : 'text-gray-400 line-through'
                    }`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="pt-6">
        <Button
          type="button"
          variant={plan.buttonVariant}
          size="lg"
          fullWidth
          disabled={isFree || plan.isCurrentPlan || isLoading}
          isLoading={isLoading}
          onClick={() => onSubscribe(plan.code)}
        >
          {plan.isCurrentPlan ? 'Gói hiện tại' : plan.buttonText}
        </Button>
      </div>
    </div>
  );
}
