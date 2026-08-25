'use client';

import { useState, useEffect } from 'react';
import { BillingCycle, MembershipPlan } from '../types';
import { getMembershipPlansApi, subscribeMembershipPlanApi } from '../services/membershipService';
import { MembershipPlanCard } from './MembershipPlanCard';
import { CheckIcon, XMarkIcon, ShieldCheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export function MembershipPlanList() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processingPlanCode, setProcessingPlanCode] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const data = await getMembershipPlansApi();
        if (isMounted) {
          setPlans(data);
        }
      } catch (error) {
        console.error('Failed to fetch membership plans:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPlans();
    return () => {
      isMounted = false;
    };
  }, []);


  const handleSubscribe = async (planCode: string) => {
    setProcessingPlanCode(planCode);
    setNotification(null);
    try {
      const res = await subscribeMembershipPlanApi(planCode, billingCycle);
      setNotification(res.message);
    } catch (error) {
      console.error('Subscription error:', error);
      setNotification('Đã có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setProcessingPlanCode(null);
    }
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

        {/* Notification Alert */}
        {notification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs sm:text-sm font-medium animate-slide-up-fade">
            {notification}
          </div>
        )}
      </div>

      {/* 2. Billing Cycle Toggle Switch */}
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

      {/* 3. Membership Plan Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 animate-pulse h-96"
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan) => (
            <MembershipPlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              isLoading={processingPlanCode === plan.code}
              onSubscribe={handleSubscribe}
            />
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
