import { useQuery } from '@tanstack/react-query';
import { getBlogTypesApi, getBlogsApi, getBlogBySlugApi } from '../services';
import { GetBlogsParams } from '../types';

export const BLOGS_QUERY_KEYS = {
  all: ['blogs'] as const,
  types: () => [...BLOGS_QUERY_KEYS.all, 'types'] as const,
  list: (params?: GetBlogsParams) => [...BLOGS_QUERY_KEYS.all, 'list', params] as const,
  detail: (slug: string) => [...BLOGS_QUERY_KEYS.all, 'detail', slug] as const,
};

/**
 * Hook lấy danh sách thể loại bài blog (Public)
 */
export function useBlogTypes(enabled = true) {
  return useQuery({
    queryKey: BLOGS_QUERY_KEYS.types(),
    queryFn: getBlogTypesApi,
    enabled,
    staleTime: 1000 * 60 * 15, // Cache 15 phút
  });
}

/**
 * Hook lấy danh sách bài blog có phân trang & lọc (Public)
 */
export function useBlogs(params?: GetBlogsParams, enabled = true) {
  return useQuery({
    queryKey: BLOGS_QUERY_KEYS.list(params),
    queryFn: () => getBlogsApi(params),
    enabled,
    staleTime: 1000 * 60 * 5, // Cache 5 phút
  });
}

/**
 * Hook lấy chi tiết bài blog theo Slug (Public)
 */
export function useBlogBySlug(slug: string, enabled = true) {
  return useQuery({
    queryKey: BLOGS_QUERY_KEYS.detail(slug),
    queryFn: () => getBlogBySlugApi(slug),
    enabled: Boolean(slug) && enabled,
    staleTime: 1000 * 60 * 5, // Cache 5 phút
  });
}
