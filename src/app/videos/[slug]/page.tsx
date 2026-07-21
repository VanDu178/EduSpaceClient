"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, Input, message } from "antd";
import { Button } from "@/components/common";
import {
  ArrowLeftIcon,
  PlayIcon,
  ClockIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function VideoDetailPage() {
  const params = useParams();
  const slug = (params.slug as string) || "huong-dan-pinescript-v5-backtest-tradingview";

  const [messageApi, contextHolder] = message.useMessage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "timestamps" | "comments">("timestamps");
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [commentText, setCommentText] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock video details catalog keyed by slug
  const videoCatalog: Record<
    string,
    {
      title: string;
      views: string;
      duration: string;
      date: string;
      tag: string;
      instructor: {
        name: string;
        role: string;
        avatar: string;
      };
      thumbnail: string;
      description: string;
      scriptSnippet?: string;
      timestamps: { time: string; title: string; seconds: number }[];
    }
  > = {
    "huong-dan-pinescript-v5-backtest-tradingview": {
      title: "Hướng dẫn viết chỉ báo Pine Script v5 & Backtest chiến lược trên TradingView từ A-Z",
      views: "18.2k lượt xem",
      duration: "115:20",
      date: "19 Tháng 7, 2026",
      tag: "TradingView & PineScript",
      instructor: {
        name: "Phạm Văn Dự",
        role: "Trưởng nhóm Kiểm thử Chiến lược & Quant Trade",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      },
      thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop",
      description:
        "Trong video dài hơn 2 tiếng này, chúng ta sẽ xây dựng từ đầu một chiến lược giao dịch tự động kết hợp EMA Cross và RSI Divergence bằng ngôn ngữ Pine Script v5 trên nền tảng TradingView. Bạn sẽ học cách thiết lập tham số đầu vào (Input parameters), cài đặt tín hiệu Entry/Exit, quản lý vốn theo % rủi ro tài khoản và chạy backtest tự động với dữ liệu lịch sử 5 năm.",
      scriptSnippet: `//@version=5
strategy("EduSpace Quantitative EMA + RSI Strategy", overlay=true, initial_capital=10000)

// Parameters
fastLen = input.int(9, "Fast EMA")
slowLen = input.int(21, "Slow EMA")
rsiLen  = input.int(14, "RSI Period")

// Indicators
fastEma = ta.ema(close, fastLen)
slowEma = ta.ema(close, slowLen)
rsiVal  = ta.rsi(close, rsiLen)

// Entry Conditions
longCondition  = ta.crossover(fastEma, slowEma) and rsiVal > 50
shortCondition = ta.crossunder(fastEma, slowEma) and rsiVal < 50

if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)`,
      timestamps: [
        { time: "00:00", title: "Giới thiệu tổng quan & Mục tiêu khóa học PineScript v5", seconds: 0 },
        { time: "12:15", title: "Cấu trúc cú pháp PineScript v5 & Khai báo Strategy/Indicator", seconds: 735 },
        { time: "34:50", title: "Xây dựng bộ lọc tín hiệu EMA Cross kết hợp RSI Divergence", seconds: 2090 },
        { time: "65:10", title: "Tối ưu hóa quản lý rủi ro, Stop Loss & Take Profit tự động", seconds: 3910 },
        { time: "92:30", title: "Phân tích kết quả Backtest (Win Rate, Profit Factor, Drawdown)", seconds: 5550 },
      ],
    },
    "financial-time-series-machine-learning-python": {
      title: "Xử lý dữ liệu chuỗi thời gian (Financial Time Series) & Machine Learning với Python",
      views: "12.1k lượt xem",
      duration: "52:40",
      date: "16 Tháng 7, 2026",
      tag: "Python Quant",
      instructor: {
        name: "Lê Minh Tuấn",
        role: "Senior Data Scientist & Algorithmic Trader",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      },
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      description:
        "Hướng dẫn thu thập dữ liệu giá OHLCV trực tiếp qua API Binance/Yahoo Finance, làm sạch chuỗi thời gian bằng Pandas/Numpy và huấn luyện mô hình XGBoost để dự đoán xu hướng biến động giá ngắn hạn.",
      timestamps: [
        { time: "00:00", title: "Khởi tạo môi trường Python & Cài đặt thư viện Pandas/yfinance", seconds: 0 },
        { time: "15:20", title: "Feature Engineering: Tạo các chỉ báo kỹ thuật làm Feature Vector", seconds: 920 },
        { time: "32:00", title: "Huấn luyện mô hình XGBoost Classifier & Tránh Look-ahead Bias", seconds: 1920 },
        { time: "45:10", title: "Đánh giá mô hình với Sharpe Ratio và CAGR", seconds: 2710 },
      ],
    },
  };

  const currentVideo =
    videoCatalog[slug] || videoCatalog["huong-dan-pinescript-v5-backtest-tradingview"];

  const relatedVideos = [
    {
      id: "v2",
      slug: "financial-time-series-machine-learning-python",
      title: "Xử lý dữ liệu chuỗi thời gian (Financial Time Series) & Machine Learning với Python",
      duration: "52:40",
      views: "12.1k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      tag: "Python Quant",
    },
    {
      id: "v3",
      slug: "quan-ly-rui-ro-kelly-criterion-api",
      title: "Xây dựng hệ thống quản lý rủi ro tự động & tính toán Kelly Criterion tự động qua API",
      duration: "45:15",
      views: "8.9k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop",
      tag: "Risk Management",
    },
    {
      id: "v4",
      slug: "order-flow-cvd-footprint-chart",
      title: "Phân tích Order Flow, Cumulative Volume Delta (CVD) và Footprint Chart thực chiến",
      duration: "68:10",
      views: "15.4k lượt xem",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
      tag: "Order Flow Analysis",
    },
  ].filter((v) => v.slug !== slug);

  const mockComments = [
    {
      id: "c1",
      user: "Trần Bảo Nam",
      time: "2 giờ trước",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      content:
        "Bài giảng rất chi tiết và trực quan! Phần xử lý rủi ro theo rsiVal > 50 kết hợp EMA cross giúp giảm đáng kể nhiễu sideway. Cảm ơn EduSpace team!",
    },
    {
      id: "c2",
      user: "Nguyễn Hải Đăng",
      time: "5 giờ trước",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
      content: "Cho mình hỏi mã nguồn PineScript v5 này có thể chuyển đổi trực tiếp sang Python Backtrader không ạ?",
    },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
      messageApi.info(`Đã chuyển tới mốc thời gian: ${seconds}s`);
    }
  };

  const handleSaveVideo = () => {
    setIsSaved(!isSaved);
    messageApi.success(isSaved ? "Đã bỏ lưu video!" : "Đã lưu video vào danh sách yêu thích!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    messageApi.success("Đã sao chép liên kết video!");
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    messageApi.success(isSubscribed ? "Đã hủy theo dõi!" : "Đã đăng ký theo dõi bài giảng của tác giả!");
  };

  const handleAddComment = () => {
    if (!commentText.trim()) {
      messageApi.error("Vui lòng nhập nội dung bình luận!");
      return;
    }
    messageApi.success("Bình luận của bạn đã được gửi thành công!");
    setCommentText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {contextHolder}
      {/* Back Button */}
      <div>
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Quay lại kho video</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (8 Cols) */}
        <main className="lg:col-span-8 space-y-6">
          {/* Video Player Frame */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 group">
            <video
              ref={videoRef}
              poster={currentVideo.thumbnail}
              className="w-full h-full object-cover"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Trình duyệt của bạn không hỗ trợ thẻ video HTML5.
            </video>

            {/* Custom Play Overlay when Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity group-hover:bg-slate-950/30"
              >
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-purple-600 transition-all">
                  <PlayIcon className="w-10 h-10 ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Video Header & Meta */}
          <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-purple-600/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs px-3 py-1 rounded-full font-semibold border border-purple-500/20">
                {currentVideo.tag}
              </span>
              <span className="text-slate-400 dark:text-zinc-500">•</span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                Thời lượng: {currentVideo.duration}
              </span>
              <span className="text-slate-400 dark:text-zinc-500">•</span>
              <span className="text-xs text-slate-500 dark:text-zinc-400">{currentVideo.views}</span>
              <span className="text-slate-400 dark:text-zinc-500">•</span>
              <span className="text-xs text-slate-500 dark:text-zinc-400">{currentVideo.date}</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {currentVideo.title}
            </h1>

            {/* Author & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <Avatar size={48} src={currentVideo.instructor.avatar} className="border-2 border-purple-500" />
                <div>
                  <div className="text-slate-900 dark:text-white font-bold text-sm flex items-center gap-1.5">
                    {currentVideo.instructor.name}
                    <CheckCircleIcon className="w-4 h-4 text-blue-500 inline-block" />
                  </div>
                  <div className="text-slate-500 dark:text-zinc-400 text-xs">{currentVideo.instructor.role}</div>
                </div>
                <Button
                  variant={isSubscribed ? "outline" : "primary"}
                  size="sm"
                  onClick={handleSubscribe}
                  className="ml-2 !rounded-xl"
                >
                  {isSubscribed ? "Đã theo dõi" : "Theo dõi"}
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveVideo}
                  className="!rounded-xl flex items-center gap-1.5"
                >
                  <BookmarkIcon className={`w-4 h-4 ${isSaved ? "text-amber-500 fill-amber-500" : ""}`} />
                  <span>{isSaved ? "Đã lưu" : "Lưu video"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="!rounded-xl flex items-center gap-1.5"
                >
                  <ShareIcon className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => messageApi.success("Đã bắt đầu tải gói file mã nguồn PineScript / Python (.zip)")}
                  className="!rounded-xl flex items-center gap-1.5 btn-gradient border-none"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>Tải Code Mẫu</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-white/10 gap-6">
            <button
              onClick={() => setActiveTab("timestamps")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "timestamps"
                  ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                  : "border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              Dấu mốc thời gian ({currentVideo.timestamps.length})
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                  : "border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <SparklesIcon className="w-4 h-4" />
              Nội dung & Kịch bản
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "comments"
                  ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                  : "border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              Thảo luận ({mockComments.length})
            </button>
          </div>

          {/* Tab Content 1: Timestamps */}
          {activeTab === "timestamps" && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Danh sách phân đoạn nội dung
              </h3>
              <div className="space-y-2">
                {currentVideo.timestamps.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSeek(item.seconds)}
                    className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-purple-500/40 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-600/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {item.time}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <PlayIcon className="w-5 h-5 text-slate-400 dark:text-zinc-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Overview & Script Snippet */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-zinc-300 text-sm leading-relaxed">
                <p>{currentVideo.description}</p>
              </div>

              {currentVideo.scriptSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Mã nguồn chiến lược PineScript v5 tham khảo
                    </h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentVideo.scriptSnippet || "");
                        messageApi.success("Đã sao chép PineScript code!");
                      }}
                      className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                    >
                      Sao chép Code
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 text-zinc-100 p-5 font-mono text-xs leading-6">
                    <pre className="overflow-x-auto">
                      <code>{currentVideo.scriptSnippet}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 3: Comments Section */}
          {activeTab === "comments" && (
            <div className="space-y-6">
              {/* Comment Input */}
              <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Viết bình luận của bạn</h3>
                <Input.TextArea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Đặt câu hỏi hoặc chia sẻ trải nghiệm áp dụng kịch bản..."
                  className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 !text-sm !rounded-xl"
                />
                <div className="flex justify-end">
                  <Button variant="primary" size="sm" onClick={handleAddComment} className="btn-gradient border-none">
                    Gửi bình luận
                  </Button>
                </div>
              </div>

              {/* Comment List */}
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex gap-4"
                  >
                    <Avatar size={40} src={comment.avatar} className="border border-purple-500/30 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{comment.user}</span>
                        <span className="text-xs text-slate-400 dark:text-zinc-500">{comment.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Related Videos Card */}
          <div className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
              Video bài giảng liên quan
            </h3>

            <div className="space-y-4">
              {relatedVideos.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/videos/${rel.slug}`}
                  className="flex gap-3 group p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200 dark:border-white/10">
                    <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {rel.duration}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 line-clamp-1">
                      {rel.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400">{rel.views}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
