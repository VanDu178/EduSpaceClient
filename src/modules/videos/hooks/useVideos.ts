import { useQuery } from '@tanstack/react-query';
import { getVideosApi, getVideoTypesApi, getVideoByIdApi } from '../services';
import { GetVideosParams } from '../types';

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

