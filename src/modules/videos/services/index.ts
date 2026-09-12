import api from '@/core/services/api';
import { GetVideosParams, Video, VideoListResponse, VideoType } from '../types';
import { PROCESS_STATUS, VIDEO_SOURCE_TYPES, VIDEO_STATUS } from '../constants';

const API_BASE_ORIGIN = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '');

function formatMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `${API_BASE_ORIGIN}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
}

/**
 * Chuẩn hóa đối tượng Video từ backend (hỗ trợ cả camelCase và snake_case, gỡ bọc object)
 */
function normalizeVideo(raw: any): Video {
  if (!raw) return raw;
  const youtubeVideoId = raw.youtubeVideoId || null;
  const rawVideoUrl = raw.videoUrl || null;
  const rawThumbnailUrl = raw.thumbnailUrl || null;

  const videoUrl = formatMediaUrl(rawVideoUrl);
  const thumbnailUrl = formatMediaUrl(rawThumbnailUrl);

  return {
    ...raw,
    id: String(raw.id || ''),
    code: raw.code || '',
    title: raw.title || '',
    slug: raw.slug || '',
    description: raw.description || null,
    thumbnailUrl,
    videoUrl,
    storagePath: raw.storagePath || null,
    youtubeVideoId,
    sourceType:
      raw.sourceType ||
      (youtubeVideoId || (rawVideoUrl && (rawVideoUrl.includes('youtube.com')))
        ? VIDEO_SOURCE_TYPES.YOUTUBE
        : VIDEO_SOURCE_TYPES.DIRECT_UPLOAD),
    duration: typeof raw.duration === 'number' ? raw.duration : Number(raw.duration || 0),
    isPremium: Boolean(raw.isPremium),
    teaserDuration: raw.teaserDuration || 0,
    views: raw.views ?? 0,
    status: raw.status || VIDEO_STATUS.PUBLISHED,
    processStatus: raw.processStatus || (raw.status === PROCESS_STATUS.PROCESSING ? PROCESS_STATUS.PROCESSING : PROCESS_STATUS.READY),
    videoTypeId: raw.videoTypeId || raw.videoType?.id || 1,
    videoType: raw.videoType,
    creator: raw.creator,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
    hasFullAccess: typeof raw.hasFullAccess === 'boolean' ? raw.hasFullAccess : undefined,
  };
}

/**
 * Lấy danh sách Video có phân trang, lọc và tìm kiếm từ Backend dành cho Client (Public / Optional Auth)
 */
export async function getVideosApi(
  params?: GetVideosParams
): Promise<VideoListResponse> {
  const response = await api.get('/videos', {
    params: {
      status: 'published',
      ...params,
    },
  });

  const data = response.data?.data || response.data || {};
  const rawVideos = Array.isArray(data.videos)
    ? data.videos
    : Array.isArray(data)
      ? data
      : [];

  return {
    videos: rawVideos.map(normalizeVideo),
    pagination: data.pagination || {
      total: rawVideos.length,
      page: params?.page || 1,
      limit: params?.limit || 12,
      totalPages: 1,
    },
  };
}

/**
 * Lấy danh sách 2 Loại Video hệ thống cố định (Public API)
 */
export async function getVideoTypesApi(): Promise<VideoType[]> {
  const response = await api.get('/videos/types');
  const data = response.data?.data || response.data || {};
  if (Array.isArray(data?.videoTypes)) {
    return data.videoTypes;
  }
  return Array.isArray(data) ? data : [];
}

/**
 * Lấy thông tin chi tiết 1 Video theo ID hoặc Slug (Client API với Dynamic Auth)
 */
export async function getVideoByIdApi(id: string): Promise<Video> {
  const response = await api.get(`/videos/client/${id}`);
  const data = response.data?.data || response.data;
  const rawVideo = data?.video || data;
  return normalizeVideo(rawVideo);
}
