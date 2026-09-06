import api from '@/core/services/api';
import { GetVideosParams, Video, VideoListResponse, VideoType } from '../types';

const API_BASE_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

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
  const youtubeVideoId = raw.youtubeVideoId || raw.youtube_video_id || raw.youtubeId || null;
  const rawVideoUrl = raw.videoUrl || raw.video_url || raw.url || raw.storagePath || raw.storage_path || null;
  const rawThumbnailUrl = raw.thumbnailUrl || raw.thumbnail_url || raw.coverUrl || raw.cover_url || null;

  const videoUrl = formatMediaUrl(rawVideoUrl);
  const thumbnailUrl = formatMediaUrl(rawThumbnailUrl);

  return {
    ...raw,
    id: String(raw.id || raw._id || ''),
    code: raw.code || '',
    title: raw.title || '',
    slug: raw.slug || '',
    description: raw.description || null,
    thumbnailUrl,
    videoUrl,
    storagePath: raw.storagePath || raw.storage_path || null,
    youtubeVideoId,
    sourceType:
      raw.sourceType ||
      raw.source_type ||
      (youtubeVideoId || (rawVideoUrl && (rawVideoUrl.includes('youtube.com') || rawVideoUrl.includes('youtu.be')))
        ? 'youtube'
        : 'direct_upload'),
    duration: typeof raw.duration === 'number' ? raw.duration : Number(raw.duration || 0),
    isPremium: Boolean(raw.isPremium ?? raw.is_premium ?? false),
    teaserDuration: raw.teaserDuration ?? raw.teaser_duration ?? 0,
    views: raw.views ?? 0,
    status: raw.status || 'published',
    videoTypeId: raw.videoTypeId || raw.video_type_id || raw.videoType?.id || 1,
    videoType: raw.videoType || raw.video_type,
    creator: raw.creator,
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    updatedAt: raw.updatedAt || raw.updated_at || new Date().toISOString(),
  };
}

/**
 * Lấy danh sách Video có phân trang, lọc và tìm kiếm từ Backend (Public API)
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
 * Lấy thông tin chi tiết 1 Video theo ID (Public API)
 */
export async function getVideoByIdApi(id: string): Promise<Video> {
  const response = await api.get(`/videos/${id}`);
  const data = response.data?.data || response.data;
  const rawVideo = data?.video || data;
  return normalizeVideo(rawVideo);
}
