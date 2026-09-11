"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/common";
import {
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export function SignalsSection() {
  return (
    <section id="signals" className="w-full bg-slate-50/70 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text & Content */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
              Market Bias & <span className="text-primary">Tín Hiệu Giao Dịch</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Cung cấp nhận định bias thị trường đầu ngày, các kịch bản giao dịch và tín hiệu giao dịch chất lượng cao dành cho hội viên.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          >
            <div className="pt-2 flex justify-center lg:justify-start">
              <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                >
                  Tham Gia Hội Viên Ngay
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Illustration Box (Pure Flat VIP Trade Signal Card) */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-xs">
              {/* Header: Signal Title & Live Status */}
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <ChartBarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-zinc-900">Daily Market Signal</h4>
                    </div>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <ClockIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Cập nhật 08:00 AM • Phiên Á-Âu</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Asset & Signal Action Row */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">Loại Hàng Hóa</span>
                  <div className="text-lg sm:text-xl font-bold text-zinc-900 flex items-center gap-2 mt-0.5">
                    <span>XAUUSD</span>
                    <span className="text-xs font-normal text-zinc-500">(Gold Spot)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold font-mono shrink-0">
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                  <span>BUY SETUP</span>
                </div>
              </div>

              {/* Pure Flat Metrics Row: Entry / TP / SL (Strictly Aligned Grid) */}
              <div className="pt-4 border-t border-zinc-100 grid grid-cols-3 gap-2 sm:gap-4 items-start">
                {/* Entry Zone */}
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block truncate">
                    Vùng Mua
                  </span>
                  <div className="text-xs sm:text-base font-bold text-zinc-900 font-mono mt-1 whitespace-nowrap">
                    2,645 - 2,648
                  </div>
                </div>

                {/* Take Profit */}
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block truncate">
                    Điểm TP
                  </span>
                  <div className="text-xs sm:text-base font-bold text-emerald-600 font-mono mt-1 whitespace-nowrap">
                    2,665.00
                  </div>
                </div>

                {/* Stop Loss */}
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-rose-600 uppercase tracking-wider block truncate">
                    Điểm SL
                  </span>
                  <div className="text-xs sm:text-base font-bold text-rose-600 font-mono mt-1 whitespace-nowrap">
                    2,638.00
                  </div>
                </div>
              </div>

              {/* Flat Risk Warning Line (Zero Background Box) */}
              <div className="pt-3.5 border-t border-zinc-100 flex items-start gap-2 text-xs text-zinc-500 leading-relaxed">
                <ExclamationTriangleIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="font-semibold text-zinc-700">Cảnh báo rủi ro:</strong> Tín hiệu mang tính chất phân tích kỹ thuật tham khảo. Luôn tuân thủ kỷ luật quản lý vốn 1-2% tài khoản.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

