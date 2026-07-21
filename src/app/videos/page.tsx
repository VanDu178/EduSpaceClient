"use client";

import React, { useState } from "react";
import { VideoCard } from "@/features/videos";
import { SearchBar } from "@/components/common";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const videos = [
    {
      id: "v1",
      slug: "huong-dan-pinescript-v5-backtest-tradingview",
      title: "Hướng dẫn viết chỉ báo Pine Script v5 & Backtest chiến lược trên TradingView từ A-Z",
      duration: "115:20",
      views: "18.2k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop",
      tag: "TradingView & PineScript",
    },
    {
      id: "v2",
      slug: "financial-time-series-machine-learning-python",
      title: "Xử lý dữ liệu chuỗi thời gian (Financial Time Series) & Machine Learning với Python",
      duration: "52:40",
      views: "12.1k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      tag: "Python Quant",
    },
    {
      id: "v3",
      slug: "quan-ly-rui-ro-kelly-criterion-api",
      title: "Xây dựng hệ thống quản lý rủi ro tự động & tính toán Kelly Criterion tự động qua API",
      duration: "45:15",
      views: "8.9k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
      tag: "Risk Management",
    },
    {
      id: "v4",
      slug: "order-flow-cvd-footprint-chart",
      title: "Phân tích Order Flow, Cumulative Volume Delta (CVD) và Footprint Chart thực chiến",
      duration: "68:10",
      views: "15.4k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
      tag: "Order Flow Analysis",
    },
  ];

  const filteredVideos = videos.filter((video) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      video.title.toLowerCase().includes(q) ||
      video.tag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Kho Video <span className="gradient-text">Trading & Quantitative Analysis</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          Tổng hợp các video hướng dẫn chi tiết về lập trình tài chính, xây dựng bot giao dịch tự động, phân tích Order Flow và kiểm thử chiến lược định lượng.
        </p>

        {/* Search Bar */}
        <div className="pt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm video theo tiêu đề, chủ đề, kịch bản..."
          />
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/30">
          <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            Không tìm thấy video phù hợp
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Thử tìm kiếm với từ khóa khác như "PineScript", "Python", "Order Flow"...
          </p>
        </div>
      )}
    </div>
  );
}
