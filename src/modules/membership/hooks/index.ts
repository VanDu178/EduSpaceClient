import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getMembershipPlansApi,
  getDefaultPaymentAccountApi,
  subscribeMembershipPlanApi,
} from '../services/membershipService';
import { BillingCycle } from '../types';

export const MEMBERSHIP_QUERY_KEYS = {
  all: ['membership'] as const,
  plans: () => [...MEMBERSHIP_QUERY_KEYS.all, 'plans'] as const,
  defaultPaymentAccount: () => [...MEMBERSHIP_QUERY_KEYS.all, 'defaultPaymentAccount'] as const,
};

/**
 * Hook lấy danh sách các gói hội viên đang hoạt động trên hệ thống
 */
export function useMembershipPlans(enabled = true) {
  return useQuery({
    queryKey: MEMBERSHIP_QUERY_KEYS.plans(),
    queryFn: getMembershipPlansApi,
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook lấy thông tin tài khoản thanh toán thụ hưởng mặc định của hệ thống
 */
export function useDefaultPaymentAccount(enabled = true) {
  return useQuery({
    queryKey: MEMBERSHIP_QUERY_KEYS.defaultPaymentAccount(),
    queryFn: getDefaultPaymentAccountApi,
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook mutation đăng ký gói hội viên
 */
export function useSubscribeMembershipPlan() {
  return useMutation({
    mutationFn: ({ planCode, cycle }: { planCode: string; cycle: BillingCycle }) =>
      subscribeMembershipPlanApi(planCode, cycle),
  });
}
