import { GetVideosParams } from './types';

/**
 * Mã System Feature Codes quy định từ Backend (chuẩn Namespace)
 * CẤM HARDCODE chuỗi trong logic component.
 */
export const VIDEO_FEATURE_CODES = {
  FREE: 'video:watch_free',
  PREMIUM: 'video:watch_premium',
} as const;

export const VIDEO_SOURCE_TYPES = {
  DIRECT_UPLOAD: 'direct_upload',
  YOUTUBE: 'youtube',
} as const;

export const ITEMS_PER_PAGE = 6;

export const VIDEO_SORT_OPTIONS = [
  { label: 'Mới nhất', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Cũ nhất', sortBy: 'createdAt', sortOrder: 'asc' },
  { label: 'Xem nhiều nhất', sortBy: 'views', sortOrder: 'desc' },
  { label: 'Thời lượng (Dài -> Ngắn)', sortBy: 'duration', sortOrder: 'desc' },
  { label: 'Thời lượng (Ngắn -> Dài)', sortBy: 'duration', sortOrder: 'asc' },
] as const;



export const VIDEO_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const


export const PROCESS_STATUS = {
  PROCESSING: 'processing',
  READY: 'ready',
  FAILED: 'failed',
} as const