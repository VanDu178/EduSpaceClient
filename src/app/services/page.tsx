"use client";

import React, { useState } from "react";
import { ServiceCard } from "@/features/services";
import { SearchBar } from "@/components/common";
import {
  CpuChipIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  CommandLineIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    {
      id: "bot-review-consulting",
      title: "Tư vấn & Audit Trading Bot",
      description: "Đánh giá hiệu năng, kiểm tra lỗ hổng logic, tối ưu hóa quy trình kết nối API giao dịch và quản trị rủi ro tự động.",
      icon: CpuChipIcon,
      price: "Tư vấn theo yêu cầu",
      badge: "PHỔ BIẾN NHẤT",
      popular: true,
      features: [
        "Audit mã nguồn Python / PineScript v5 / C#",
        "Tối ưu độ trễ Latency & xử lý lỗi mất kết nối API",
        "Tư vấn quản trị rủi ro & Drawdown Control",
        "Báo cáo chi tiết & khuyến nghị nâng cấp",
      ],
      actionText: "Đăng ký tư vấn ngay",
      actionHref: "#contact-form",
    },
    {
      id: "quant-mentorship-1on1",
      title: "1-on-1 Mentorship Quant Trading",
      description: "Lộ trình đào tạo cá nhân hóa 1-on-1 cùng chuyên gia lập trình tài chính & xây dựng chiến lược định lượng từ cơ bản đến nâng cao.",
      icon: UserGroupIcon,
      price: "Đăng ký theo khóa",
      badge: "ĐÀO TẠO 1-1",
      popular: false,
      features: [
        "Lộ trình học riêng biệt theo mục tiêu cá nhân",
        "Thực hành phát triển thuật toán trên dữ liệu thật",
        "Hỗ trợ giải đáp & Peer Review trực tiếp",
        "Cung cấp bộ Template & Mã nguồn thực chiến",
      ],
      actionText: "Tìm hiểu lộ trình",
      actionHref: "#contact-form",
    },
    {
      id: "custom-indicator-bot",
      title: "Lập trình Chỉ báo & Trading Bot theo yêu cầu",
      description: "Phát triển các chiến lược tự động hóa hoàn chỉnh trên TradingView (PineScript), MetaTrader (MQL5) hoặc Python System.",
      icon: AdjustmentsHorizontalIcon,
      price: "Báo giá theo Scope",
      badge: "GIA CÔNG THUẬT TOÁN",
      popular: false,
      features: [
        "Chuyển đổi ý tưởng giao dịch thành thuật toán mã hóa",
        "Tích hợp Webhook cảnh báo về Telegram / Discord",
        "Lập trình Bot tự động khớp lệnh sàn CEX / DEX",
        "Bảo hành & Hỗ trợ bảo trì kỹ thuật",
      ],
      actionText: "Gửi yêu cầu gia công",
      actionHref: "#contact-form",
    },
    {
      id: "backtest-framework-setup",
      title: "Xây dựng Framework Backtest Chuyên nghiệp",
      description: "Thiết kế hạ tầng backtest dữ liệu lớn (Tick Data/OHLCV), mô phỏng trượt giá Slippage và Phí giao dịch sàn thực tế.",
      icon: CommandLineIcon,
      price: "Tư vấn Doanh nghiệp",
      badge: "HẠ TẦNG QUANT",
      popular: false,
      features: [
        "Xử lý dữ liệu nến thô cỡ GB với Polars & DuckDB",
        "Đo lường chỉ số Sharpe, Sortino, Calmar, Max Drawdown",
        "Kiểm thử Monte Carlo Simulation chống Overfitting",
        "Đóng gói Docker Container sẵn sàng deploy",
      ],
      actionText: "Tư vấn xây dựng",
      actionHref: "#contact-form",
    },
    {
      id: "financial-data-pipeline",
      title: "Xử lý & Cung cấp Dữ liệu Chuỗi Thời gian",
      description: "Thu thập, làm sạch và chuẩn hóa dữ liệu tài chính Order Book, Liquidations, Funding Rate thời gian thực từ nhiều sàn giao dịch.",
      icon: CircleStackIcon,
      price: "Gói Dữ liệu",
      badge: "DATA PIPELINE",
      popular: false,
      features: [
        "Kết nối API WebSocket/RESTful tốc độ cực cao",
        "Lưu trữ dữ liệu tối ưu hóa thời gian thực bằng QuestDB/InfluxDB",
        "Làm sạch dữ liệu thiếu (Gap filling) & loại bỏ Outliers",
        "API xuất dữ liệu định dạng Parquet/CSV dễ dàng",
      ],
      actionText: "Đăng ký nhận Data",
      actionHref: "#contact-form",
    },
    {
      id: "risk-audit-hedging",
      title: "Tư vấn Quản trị Rủi ro & Chiến lược Hedging",
      description: "Xây dựng thuật toán phòng hộ danh mục (Portfolio Hedging), tính toán tỷ lệ đòn bẩy an toàn và quản lý rủi ro thanh khoản.",
      icon: ShieldCheckIcon,
      price: "Giải pháp doanh nghiệp",
      badge: "RISK CONTROL",
      popular: false,
      features: [
        "Mô hình hóa Value at Risk (VaR) & Expected Shortfall",
        "Chiến lược Hedging Delta-Neutral & Options",
        "Tự động ngắt kết nối (Kill Switch) khi vi phạm rủi ro",
        "Theo dõi danh mục đa tài sản trên Dashboard",
      ],
      actionText: "Tư vấn Quản trị Rủi ro",
      actionHref: "#contact-form",
    },
  ];

  const filteredServices = services.filter((svc) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      svc.title.toLowerCase().includes(q) ||
      svc.description.toLowerCase().includes(q) ||
      svc.badge.toLowerCase().includes(q) ||
      svc.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Dịch Vụ Tư Vấn & Giải Pháp <span className="gradient-text">Quant Trading</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          Đồng hành cùng cá nhân và quỹ đầu tư trong việc số hóa ý tưởng giao dịch, kiểm thử thuật toán, tối ưu hạ tầng dữ liệu và đào tạo định lượng thực chiến.
        </p>

        {/* Search Bar */}
        <div className="pt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm dịch vụ theo tên, giải pháp, nhu cầu tư vấn..."
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {filteredServices.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/30">
          <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            Không tìm thấy dịch vụ phù hợp
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Thử tìm kiếm với từ khóa khác như "Audit", "PineScript", "Data", "Hedging"...
          </p>
        </div>
      )}

      {/* CTA / Contact Section */}
      <div
        id="contact-form"
        className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-blue-950/20 relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            Tư Vấn Giải Pháp Tùy Chỉnh
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bạn có kịch bản giao dịch hoặc yêu cầu đặc thù?
          </h2>

          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Hãy gửi ngay bài toán kỹ thuật của bạn. Đội ngũ kỹ sư EduSpace sẽ phân tích tính khả thi, đề xuất kiến trúc phù hợp và phản hồi giải pháp tối ưu nhất trong vòng 24 giờ.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@eduspace.vn"
              className="w-full sm:w-auto"
            >
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Gửi yêu cầu qua Email
              </Button>
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Trao đổi nhanh qua Telegram
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
