import { useQuery } from '@tanstack/react-query';
import { getVideosApi, getVideoTypesApi, getVideoByIdApi } from '../services';
import { GetVideosParams, Video, VideoAccessResult } from '../types';
import { VIDEO_FEATURE_CODES } from '../constants';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useMySubscriptions } from '@/features/account/hooks';

export const VIDEOS_QUERY_KEYS = {
  all: ['videos'] as const,
  list: (params?: GetVideosParams) => [...VIDEOS_QUERY_KEYS.all, 'list', params] as const,
  types: () => [...VIDEOS_QUERY_KEYS.all, 'types'] as const,
  detail: (id: string) => [...VIDEOS_QUERY_KEYS.all, 'detail', id] as const,
};

/**
 * Hook truy vấn danh sách Video có lọc và phân trang
 */
export function useVideos(params?: GetVideosParams) {
  return useQuery({
    queryKey: VIDEOS_QUERY_KEYS.list(params),
    queryFn: () => getVideosApi(params),
    staleTime: 1000 * 60 * 2, // Cache 2 phút
  });
}

/**
 * Hook lấy danh sách loại video cố định (Học thuật, Nhận định thị trường)
 */
export function useVideoTypes() {
  return useQuery({
    queryKey: VIDEOS_QUERY_KEYS.types(),
    queryFn: getVideoTypesApi,
    staleTime: 1000 * 60 * 30, // Cache 30 phút
  });
}

/**
 * Hook lấy chi tiết 1 video theo ID
 */
export function useVideoDetail(id?: string) {
  return useQuery({
    queryKey: VIDEOS_QUERY_KEYS.detail(id || ''),
    queryFn: () => getVideoByIdApi(id!),
    enabled: Boolean(id),
  });
}

/**
 * Hook kiểm tra quyền xem video của người dùng dựa trên Gói Hội Viên & Feature Codes
 */
export function useVideoAccess(video?: Video | null): VideoAccessResult {
  const { accessToken } = useAuthStore();
  const { data: mySubData, isLoading: isSubLoading } = useMySubscriptions(Boolean(accessToken));

  if (!video) {
    return {
      hasFullAccess: false,
      isPremium: false,
      isTeaser: false,
      teaserDuration: 0,
      reason: 'FREE_VIDEO',
    };
  }

  // 1. Video Miễn Phí (isPremium === false) -> Ai cũng được xem full
  if (!video.isPremium) {
    return {
      hasFullAccess: true,
      isPremium: false,
      isTeaser: false,
      teaserDuration: 0,
      reason: 'FREE_VIDEO',
    };
  }

  const teaserSecs = typeof video.teaserDuration === 'number' ? video.teaserDuration : 0;

  // 2. Video Premium nhưng người dùng CHƯA ĐĂNG NHẬP
  if (!accessToken) {
    return {
      hasFullAccess: false,
      isPremium: true,
      isTeaser: true,
      teaserDuration: teaserSecs,
      reason: 'NOT_LOGGED_IN',
    };
  }

  // Nếu đang tải dữ liệu gói hội viên cá nhân
  if (isSubLoading) {
    return {
      hasFullAccess: false,
      isPremium: true,
      isTeaser: true,
      teaserDuration: teaserSecs,
      reason: 'NO_ACTIVE_SUBSCRIPTION',
    };
  }

  const activeSub = mySubData?.activeSubscription;

  // 3. Người dùng đã đăng nhập nhưng CHƯA CÓ GÓI HỘI VIÊN ACTIVE
  if (!activeSub || !activeSub.plan) {
    return {
      hasFullAccess: false,
      isPremium: true,
      isTeaser: true,
      teaserDuration: teaserSecs,
      reason: 'NO_ACTIVE_SUBSCRIPTION',
    };
  }

  // 4. Kiểm tra gói active của user có chứa feature code 'video:watch_premium' không
  const rawPlan = activeSub.plan as any;
  const planFeatures = Array.isArray(rawPlan?.planFeatures)
    ? rawPlan.planFeatures
    : Array.isArray(rawPlan?.features)
    ? rawPlan.features
    : [];

  const hasPremiumFeature = planFeatures.some((pf: any) => {
    const code = pf.feature?.code || pf.code;
    const isAvailable = pf.isAvailable !== undefined ? Boolean(pf.isAvailable) : Boolean(pf.isIncluded);
    const isSystemActive = pf.feature?.isActive !== false;
    return code === VIDEO_FEATURE_CODES.PREMIUM && isAvailable && isSystemActive;
  });

  if (hasPremiumFeature) {
    return {
      hasFullAccess: true,
      isPremium: true,
      isTeaser: false,
      teaserDuration: 0,
      reason: 'PREMIUM_GRANTED',
    };
  }

  // Gói của user không hỗ trợ tính năng xem video premium
  return {
    hasFullAccess: false,
    isPremium: true,
    isTeaser: true,
    teaserDuration: teaserSecs,
    reason: 'FEATURE_NOT_IN_PLAN',
  };
}
