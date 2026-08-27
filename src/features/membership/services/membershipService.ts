import api from '@/core/services/api';
import { BillingCycle, MembershipPlan, PlanFeature } from '../types';

/**
 * Lấy danh sách các gói hội viên đang hoạt động từ API backend
 */
export async function getMembershipPlansApi(): Promise<MembershipPlan[]> {
  try {
    const response = await api.get('/membership-plans', {
      params: { isActive: 'true' },
    });

    const plansData = response.data?.data || response.data || [];

    if (!Array.isArray(plansData)) {
      return [];
    }

    return plansData.map((plan: any) => {
      const isFree = Number(plan.monthlyPrice) === 0;

      const planFeatures = Array.isArray(plan.planFeatures) ? plan.planFeatures : [];

      // Chuẩn hóa mảng features được áp dụng (isIncluded: true)
      const includedFeatures: PlanFeature[] = planFeatures
        .filter((pf: any) => pf.isAvailable)
        .map((pf: any) => ({
          code: pf.feature?.code,
          text: pf.feature?.name || 'Tính năng',
          isIncluded: true,
        }));

      // Chuẩn hóa mảng unavailableFeatures (isIncluded: false)
      const unavailableFeatures: PlanFeature[] = planFeatures
        .filter((pf: any) => !pf.isAvailable)
        .map((pf: any) => ({
          code: pf.feature?.code,
          text: pf.feature?.name || 'Tính năng',
          isIncluded: false,
        }));

      // Tự động xác định kiểu nút bấm (buttonVariant)
      const buttonVariant: MembershipPlan['buttonVariant'] = isFree ? 'outline' : 'primary';

      return {
        id: String(plan.id),
        code: plan.code,
        name: plan.name,
        tagLine: plan.tagLine || '',
        monthlyPrice: Number(plan.monthlyPrice) || 0,
        yearlyPrice: Number(plan.yearlyPrice) || 0,
        yearlyDiscountPercent: Number(plan.yearlyDiscountPercent) || 0,
        popularBadge: plan.popularBadge || undefined,
        tierLevel: Number(plan.tierLevel) || 1,
        isCurrentPlan: false,
        features: [...includedFeatures, ...unavailableFeatures],
        buttonText: plan.buttonText || (isFree ? 'Gói hiện tại' : `Nâng cấp ${plan.name}`),
        buttonVariant,
      };
    });
  } catch (error) {
    console.error('Lỗi khi tải danh sách gói hội viên từ API:', error);
    throw error;
  }
}

/**
 * Đăng ký gói hội viên (Simulated API call hoặc gọi API thực tế)
 */
export async function subscribeMembershipPlanApi(
  planCode: string,
  cycle: BillingCycle
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: `Đã đăng ký thành công gói ${planCode} với chu kỳ ${cycle === 'yearly' ? 'Hàng năm' : 'Hàng tháng'}!`,
  };
}

export interface ActivePaymentAccount {
  id: number;
  bankName: string;
  bankCode: string;
  accountNo: string;
  accountHolder: string;
  qrCodeUrl?: string | null;
  note?: string | null;
}

/**
 * Lấy tài khoản thanh toán thụ hưởng mặc định từ Backend API
 */
export async function getDefaultPaymentAccountApi(): Promise<ActivePaymentAccount | null> {
  try {
    const response = await api.get('/payment-accounts/default');
    if (response?.data?.success && response.data.data?.paymentAccount) {
      return response.data.data.paymentAccount;
    }
    return null;
  } catch (error) {
    console.error('Lỗi khi lấy tài khoản thanh toán mặc định:', error);
    return null;
  }
}


