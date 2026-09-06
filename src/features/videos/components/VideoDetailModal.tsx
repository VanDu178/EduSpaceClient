'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  XMarkIcon,
  PlayIcon,
  SparklesIcon,
  EyeIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Video } from '../types';
import { useVideoAccess } from '../hooks/useVideos';
import { Button } from '@/components/common/Button';
import { formatDate } from '@/core/utils';

interface VideoDetailModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Trích xuất YouTube Embed URL an toàn từ ID hoặc URL gốc
 */
function getYoutubeEmbedUrl(youtubeVideoId?: string | null, rawUrl?: string | null): string | null {
  if (youtubeVideoId) {
    return `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&enablejsapi=1`;
  }
  if (!rawUrl) return null;
  const match = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&enablejsapi=1`;
  }
  return null;
}

export function VideoDetailModal({ video, isOpen, onClose }: VideoDetailModalProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isTeaserLimitReached, setIsTeaserLimitReached] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const accessResult = useVideoAccess(video);
  const { hasFullAccess, isTeaser, teaserDuration, reason } = accessResult;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset state when changing video
  useEffect(() => {
    setIsTeaserLimitReached(false);
    setElapsedSeconds(0);
  }, [video?.id]);

  // ESC Key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // YouTube / General Teaser Timer (dành cho YouTube Embeds)
  useEffect(() => {
    if (!isOpen || hasFullAccess || !isTeaser || teaserDuration <= 0 || isTeaserLimitReached) {
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
  }, [isOpen, hasFullAccess, isTeaser, teaserDuration, isTeaserLimitReached]);

  if (!isOpen || !video) return null;

  // URL hiện tại để truyền vào redirect param
  const currentVideoUrl =
    typeof window !== 'undefined'
      ? `${window.location.pathname}?v=${video.id}`
      : `/videos?v=${video.id}`;

  // Xử lý chuyển hướng từ Callout
  const handleCalloutAction = () => {
    onClose();
    if (reason === 'NOT_LOGGED_IN') {
      router.push(`/login?redirect=${encodeURIComponent(currentVideoUrl)}`);
    } else {
      router.push(`/pricing?redirect=${encodeURIComponent(currentVideoUrl)}`);
    }
  };

  // Reset phát lại bản xem thử
  const handleReplayTeaser = () => {
    setIsTeaserLimitReached(false);
    setElapsedSeconds(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // HTML5 Video Handlers
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

  const youtubeEmbedUrl = getYoutubeEmbedUrl(video.youtubeVideoId, video.videoUrl);
  const isYoutube = video.sourceType === 'youtube' || Boolean(youtubeEmbedUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden border border-slate-200 z-10 animate-slide-up-fade flex flex-col max-h-[92vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng modal"
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors flex items-center justify-center cursor-pointer backdrop-blur-xs border border-slate-700"
        >
          <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-slate-950 overflow-hidden flex items-center justify-center shrink-0">
          {/* 1. Teaser Warning Notice Banner (Top of Video Player) */}
          {!hasFullAccess && isTeaser && teaserDuration > 0 && !isTeaserLimitReached && (
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-slate-950/90 to-transparent p-3 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-1.5 font-medium text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-500/40">
                <SparklesIcon className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Chế độ xem thử: <strong>{teaserDuration}s</strong></span>
              </div>
              <button
                type="button"
                onClick={handleCalloutAction}
                className="text-[11px] font-semibold text-sky-300 hover:text-white transition-colors underline cursor-pointer"
              >
                {reason === 'NOT_LOGGED_IN' ? 'Đăng nhập để xem full' : 'Nâng cấp gói ngay'}
              </button>
            </div>
          )}

          {/* 2. Main Player: HTML5 vs YouTube Embed */}
          {isYoutube && youtubeEmbedUrl ? (
            <iframe
              src={youtubeEmbedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : video.videoUrl ? (
            <video
              ref={videoRef}
              src={video.videoUrl}
              controls
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onSeeking={handleSeeking}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <PlayIcon className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-sm">Video hiện đang cập nhật luồng trực tiếp...</p>
            </div>
          )}

          {/* 3. Callout Overlay (Hiển thị khi HẾT THỜI LƯỢNG XEM THỬ) */}
          {isTeaserLimitReached && (
            <div className="absolute inset-0 z-30 bg-slate-950/92 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <LockClosedIcon className="w-7 h-7" />
              </div>

              <div className="space-y-1.5 max-w-md">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Đã hết thời lượng xem thử ({teaserDuration}s)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {reason === 'NOT_LOGGED_IN'
                    ? 'Bạn đang xem video bài giảng ở chế độ dùng thử. Vui lòng đăng nhập tài khoản TradeVerse để tiếp tục xem nội dung và trải nghiệm.'
                    : 'Nâng cấp Gói Hội Viên để sở hữu đặc quyền xem toàn bộ thư viện video bài giảng & phân tích kỹ thuật nâng cao!'}
                </p>
              </div>

              {/* Callout Action Buttons */}
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

                <button
                  type="button"
                  onClick={handleReplayTeaser}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Xem lại bản dùng thử
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Video Information Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* Badges & Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                {video.videoType?.name || 'Học thuật'}
              </span>
              {video.isPremium ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-200 to-yellow-400 px-2.5 py-1 rounded-lg border border-amber-300">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  Trả phí
                </span>
              ) : (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Miễn phí
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <EyeIcon className="w-4 h-4" />
                {video.views} lượt xem
              </span>
              {video.createdAt && (
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {formatDate(video.createdAt)}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {video.title}
          </h2>

          {/* Creator & Info Bar */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm border border-sky-200 shrink-0">
              {video.creator?.name ? video.creator.name.charAt(0).toUpperCase() : <UserIcon className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {video.creator?.name || 'TradeVerse Academy'}
              </h4>
              <p className="text-[11px] text-slate-500">
                Mã video: <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded font-mono">{video.code}</code>
              </p>
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500">
                Mô tả bài giảng
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                {video.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
