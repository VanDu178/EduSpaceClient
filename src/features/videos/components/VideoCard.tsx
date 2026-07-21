import React from "react";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Video } from "../types";

interface VideoCardProps {
  video: Video;
  onClick?: (video: Video) => void;
  className?: string;
}

export const VideoCard = ({ video, onClick, className = "" }: VideoCardProps) => {
  const content = (
    <div
      onClick={() => onClick?.(video)}
      className={`glass-card rounded-3xl overflow-hidden group border border-slate-200 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 ${onClick ? "cursor-pointer" : ""
        } ${className}`}
    >
      <div className="relative h-64 w-full overflow-hidden bg-slate-900 dark:bg-zinc-900 cursor-pointer">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Overlay Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
            <PlayIcon className="w-8 h-8 ml-1" />
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-purple-600/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
            {video.tag}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2.5 py-1 rounded-md font-mono">
          {video.duration}
        </div>
      </div>

      <div className="p-6">
        <div className="text-xs text-slate-500 dark:text-zinc-400 mb-2">{video.views}</div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
          {video.title}
        </h3>
      </div>
    </div>
  );

  if (onClick) {
    return content;
  }

  return <Link href={`/videos/${video.slug}`}>{content}</Link>;
};
