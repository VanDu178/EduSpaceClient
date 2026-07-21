"use client";

import React, { useState } from "react";
import { ResourceCard } from "@/features/resources";
import { SearchBar } from "@/components/common";
import {
  CodeBracketIcon,
  CommandLineIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      title: "Kho Code & Template Chiến Lược",
      description: "Thư viện mở lưu trữ các bộ mã nguồn Python Quant, Pine Script v5 và thư viện backtest chiến lược giao dịch hoàn toàn miễn phí.",
      icon: CodeBracketIcon,
      recommended: true,
      badge: "MÃ NGUỒN MỞ",
      features: [
        "Mẫu backtest với VectorBT & Backtrader",
        "Script kết nối API Binance, Bybit, Interactive Brokers",
        "Chỉ báo Pine Script v5 tùy chỉnh nâng cao",
        "Cập nhật & đóng góp liên tục trên GitHub",
      ],
      actionText: "Truy cập Kho Code GitHub",
      actionHref: "https://github.com",
    },
    {
      title: "Góc Thảo Luận & Peer Review",
      description: "Cộng đồng chia sẻ góc nhìn phân tích thị trường, thảo luận ý tưởng giao dịch và hỗ trợ peer-review thuật toán cùng nhau.",
      icon: CommandLineIcon,
      recommended: false,
      badge: "CỘNG ĐỒNG SÔI NỔI",
      features: [
        "Góp ý & kiểm thử ý tưởng trading bot",
        "Phân tích kịch bản thị trường theo tuần",
        "Chia sẻ kinh nghiệm quản trị tâm lý & vốn",
        "Trao đổi kỹ thuật lập trình tài chính",
      ],
      actionText: "Tham gia thảo luận",
      actionHref: "/posts",
    },
    {
      title: "Bản Tin Định Lượng Hàng Tuần",
      description: "Tổng hợp các nghiên cứu tài chính định lượng, dữ liệu thống kê chuỗi thời gian và xu hướng dòng tiền đáng chú ý.",
      icon: DocumentTextIcon,
      recommended: false,
      badge: "TỔNG HỢP HÀNG TUẦN",
      features: [
        "Phân tích tương quan Correlation giữa các tài sản",
        "Báo cáo thống kê biến động Volatility & Drawdown",
        "Cập nhật các mô hình Quant Trading mới",
        "Miễn phí cho toàn bộ độc giả cộng đồng",
      ],
      actionText: "Đăng ký nhận bản tin",
      actionHref: "/posts",
    },
  ];

  const filteredResources = resources.filter((res) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      res.title.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      res.badge.toLowerCase().includes(q) ||
      res.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Kho Tài Nguyên <span className="gradient-text">Quantitative & Algo Trading</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          Truy cập và tải về các bộ mã nguồn mở Python/PineScript, bộ dữ liệu lịch sử backtest, bản tin nghiên cứu định lượng và tài liệu tài chính chuyên sâu.
        </p>

        {/* Search Bar */}
        <div className="pt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm tài nguyên theo tên, mô tả, từ khóa..."
          />
        </div>
      </div>

      {/* Resource Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {filteredResources.map((res, idx) => (
            <ResourceCard key={idx} resource={res} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/30">
          <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            Không tìm thấy tài nguyên phù hợp
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Thử tìm kiếm với từ khóa khác như "GitHub", "Python", "Bản tin"...
          </p>
        </div>
      )}
    </div>
  );
}
