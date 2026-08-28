import { useQuery } from '@tanstack/react-query';
import { getMembershipPlansApi } from '../services/membershipService';

export const MEMBERSHIP_QUERY_KEYS = {
  all: ['membership'] as const,
  plans: () => [...MEMBERSHIP_QUERY_KEYS.all, 'plans'] as const,
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
