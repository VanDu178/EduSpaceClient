'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  PlayIcon,
  SparklesIcon,
  EyeIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  LockClosedIcon,
  VideoCameraIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useVideoDetail, useVideoAccess, useVideos } from '../hooks/useVideos';
import { HlsPlayer } from '../components/HlsPlayer';
import { formatDuration } from '../utils';
import { Button } from '@/components/common/Button';
import { formatDate } from '@/core/utils';

/**
 * Trích xuất YouTube Embed URL an toàn từ ID hoặc URL gốc
 */
function getYoutubeEmbedUrl(youtubeVideoId?: string | null, rawUrl?: string | null): string | null {
  if (youtubeVideoId && /^[\w-]{11}$/.test(youtubeVideoId.trim())) {
    return `https://www.youtube.com/embed/${youtubeVideoId.trim()}?autoplay=1&enablejsapi=1`;
  }
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (/^[\w-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}?autoplay=1&enablejsapi=1`;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&enablejsapi=1`;
  }
  return null;
}

export function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isTeaserLimitReached, setIsTeaserLimitReached] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // 1. Fetch chi tiết video
  const { data: video = null, isLoading, isError } = useVideoDetail(id);

  // 2. Fetch danh sách video liên quan
  const { data: relatedData, isLoading: isRelatedLoading } = useVideos({
    limit: 10,
    status: 'published',
    videoTypeId: video?.videoTypeId,
  });

  const relatedVideos = (relatedData?.videos || []).filter((v) => v.id !== id);

  // 3. Phân quyền xem video
  const accessResult = useVideoAccess(video);
  const { hasFullAccess, isTeaser, teaserDuration, reason } = accessResult;

  // Reset state khi đổi ID video
  useEffect(() => {
    setIsTeaserLimitReached(false);
    setElapsedSeconds(0);
    setIsDescriptionExpanded(false);
  }, [id]);

  // YouTube / Embed Teaser Timer
  useEffect(() => {
    if (!video || hasFullAccess || !isTeaser || teaserDuration <= 0 || isTeaserLimitReached) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next >= teaserDuration) {
          setIsTeaserLimitReached(true);
          clearInterval(interval);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [video, hasFullAccess, isTeaser, teaserDuration, isTeaserLimitReached]);

  // Handle URL redirect cho Callout
  const handleCalloutAction = () => {
    const currentPath = `/videos/${id}`;
    if (reason === 'NOT_LOGGED_IN') {
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    } else {
      router.push(`/pricing?redirect=${encodeURIComponent(currentPath)}`);
    }
  };

  // Reset xem lại bản thử
  const handleReplayTeaser = () => {
    setIsTeaserLimitReached(false);
    setElapsedSeconds(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // HTML5 Video Event Handlers
  const handleTimeUpdate = () => {
    if (hasFullAccess || !isTeaser || teaserDuration <= 0) return;
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      if (current >= teaserDuration) {
        videoRef.current.pause();
        setIsTeaserLimitReached(true);
      }
    }
  };

  const handleSeeking = () => {
    if (hasFullAccess || !isTeaser || teaserDuration <= 0) return;
    if (videoRef.current && videoRef.current.currentTime > teaserDuration) {
      videoRef.current.currentTime = teaserDuration;
      videoRef.current.pause();
      setIsTeaserLimitReached(true);
    }
  };

  // State: Loading Skeleton
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6">
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="w-full aspect-video bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
          </div>
          <div className="lg:col-span-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-36 aspect-video bg-gray-100 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // State: Not Found
  if (isError || !video) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto border border-gray-200">
          <VideoCameraIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Không tìm thấy video</h2>
        <p className="text-sm text-gray-500">Video này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.</p>
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Quay lại Thư viện Video
        </Link>
      </div>
    );
  }

  const isProcessing = video.processStatus === 'processing' || (video.status as string) === 'processing';
  const youtubeEmbedUrl = getYoutubeEmbedUrl(video.youtubeVideoId, video.videoUrl);
  const isYoutube = video.sourceType === 'youtube' || Boolean(youtubeEmbedUrl);
  const authorName = video.creator?.name;
  const formattedDate = formatDate(video.createdAt);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 font-medium text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Tất cả video
        </Link>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Link href="/" className="hover:text-gray-700">Trang chủ</Link>
          <span>/</span>
          <Link href="/videos" className="hover:text-gray-700">Video</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[150px]">{video.title}</span>
        </div>
      </div>

      {/* Main YouTube-Style Watch Layout (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Player + Title + Channel Bar + Description (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Main Video Player Container (16:9 Aspect Ratio) */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-200">
            {/* Teaser Mode Top Warning Banner */}
            {!hasFullAccess && isTeaser && teaserDuration > 0 && !isTeaserLimitReached && !isProcessing && (
              <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-slate-950/90 to-transparent p-3.5 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2 font-medium text-amber-300 bg-amber-950/90 px-3 py-1 rounded-lg border border-amber-500/40">
                  <SparklesIcon className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Chế độ xem thử: <strong>{teaserDuration} giây</strong></span>
                </div>
                <button
                  type="button"
                  onClick={handleCalloutAction}
                  className="text-xs font-semibold text-sky-300 hover:text-white transition-colors underline cursor-pointer"
                >
                  {reason === 'NOT_LOGGED_IN' ? 'Đăng nhập để xem full' : 'Nâng cấp gói ngay'}
                </button>
              </div>
            )}

            {/* Video Player: HLS Transcoding State vs YouTube Embed vs HTML5 Direct Storage */}
            {isProcessing ? (
              <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <ArrowPathIcon className="w-7 h-7 animate-spin" />
                </div>
                <div className="space-y-2 max-w-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Video đang trong quá trình xử lý
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Video đang được hệ thống xử lý. Vui lòng quay lại sau ít phút nữa.
                  </p>
                </div>
              </div>
            ) : isYoutube && youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : video.videoUrl ? (
              <HlsPlayer
                video={video}
                src={video.videoUrl}
                poster={video.thumbnailUrl || undefined}
                autoPlay={true}
                videoRefOut={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onSeeking={handleSeeking}
              />
            ) : (
              <div className="p-8 text-center text-slate-400 space-y-2 flex flex-col items-center justify-center h-full">
                <PlayIcon className="w-12 h-12 text-slate-600" />
                <p className="text-sm">Video hiện đang cập nhật luồng phát trực tuyến...</p>
              </div>
            )}

            {/* Callout Overlay (Hết thời lượng xem thử) */}
            {isTeaserLimitReached && (
              <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <LockClosedIcon className="w-7 h-7" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Đã hết thời lượng xem thử
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {reason === 'NOT_LOGGED_IN'
                      ? 'Bạn đang xem video ở chế độ dùng thử. Vui lòng đăng nhập tài khoản TradeVerse để tiếp tục xem trọn bộ bài giảng.'
                      : 'Nâng cấp Gói Hội Viên để sở hữu đặc quyền xem toàn bộ thư viện video bài giảng & phân tích kỹ thuật nâng cao!'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-sm">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    rounded="xl"
                    fullWidth
                    onClick={handleCalloutAction}
                    rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                    className="font-semibold cursor-pointer"
                  >
                    {reason === 'NOT_LOGGED_IN' ? 'Đăng nhập ngay' : 'Xem các Gói Hội Viên'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    rounded="xl"
                    onClick={handleReplayTeaser}
                    leftIcon={<ArrowPathIcon className="w-4 h-4" />}
                    className="w-full sm:w-auto px-6 !bg-slate-900/80 !text-slate-300 hover:!text-white hover:!bg-slate-800 !border-slate-700/80 transition-all font-semibold whitespace-nowrap shrink-0"
                  >
                    Xem lại bản xem thử
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Video Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug tracking-tight">
            {video.title}
          </h1>

          {/* 3. YouTube-Style Channel & Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-1.5 border-b border-zinc-100 pb-3">
            {/* Left: Avatar + Channel Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white border border-primary/20 flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                {authorName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight flex items-center gap-1.5">
                  <span>{authorName}</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-sky-500 text-white text-[9px] font-bold" title="Tác giả bài giảng">✓</span>
                </h3>
                <p className="text-xs text-slate-500">Giảng viên TradeVerse</p>
              </div>
            </div>

            {/* Right: Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {isProcessing && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 rounded-full">
                  <ArrowPathIcon className="w-3.5 h-3.5 animate-spin text-sky-600" />
                  Đang xử lý HLS
                </span>
              )}
              <span className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light border border-primary/20 rounded-full">
                {video.videoType?.name || 'Bài giảng'}
              </span>
              {video.isPremium ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-full">
                  ★ Trả phí
                </span>
              ) : (
                <span className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-full">
                  Miễn phí
                </span>
              )}
            </div>
          </div>

          {/* 4. Views & Date Line (OUTSIDE the box) */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-600 font-medium pt-1">
            <span className="flex items-center gap-1 text-zinc-800 font-semibold">
              <EyeIcon className="w-4 h-4 text-zinc-400" />
              <span>{video.views ?? 0} lượt xem</span>
            </span>
            <span className="text-zinc-300 select-none">•</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4 text-zinc-400" />
              <span>Đã đăng ngày {formattedDate}</span>
            </span>
          </div>

          {/* 5. Description Text Box */}
          {video.description && (
            <div className="bg-zinc-100/90 hover:bg-zinc-100 border border-zinc-200/60 rounded-2xl p-4 sm:p-4.5 space-y-2 transition-colors">
              <p
                className={`text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line ${!isDescriptionExpanded ? 'line-clamp-3' : ''
                  }`}
              >
                {video.description}
              </p>
              {video.description.length > 150 && (
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-xs font-bold text-zinc-900 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                >
                  {isDescriptionExpanded ? (
                    <>
                      <span>Thu gọn</span>
                      <ChevronUpIcon className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>... hiện thêm</span>
                      <ChevronDownIcon className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Related Videos Sidebar (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            Video liên quan
          </h2>

          {isRelatedLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-36 aspect-video bg-gray-100 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : relatedVideos.length > 0 ? (
            <div className="space-y-3">
              {relatedVideos.map((relVideo) => (
                <Link
                  key={relVideo.id}
                  href={`/videos/${relVideo.id}`}
                  className="group flex gap-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {/* Thumbnail (Horizontal ~130px) */}
                  <div className="w-32 sm:w-36 aspect-[16/9] relative overflow-hidden bg-slate-900 rounded-lg shrink-0 border border-gray-200">
                    {relVideo.thumbnailUrl ? (
                      <Image
                        src={relVideo.thumbnailUrl}
                        alt={relVideo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <VideoCameraIcon className="w-6 h-6 text-slate-600" />
                      </div>
                    )}
                    {relVideo.duration > 0 && (
                      <span className="absolute bottom-1 right-1 z-10 text-[10px] font-medium text-white bg-black/80 px-1.5 py-0.5 rounded">
                        {formatDuration(relVideo.duration)}
                      </span>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0 space-y-1 py-0.5">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {relVideo.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate">
                      {relVideo.creator?.name || 'TradeVerse Team'}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <span>{relVideo.views ?? 0} lượt xem</span>
                      <span>·</span>
                      <span>{formatDate(relVideo.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Không có video liên quan khác.</p>
          )}
        </div>
      </div>
    </div>
  );
}
