import Link from 'next/link';
import { UserSubscription } from '../types';
import {
  SparklesIcon,
  CheckIcon,
  ClockIcon,
  CalendarIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, Progress } from 'antd';
import { formatDate } from '@/core/utils';

import { useMembershipPlans } from '@/features/membership';

interface SubscriptionViewProps {
  activeSubscription: UserSubscription | null;
  isLoading?: boolean;
}

export function SubscriptionView({ activeSubscription, isLoading = false }: SubscriptionViewProps) {
  const { data: plans = [], isLoading: isLoadingPlans } = useMembershipPlans();

  const isPaidUser = Boolean(activeSubscription && activeSubscription.status === 'active');
  const planName = activeSubscription?.plan?.name || 'Miễn Phí';

  // Calculate days remaining
  let daysRemaining = 0;
  let percentUsed = 0;
  let startDateStr = '--';
  let endDateStr = '--';

  if (activeSubscription?.startDate && activeSubscription?.endDate) {
    startDateStr = formatDate(activeSubscription.startDate);
    endDateStr = formatDate(activeSubscription.endDate);

    const start = new Date(activeSubscription.startDate).getTime();
    const end = new Date(activeSubscription.endDate).getTime();
    const now = new Date().getTime();

    const totalDuration = Math.max(end - start, 1);
    const elapsed = Math.max(now - start, 0);

    daysRemaining = Math.max(Math.ceil((end - now) / (1000 * 60 * 60 * 24)), 0);
    percentUsed = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
  }

  // Extract features dynamically from API
  let currentFeatures: string[] = [];

  if (isPaidUser && activeSubscription?.plan) {
    const rawPlanFeatures = (activeSubscription.plan as any).planFeatures;
    if (Array.isArray(rawPlanFeatures) && rawPlanFeatures.length > 0) {
      currentFeatures = rawPlanFeatures
        .filter((pf: any) => pf.isAvailable)
        .map((pf: any) => pf.feature?.name || 'Tính năng');
    } else {
      const matchedPlan = plans.find(
        (p) => p.code === activeSubscription.plan?.code || String(p.id) === String(activeSubscription.planId)
      );
      if (matchedPlan) {
        currentFeatures = matchedPlan.features
          .filter((f) => f.isIncluded)
          .map((f) => f.text);
      }
    }
  }

  if (currentFeatures.length === 0 && plans.length > 0) {
    const freePlan = plans.find(
      (p) => p.monthlyPrice === 0 || p.tierLevel === 1 || p.code?.toUpperCase().includes('FREE')
    );
    if (freePlan) {
      currentFeatures = freePlan.features
        .filter((f) => f.isIncluded)
        .map((f) => f.text);
    }
  }

  const isDataLoading = isLoading || isLoadingPlans;

  if (isDataLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 animate-pulse">
        {/* SECTION 1: Active Subscription Overview Header Skeleton */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="h-8 bg-slate-200 rounded-lg w-48" />
            <div className="h-10 bg-slate-200 rounded-xl w-36 shrink-0" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
            <div className="h-16 bg-slate-100 rounded-xl" />
            <div className="h-16 bg-slate-100 rounded-xl" />
            <div className="h-16 bg-slate-100 rounded-xl" />
          </div>
        </div>

        {/* SECTION 2: Features Checklist Skeleton */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <div className="h-6 bg-slate-200 rounded w-64" />
            <div className="h-4 bg-slate-100 rounded w-80" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 py-1">
            <div className="h-5 bg-slate-100 rounded w-full" />
            <div className="h-5 bg-slate-100 rounded w-5/6" />
            <div className="h-5 bg-slate-100 rounded w-4/6" />
            <div className="h-5 bg-slate-100 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
      {/* SECTION 1: Active Subscription Overview Header */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {planName}
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link href="/pricing">
              <Button
                type="primary"
                className="!rounded-xl font-medium h-10 px-5 flex items-center gap-2 border-none bg-sky-600 hover:!bg-sky-500 text-sm"
                icon={isPaidUser ? <RocketLaunchIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4 text-amber-300" />}
              >
                {isPaidUser ? 'Khám phá gói mới' : 'Nâng cấp ngay'}
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Inline Key Metrics & Timeline */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70 pt-1 sm:pt-0">
            {/* Metric 1 */}
            <div className="flex items-center gap-3.5 sm:pr-4">
              <div className="w-10 h-10 rounded-lg bg-sky-100/80 border border-sky-200/60 flex items-center justify-center shrink-0">
                <CheckCircleIcon className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Trạng thái gói</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  Đang hoạt động
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-3.5 sm:px-4 pt-3 sm:pt-0">
              <div className="w-10 h-10 rounded-lg bg-amber-100/80 border border-amber-200/60 flex items-center justify-center shrink-0">
                <ClockIcon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Thời gian sử dụng</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {isPaidUser ? `${daysRemaining} ngày còn lại` : 'Không giới hạn'}
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-3.5 sm:pl-4 pt-3 sm:pt-0">
              <div className="w-10 h-10 rounded-lg bg-slate-200/70 border border-slate-300/60 flex items-center justify-center shrink-0">
                <CalendarIcon className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">Hạn hiệu lực</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {isPaidUser ? endDateStr : 'Vô thời hạn'}
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Cycle Progress Bar for Paid Users */}
          {isPaidUser && (
            <div className="pt-3 border-t border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Kích hoạt: <strong className="text-slate-800">{startDateStr}</strong></span>
                <span className="text-sky-700 font-semibold">Đã dùng {percentUsed}% chu kỳ</span>
                <span>Hết hạn: <strong className="text-slate-800">{endDateStr}</strong></span>
              </div>
              <Progress
                percent={percentUsed}
                strokeColor="#0284c7"
                railColor="#e2e8f0"
                showInfo={false}
                className="m-0"
              />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Clean Integrated Features Checklist */}
      <div className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-sky-600" />
              Đặc quyền & Tính năng khả dụng
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Danh sách các tính năng được mở khóa trong tài khoản TradeVerse của bạn.
            </p>
          </div>
        </div>

        {/* Clean, Non-Boxy Feature Checklist */}
        {isDataLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-slate-100 rounded animate-pulse w-3/4" />
            ))}
          </div>
        ) : currentFeatures.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 py-1">
            {currentFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                </div>
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500 py-2">Chưa có danh sách tính năng khả dụng.</p>
        )}

        {/* Subtle CTA Banner for Free Users */}
        {!isPaidUser && (
          <div className="mt-4 p-4 rounded-xl bg-sky-50/70 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center shrink-0">
                <SparklesIcon className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-sky-900">
                  Nâng cấp gói TradeVerse VIP
                </h4>
                <p className="text-xs text-sky-700 mt-0.5">
                  Mở khóa toàn bộ tín hiệu tự động, tính năng phân tích và hỗ trợ ưu tiên.
                </p>
              </div>
            </div>
            <Link href="/pricing" className="shrink-0">
              <Button
                type="primary"
                size="small"
                className="!rounded-lg font-medium h-8 px-3.5 text-xs border-none bg-sky-600 hover:!bg-sky-500"
              >
                Khám phá các gói
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
