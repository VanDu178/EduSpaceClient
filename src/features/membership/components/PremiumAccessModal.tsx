'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { MembershipPlan, PremiumAccessModalProps } from '../types';
import { MascotBannerGraphic } from './MascotBannerGraphic';
import { Button } from '@/components/common';
import { useMembershipPlans } from '../hooks';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { formatCurrency } from '@/core/utils';

export function PremiumAccessModal({
  isOpen,
  onClose,
  postTitle,
  recommendedPlanCode,
  requiredFeatureCode,
  isUpgradeTier = false,
  currentPlanName,
}: PremiumAccessModalProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const { data: plans = [], isLoading: isFetchingPlans } = useMembershipPlans(isOpen);
  const [selectedPlanCode, setSelectedPlanCode] = useState<string>('');

  // Determine current user plan (tierLevel === 1 || monthlyPrice === 0 as default free plan)
  const userCurrentPlan = plans.length > 0
    ? (user?.plan ? plans.find((p) => p.code === user.plan) : null)
    : null;

  const displayCurrentPlanName = userCurrentPlan?.name || user?.planName || currentPlanName || 'Cơ bản (Miễn phí)';

  // Determine recommended plan (Cheapest eligible plan containing required feature code)
  let recommendedPlan: MembershipPlan | null = null;

  if (plans.length > 0) {
    if (requiredFeatureCode) {
      const eligible = plans.filter((p) =>
        p.features.some((f) => f.code === requiredFeatureCode && f.isIncluded)
      );
      if (eligible.length > 0) {
        recommendedPlan = eligible.reduce((cheapest, p) =>
          !cheapest || p.monthlyPrice < cheapest.monthlyPrice ? p : cheapest
          , eligible[0]);
      }
    }

    if (!recommendedPlan && recommendedPlanCode) {
      recommendedPlan = plans.find((p) => p.code === recommendedPlanCode) || null;
    }

    if (!recommendedPlan) {
      const paidPlans = plans.filter((p) => p.monthlyPrice > 0 || (p.tierLevel ?? 1) > 1);
      if (paidPlans.length > 0) {
        recommendedPlan = paidPlans.reduce((cheapest, p) =>
          !cheapest || p.monthlyPrice < cheapest.monthlyPrice ? p : cheapest
          , paidPlans[0]);
      } else {
        recommendedPlan = plans[0];
      }
    }
  }

  // Set selected plan code when recommended plan is resolved
  useEffect(() => {
    if (recommendedPlan && (!selectedPlanCode || selectedPlanCode !== recommendedPlan.code)) {
      setSelectedPlanCode(recommendedPlan.code);
    }
  }, [recommendedPlan, selectedPlanCode]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const targetPlanCode = selectedPlanCode || recommendedPlan?.code || 'PRO_TRADER';

  // Navigate directly to dedicated /checkout page
  const handleUpgradeNow = () => {
    const currentRedirect = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/blogs';
    onClose();
    router.push(`/checkout?plan=${encodeURIComponent(targetPlanCode)}&billing=yearly&redirect=${encodeURIComponent(currentRedirect)}`);
  };

  const handleViewPricingPage = () => {
    onClose();
    router.push('/pricing');
  };

  // Price formatting helper calculations for recommended plan
  const recMonthlyPrice = recommendedPlan?.monthlyPrice || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 2. Modal Content Container */}
      <div className="relative w-full max-w-lg md:max-w-3xl bg-white rounded-3xl overflow-hidden border border-gray-200 z-10 animate-slide-up-fade flex flex-col md:grid md:grid-cols-12 max-h-[92vh] md:max-h-[520px]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng modal"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors flex items-center justify-center cursor-pointer"
        >
          <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Left Column: Mascot Feature Showcase Sidebar (Desktop 5 cols) */}
        <div className="md:col-span-5 p-3 md:p-4 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 shrink-0">
          <MascotBannerGraphic layout="sidebar" className="h-full" />
        </div>

        {/* Right Column: Main Content & Action Panel (Desktop 7 cols) */}
        <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-4 overflow-y-auto md:overflow-visible">
          {/* Header & Title */}
          <div className="space-y-1.5 pr-6 text-left">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold">
              <SparklesIcon className="w-3 h-3 text-amber-600 animate-pulse" />
              Nội dung trả phí TradeVerse
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug line-clamp-2">
              {postTitle
                ? `${isUpgradeTier ? 'Nâng cấp mở khóa' : 'Mở khóa bài viết'}: "${postTitle}"`
                : isUpgradeTier
                  ? 'Nâng cấp hạng gói để truy cập bài viết chuyên sâu'
                  : 'Mở khóa toàn bộ bài viết & phân tích chuyên sâu'}
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-2">
              {isUpgradeTier
                ? `Gói ${displayCurrentPlanName} chưa bao gồm đặc quyền xem nội dung này. Nâng cấp ngay để mở khóa toàn bộ đặc quyền.`
                : 'Luyện tập và nâng cao kỹ năng giao dịch mỗi ngày cùng các chuyên gia hàng đầu TradeVerse.'}
            </p>
          </div>

          {/* Current Plan vs Recommended Plan Selector Cards Box */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Left Card: Current Plan */}
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-medium text-gray-500">
                  Gói hiện tại
                </span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  {displayCurrentPlanName}
                </h3>
                <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                  {userCurrentPlan?.monthlyPrice === 0 || !userCurrentPlan
                    ? 'Miễn phí'
                    : `${formatCurrency(userCurrentPlan.monthlyPrice)}/tháng`}
                </p>
              </div>
            </div>

            {/* Right Card: Recommended Plan */}
            <div
              onClick={() => {
                if (recommendedPlan) {
                  setSelectedPlanCode(recommendedPlan.code);
                }
              }}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${selectedPlanCode === (recommendedPlan?.code || targetPlanCode)
                ? 'border-primary bg-primary-light/30'
                : 'border-primary/40 bg-white hover:border-primary'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold text-primary flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  Gói đề xuất
                </span>
                <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {isFetchingPlans ? (
                <div className="animate-pulse space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ) : (
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {recommendedPlan?.name || 'Pro Trader'}
                  </h3>
                  <div className="mt-0.5 space-y-0.5">
                    <p className="text-[11px] font-bold text-primary">
                      {recMonthlyPrice > 0
                        ? `${formatCurrency(recMonthlyPrice)}/tháng`
                        : 'Miễn phí'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="pt-2 space-y-2 text-center">
            <Button
              type="button"
              variant="primary"
              size="md"
              rounded="xl"
              fullWidth
              disabled={isFetchingPlans}
              onClick={handleUpgradeNow}
              className="cursor-pointer font-semibold"
            >
              Nâng cấp gói ngay
            </Button>

            <button
              type="button"
              onClick={handleViewPricingPage}
              className="text-xs font-medium text-gray-500 hover:text-primary transition-colors underline cursor-pointer"
            >
              Xem so sánh chi tiết các gói hội viên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


