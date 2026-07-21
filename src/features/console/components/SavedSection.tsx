"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import {
  DocumentTextIcon,
  VideoCameraIcon,
  BookmarkSlashIcon,
  ArrowRightIcon,
  ClockIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { SavedPost, SavedVideo } from "../types";

interface SavedSectionProps {
  savedPosts: SavedPost[];
  savedVideos: SavedVideo[];
  onRemovePost?: (id: string) => void;
  onRemoveVideo?: (id: string) => void;
}

export function SavedSection({
  savedPosts,
  savedVideos,
  onRemovePost,
  onRemoveVideo,
}: SavedSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"posts" | "videos">("posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = savedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = savedVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
      {/* Header controls & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Nội dung đã lưu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Quản lý và xem lại các bài viết kỹ thuật và video bài giảng bạn đã đánh dấu.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-white/10 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab("posts")}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSubTab === "posts"
                ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/10"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <DocumentTextIcon className="w-4 h-4" />
            Bài viết ({savedPosts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("videos")}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
              activeSubTab === "videos"
                ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/10"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <VideoCameraIcon className="w-4 h-4" />
            Video ({savedVideos.length})
          </button>
        </div>
      </div>

      {/* Filter / Search input */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder={`Tìm kiếm trong ${activeSubTab === "posts" ? "bài viết" : "video"} đã lưu...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Sub-tab 1: Saved Posts */}
      {activeSubTab === "posts" && (
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
              <DocumentTextIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-zinc-600 mb-2" />
              <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                Chưa có bài viết nào được lưu
              </p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                Duyệt danh sách bài viết và bấm lưu để lưu lại bài đọc ưa thích.
              </p>
              <Link href="/posts" className="inline-block mt-4">
                <Button type="primary" className="!rounded-lg h-9 text-xs font-semibold border-none">
                  Khám phá bài viết
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md font-medium bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 mb-4">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                    <span>Tác giả: <strong className="text-slate-700 dark:text-zinc-300 font-medium">{post.author}</strong></span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<BookmarkSlashIcon className="w-4 h-4" />}
                        onClick={() => onRemovePost && onRemovePost(post.id)}
                        className="flex items-center text-xs border-none"
                      >
                        Bỏ lưu
                      </Button>
                      <Link href={`/posts/${post.slug}`}>
                        <Button
                          type="default"
                          size="small"
                          icon={<ArrowRightIcon className="w-3.5 h-3.5" />}
                          className="flex items-center text-xs rounded-lg border border-slate-200 dark:border-white/10"
                        >
                          Đọc tiếp
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sub-tab 2: Saved Videos */}
      {activeSubTab === "videos" && (
        <div className="space-y-4">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
              <VideoCameraIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-zinc-600 mb-2" />
              <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                Chưa có video nào được lưu
              </p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                Duyệt thư viện video và bấm lưu để xem lại sau.
              </p>
              <Link href="/videos" className="inline-block mt-4">
                <Button type="primary" className="!rounded-lg h-9 text-xs font-semibold border-none">
                  Xem danh sách video
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/videos/${video.slug}`}>
                        <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <EyeIcon className="w-5 h-5" />
                        </span>
                      </Link>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-semibold bg-black/80 text-white rounded">
                      {video.duration}
                    </span>
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold bg-indigo-600/90 text-white rounded">
                      {video.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2">
                        <Link href={`/videos/${video.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {video.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400">
                        Giảng viên: <strong className="text-slate-700 dark:text-zinc-300 font-medium">{video.instructor}</strong>
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                      <span>Lượt xem: {video.views.toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="text"
                          size="small"
                          danger
                          icon={<BookmarkSlashIcon className="w-4 h-4" />}
                          onClick={() => onRemoveVideo && onRemoveVideo(video.id)}
                          className="flex items-center text-xs border-none"
                        >
                          Bỏ lưu
                        </Button>
                        <Link href={`/videos/${video.slug}`}>
                          <Button
                            type="primary"
                            size="small"
                            className="flex items-center text-xs !rounded-lg border-none"
                          >
                            Xem video
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
