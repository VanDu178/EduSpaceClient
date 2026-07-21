import React from "react";
import Link from "next/link";
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard = ({ post, className = "" }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`} className={`group block ${className}`}>
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30">
        {post.image && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-zinc-800">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-slate-900/70 dark:bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                {post.category}
              </span>
            </div>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 mb-2">
              {post.readTime && (
                <>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                </>
              )}
              <span>{post.date}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            Đọc bài viết{" "}
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

