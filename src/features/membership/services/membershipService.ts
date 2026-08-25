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
          text: pf.feature?.name || 'Tính năng',
          isIncluded: true,
        }));

      // Chuẩn hóa mảng unavailableFeatures (isIncluded: false)
      const unavailableFeatures: PlanFeature[] = planFeatures
        .filter((pf: any) => !pf.isAvailable)
        .map((pf: any) => ({
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
        isCurrentPlan: plan.code === 'STANDARD',
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

