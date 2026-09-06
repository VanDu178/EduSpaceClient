export type SourceType = 'direct_upload' | 'youtube';
export type VideoStatus = 'draft' | 'published' | 'archived';

export interface VideoType {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface VideoCreator {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface Video {
  id: string;
  code: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  storagePath?: string | null;
  sourceType: SourceType;
  youtubeVideoId?: string | null;
  duration: number; // in seconds
  isPremium: boolean;
  teaserDuration?: number; // in seconds
  views: number;
  status: VideoStatus;
  videoTypeId: number;
  videoType?: VideoType;
  creator?: VideoCreator;
  createdAt: string;
  updatedAt: string;
}

export interface GetVideosParams {
  page?: number;
  limit?: number;
  search?: string;
  videoTypeId?: number;
  sourceType?: SourceType;
  status?: string;
  isPremium?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface VideoListResponse {
  videos: Video[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type VideoAccessReason =
  | 'FREE_VIDEO'
  | 'PREMIUM_GRANTED'
  | 'NOT_LOGGED_IN'
  | 'NO_ACTIVE_SUBSCRIPTION'
  | 'FEATURE_NOT_IN_PLAN';

export interface VideoAccessResult {
  hasFullAccess: boolean;
  isPremium: boolean;
  isTeaser: boolean;
  teaserDuration: number;
  reason: VideoAccessReason;
}
