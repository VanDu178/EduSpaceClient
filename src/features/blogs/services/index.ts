import api from '@/core/services/api';
import { Blog, BlogType, GetBlogsParams, GetBlogsResponse } from '../types';

/**
 * Lấy danh sách thể loại bài blog (Public)
 */
export const getBlogTypesApi = async (): Promise<BlogType[]> => {
  const response = await api.get('/blog-types');
  return response.data.data;
};

/**
 * Lấy danh sách bài blog có phân trang & tìm kiếm/lọc (Public)
 */
export const getBlogsApi = async (
  params?: GetBlogsParams
): Promise<GetBlogsResponse> => {
  const response = await api.get('/blogs', {
    params: {
      status: 'published',
      ...params,
    },
  });
  return response.data.data;
};

/**
 * Lấy chi tiết bài blog theo Slug (Public)
 */
export const getBlogBySlugApi = async (slug: string): Promise<Blog> => {
  const response = await api.get(`/blogs/slug/${slug}`);
  return response.data.data.blog;
};
