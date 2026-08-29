'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BillingCycle } from '../types';
import { useMembershipPlans } from '../hooks';
import { MembershipPlanCard } from './MembershipPlanCard';
import { MembershipPlanEmpty } from './MembershipPlanEmpty';
import { CheckIcon, ShieldCheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export function MembershipPlanList() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const { data: plans = [], isLoading } = useMembershipPlans();

  // Determine current user plan (tierLevel === 1 || monthlyPrice === 0 as default free plan)
  const userCurrentPlan = plans.length > 0
    ? (user?.plan ? plans.find((p) => p.code === user.plan) : null)
    : null;

  const currentTierLevel = userCurrentPlan?.tierLevel ?? 1;
  const userCurrentPlanCode = userCurrentPlan?.code;

  const handleSubscribe = (planCode: string) => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/pricing';
    router.push(
      `/checkout?plan=${encodeURIComponent(planCode)}&billing=${billingCycle}&redirect=${encodeURIComponent(currentPath)}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14">
      {/* 1. Header Section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary-light/60 rounded-full">
          Gói Hội Viên TradeVerse
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          Chọn gói phù hợp với mục tiêu giao dịch của bạn
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
          Mở khóa toàn bộ bài viết trả phí, phân tích chuyên sâu, tín hiệu thị trường và bộ công cụ Quant hàng đầu.
        </p>
      </div>

      {/* 2. Billing Cycle Toggle Switch */}
      {(!isLoading && plans.length > 0) && (
        <div className="flex justify-center items-center">
          <div className="bg-gray-100 p-1.5 rounded-full flex items-center border border-gray-200">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-none border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Thanh toán theo tháng
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${billingCycle === 'yearly'
                ? 'bg-primary text-white shadow-none'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <span>Thanh toán theo năm</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Membership Plan Cards Container */}
      {isLoading ? (
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 animate-pulse h-96 w-full md:w-[calc(33.333%-1.5rem)] md:max-w-sm"
            >
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-10 bg-gray-100 rounded w-full my-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <MembershipPlanEmpty />
      ) : (
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-6 sm:gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="w-full md:w-[calc(33.333%-1.5rem)] md:max-w-sm flex">
              <MembershipPlanCard
                plan={plan}
                billingCycle={billingCycle}
                userCurrentTierLevel={currentTierLevel}
                userCurrentPlanCode={userCurrentPlanCode}
                onSubscribe={handleSubscribe}
              />
            </div>
          ))}
        </div>
      )}

      {/* 4. Trust & Security Badges */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <ShieldCheckIcon className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Bảo mật tuyệt đối</h4>
            <p className="text-xs text-gray-600">Thanh toán mã hóa an toàn qua cổng ngân hàng & QR</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <QuestionMarkCircleIcon className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Hỗ trợ nhanh chóng</h4>
            <p className="text-xs text-gray-600">Đội ngũ chuyên viên TradeVerse hỗ trợ 24/7</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <CheckIcon className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900">Linh hoạt kích hoạt</h4>
            <p className="text-xs text-gray-600">Quyền truy cập tự động nâng cấp ngay sau thanh toán</p>
          </div>
        </div>
      </div>
    </div>
  );
}
