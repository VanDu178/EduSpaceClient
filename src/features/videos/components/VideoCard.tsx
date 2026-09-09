'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, VideoCameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Video } from '../types';
import { formatDuration } from '../utils';
import { formatDate } from '@/core/utils';
import { PROCESS_STATUS } from '../constants';

interface VideoCardProps {
  video: Video;
  onSelect?: (video: Video) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const isPremium = video.isPremium;
  const isProcessing = video.processStatus === PROCESS_STATUS.PROCESSING;
  const isFailed = video.processStatus === PROCESS_STATUS.FAILED;
  const videoTypeName = video.videoType?.name || 'Bài giảng';
  const authorName = video.creator?.name || 'TradeVerse Team';
  const formattedDate = formatDate(video.createdAt);

  return (
    <Link
      href={`/videos/${video.id}`}
      onClick={(e) => {
        if (onSelect) {
          onSelect(video);
        }
      }}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-gray-300 transition-all duration-200 h-full cursor-pointer"
    >
      <div className="flex-1 flex flex-col">
        {/* Top Thumbnail (16:9 aspect ratio) */}
        <div className="w-full aspect-[16/9] relative overflow-hidden p-3 flex-shrink-0">
          <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
            {video.thumbnailUrl ? (
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center">
                <VideoCameraIcon className="w-12 h-12 text-slate-700 opacity-60" />
              </div>
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

            {/* Centered Play Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-200">
              <PlayIcon className="w-5 h-5 ml-0.5" />
            </div>

            {/* Duration Badge */}
            {video.duration > 0 && (
              <span className="absolute bottom-2.5 right-2.5 z-10 text-[11px] font-medium text-white bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded border border-slate-700/60">
                {formatDuration(video.duration)}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="!p-3 !sm:p-4 space-y-2 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {isProcessing && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-sky-700 bg-sky-50 rounded-md">
                <ArrowPathIcon className="w-3 h-3 animate-spin text-sky-600" />
                Đang xử lý HLS
              </span>
            )}
            <span className="px-2 py-0.5 text-[11px] font-medium text-primary bg-primary-light/60 rounded-md">
              {videoTypeName}
            </span>
            {isPremium ? (
              <span className="px-2 py-0.5 text-[11px] font-medium text-amber-700 bg-amber-50 rounded-md">
                Trả phí
              </span>
            ) : (
              null
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {video.title}
          </h3>

          {/* Description */}
          {video.description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="!px-3 !sm:px-4 pb-4 pt-2.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 flex-shrink-0">
        <div className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-[10px] flex-shrink-0">
          {authorName.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-700 truncate max-w-[120px]">
          {authorName}
        </span>
        <span className="text-gray-300">·</span>
        <span className="whitespace-nowrap">{formattedDate}</span>
        <span className="text-gray-300">·</span>
        <span className="whitespace-nowrap">{video.views ?? 0} lượt xem</span>
      </div>
    </Link>
  );
}
