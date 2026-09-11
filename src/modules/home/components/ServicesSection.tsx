"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/common";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  CommandLineIcon,
  SparklesIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"tradingview" | "bot">("tradingview");
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;

    const timer = setTimeout(() => {
      setActiveTab("bot");
    }, 3500);

    return () => clearTimeout(timer);
  }, [userInteracted]);

  const handleTabChange = (tab: "tradingview" | "bot") => {
    setUserInteracted(true);
    setActiveTab(tab);
  };

  return (
    <section id="services" className=" py-16 px-4 sm:px-6 lg:px-8 border-y border-zinc-200/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Visual Illustration Box with Interactive Service Showcase */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 space-y-5">
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5 gap-2">
                <div className="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-xl w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleTabChange("tradingview")}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${activeTab === "tradingview"
                      ? "bg-white text-indigo-600 border border-zinc-200/80"
                      : "text-zinc-600 hover:text-zinc-900"
                      }`}
                  >
                    <SparklesIcon className="w-4 h-4 text-indigo-600" />
                    <span>Tài Khoản TradingView</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabChange("bot")}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${activeTab === "bot"
                      ? "bg-white text-indigo-600 border border-zinc-200/80"
                      : "text-zinc-600 hover:text-zinc-900"
                      }`}
                  >
                    <CodeBracketIcon className="w-4 h-4 text-indigo-600" />
                    <span>Lập Trình &amp; Bot</span>
                  </button>
                </div>
              </div>

              {/* Tab Content Container with Fixed Min Height to Prevent Layout Shift */}
              <div className="min-h-[350px] sm:min-h-[360px] flex flex-col justify-between">
                {/* Tab Content 1: TradingView Account Service (Seamless Clean Flow) */}
                {activeTab === "tradingview" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Clean Top Status Banner */}
                    <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 text-zinc-900 gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                          <CheckBadgeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900">Tài khoản TradingView Premium</h4>
                          <p className="text-[11px] text-zinc-500">Đầy đủ tính năng cao cấp • Sử dụng ổn định</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-100/80 border border-indigo-200/60 px-2.5 py-1 rounded-full shrink-0">
                        Tiết kiệm 70%
                      </span>
                    </div>

                    {/* Seamless Feature List - No Nested Inner Boxes */}
                    <div className="divide-y divide-zinc-100 text-xs">
                      <div className="py-2.5 first:pt-1 last:pb-1 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                          <UserGroupIcon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-zinc-900 text-xs">Gói Private &amp; Shared</h5>
                            <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">Bảo Mật</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">
                            Lựa chọn linh hoạt giữa tài khoản Private riêng tư 100% bảo mật hoặc Shared tối ưu ngân sách.
                          </p>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <ComputerDesktopIcon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-zinc-900 text-xs">Đăng Nhập Đồng Thời</h5>
                            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">Multi-Device</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">
                            Cho phép tài khoản hoạt động cùng lúc trên nhiều thiết bị (PC, Mobile, Tablet) mà không bị out.
                          </p>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                          <GlobeAltIcon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-zinc-900 text-xs">Sử Dụng Trực Tiếp</h5>
                            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">Chính Chủ</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">
                            Đăng nhập trực tiếp, không cần cài extension hay phần mềm trung gian.
                          </p>
                        </div>
                      </div>

                      <div className="py-2.5 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                          <ShieldCheckIcon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-zinc-900 text-xs">Bảo Hành Trọn Thời Gian</h5>
                            <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded">1-Đổi-1</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 leading-relaxed">
                            Hỗ trợ kỹ thuật 24/7 và cam kết đổi mới tức thì nếu phát sinh sự cố trong suốt chu kỳ sử dụng.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Custom Bot & Backtest Programming (Seamless Clean Flow) */}
                {activeTab === "bot" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* macOS IDE Code Studio Window Simulation */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 space-y-3 text-xs text-zinc-300 font-mono">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
                        <div className="flex items-center gap-2">
                          {/* macOS Window Controls */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                          </div>
                          <span className="text-zinc-600">|</span>
                          <CommandLineIcon className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-zinc-200 font-medium">wyckoff_box_strategy.pine</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-sans font-semibold">
                          PineScript v5 ✓
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] leading-relaxed overflow-x-auto">
                        <div className="flex gap-3">
                          <span className="text-zinc-600 select-none w-4 text-right">1</span>
                          <span><span className="text-purple-400">//@version=5</span></span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-zinc-600 select-none w-4 text-right">2</span>
                          <span><span className="text-blue-400">strategy</span>(<span className="text-emerald-300">&quot;Wyckoff Box Strategy&quot;</span>, overlay=<span className="text-amber-300">true</span>)</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-zinc-600 select-none w-4 text-right">3</span>
                          <span className="text-zinc-500">// Wyckoff Accumulation &amp; Breakout Box</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-zinc-600 select-none w-4 text-right">4</span>
                          <span>box_high = ta.highest(high, <span className="text-amber-300">20</span>)[<span className="text-amber-300">1</span>]</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-zinc-600 select-none w-4 text-right">5</span>
                          <span><span className="text-blue-400">if</span> (ta.crossover(close, box_high) <span className="text-blue-400">and</span> volume &gt; ta.sma(volume, <span className="text-amber-300">20</span>))</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-zinc-600 select-none w-4 text-right">6</span>
                          <span className="pl-4"><span className="text-blue-400">strategy.entry</span>(<span className="text-emerald-300">&quot;Wyckoff SOS Long&quot;</span>, strategy.long)</span>
                        </div>
                      </div>
                    </div>

                    {/* Seamless Backtest Metrics & Equity Curve - No Inner Card Boxes */}
                    <div className="pt-3 border-t border-zinc-100 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-900">Hiệu Suất Backtest Chiến Lược</span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          +184.2% Net Profit
                        </span>
                      </div>

                      {/* SVG Sparkline Lợi Nhuận / Equity Curve */}
                      <div className="h-8 w-full">
                        <svg className="w-full h-full" viewBox="0 0 300 35" fill="none" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="profitGradientSeamless" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 30 Q 30 27, 60 23 T 120 18 T 180 12 T 240 7 T 300 2 L 300 35 L 0 35 Z"
                            fill="url(#profitGradientSeamless)"
                          />
                          <path
                            d="M 0 30 Q 30 27, 60 23 T 120 18 T 180 12 T 240 7 T 300 2"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {/* Seamless Stat Grid without Border Boxes */}
                      <div className="grid grid-cols-4 gap-2 pt-1 text-center border-t border-zinc-100/80">
                        <div>
                          <div className="text-zinc-500 text-[10px]">Win Rate</div>
                          <div className="font-bold text-emerald-600 mt-0.5 text-xs sm:text-sm">62.5%</div>
                        </div>
                        <div>
                          <div className="text-zinc-500 text-[10px]">Tỉ Lệ R : R</div>
                          <div className="font-bold text-indigo-600 mt-0.5 text-xs sm:text-sm">1 : 3</div>
                        </div>
                        <div>
                          <div className="text-zinc-500 text-[10px]">Tổng Lệnh</div>
                          <div className="font-bold text-zinc-900 mt-0.5 text-xs sm:text-sm">1,350</div>
                        </div>
                        <div>
                          <div className="text-zinc-500 text-[10px]">Max DD</div>
                          <div className="font-bold text-rose-600 mt-0.5 text-xs sm:text-sm">12.6%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Text & Content */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
              Hoàn thiện Và Tối Ưu Hệ Thống Giao Dịch Cá Nhân
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Cung cấp tài khoản TradingView giá rẻ, cùng dịch vụ lập trình chỉ báo, bot backtest và tự động hóa giao dịch theo yêu cầu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <div className="pt-2 flex justify-center lg:justify-start">
              <Link href="/login">
                <Button variant="primary" size="md">
                  <span>Khám Phá Dịch Vụ</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
