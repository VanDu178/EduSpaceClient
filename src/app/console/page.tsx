"use client";

import { useState } from "react";
import { Tabs } from "antd";
import {
  BookmarkIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import {
  ConsoleHeader,
  SavedSection,
  PurchasedCoursesSection,
  UsedServicesSection,
  PaymentHistorySection,
  SavedPost,
  SavedVideo,
  PurchasedCourse,
  UsedService,
  PaymentTransaction,
} from "@/features/console";

// Mock data tailored for Quant Trading & Finance Platform
const INITIAL_SAVED_POSTS: SavedPost[] = [
  {
    id: "sp-1",
    title: "Xây dựng thuật toán Mean-Reversion với Python & TA-Lib",
    summary: "Hướng dẫn từng bước thiết lập chiến lược giao dịch đảo chiều về giá trị trung bình áp dụng Bollinger Bands & RSI trên dữ liệu VN30.",
    category: "Quantitative Trading",
    author: "Dr. Hoàng Minh",
    authorAvatar: "/images/avatars/avatar1.png",
    savedAt: "2026-07-20",
    readTime: "8 phút đọc",
    slug: "mean-reversion-python-talib",
  },
  {
    id: "sp-2",
    title: "Quản trị rủi ro danh mục bằng mô hình Value at Risk (VaR) & Monte Carlo",
    summary: "Phân tích phương pháp mô phỏng Monte Carlo để tính toán mức rủi ro tối đa của danh mục đầu tư tiền mã hóa và chứng khoán.",
    category: "Risk Management",
    author: "Lê Quốc Bảo",
    authorAvatar: "/images/avatars/avatar2.png",
    savedAt: "2026-07-18",
    readTime: "12 phút đọc",
    slug: "risk-management-var-monte-carlo",
  },
  {
    id: "sp-3",
    title: "Tối ưu hóa chiến lược Order Flow & Market Depth trong Day Trading",
    summary: "Cách khai thác sổ lệnh (Order Book) và Footprint Chart để xác định dấu vết vùng tích lũy của nhà đầu tư tổ chức.",
    category: "Technical Analysis",
    author: "Nguyễn Thành Nam",
    authorAvatar: "/images/avatars/avatar3.png",
    savedAt: "2026-07-15",
    readTime: "10 phút đọc",
    slug: "order-flow-market-depth-day-trading",
  },
];

const INITIAL_SAVED_VIDEOS: SavedVideo[] = [
  {
    id: "sv-1",
    title: "Live Coding: Lập trình Bot Trading kết nối API Binance với Node.js & WebSockets",
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=60",
    category: "Bot Development",
    duration: "45:20",
    instructor: "Phạm Văn Trí",
    savedAt: "2026-07-19",
    views: 14200,
    slug: "live-coding-bot-trading-binance-api",
  },
  {
    id: "sv-2",
    title: "Phân tích liên thị trường (Intermarket Analysis): Mối tương quan Trái phiếu, Hàng hóa & Cổ phiếu",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
    category: "Macro Economics",
    duration: "32:15",
    instructor: "ThS. Trần Đức",
    savedAt: "2026-07-12",
    views: 8900,
    slug: "intermarket-analysis-bonds-commodities-stocks",
  },
];

const INITIAL_PURCHASED_COURSES: PurchasedCourse[] = [
  {
    id: "pc-1",
    title: "Nền Tảng Quant Trading & Python Cho Nhà Đầu Tư",
    category: "Quantitative Trading",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    instructor: "Dr. Hoàng Minh & EduSpace Team",
    progress: 75,
    completedLessons: 18,
    totalLessons: 24,
    lastAccessed: "Hôm qua",
    purchasedDate: "10/05/2026",
    nextLessonTitle: "Bài 19: Backtesting Chiến lược với Thư viện Backtrader",
    slug: "quant-trading-python-foundation",
  },
  {
    id: "pc-2",
    title: "Quản Trị Rủi Ro & Thiết Kế Hệ Thống Giao Dịch Tự Động",
    category: "Algorithmic Systems",
    thumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=60",
    instructor: "Lê Quốc Bảo",
    progress: 40,
    completedLessons: 8,
    totalLessons: 20,
    lastAccessed: "3 ngày trước",
    purchasedDate: "01/06/2026",
    nextLessonTitle: "Bài 9: Mô hình quản lý vốn Kelly Criterion & Optimal f",
    slug: "risk-management-algo-systems",
  },
];

const INITIAL_USED_SERVICES: UsedService[] = [
  {
    id: "us-1",
    serviceName: "Tư vấn & Kiểm định Thuật toán Quant (Code Audit)",
    packageName: "Gói Chuyên Nghiệp (Professional)",
    status: "active",
    startDate: "01/07/2026",
    expiryDate: "01/10/2026",
    mentor: "Dr. Hoàng Minh",
    supportChannel: "Kênh Telegram Riêng 1-1",
    notes: "Kiểm tra lỗi Overfitting, Look-ahead Bias và tối ưu hóa tốc độ thực thi chiến lược giao dịch tự động.",
  },
  {
    id: "us-2",
    serviceName: "Mentorship 1-on-1 Trading Đa Tài Sản",
    packageName: "Gói 1 Tháng (Monthly Intensive)",
    status: "completed",
    startDate: "01/05/2026",
    expiryDate: "01/06/2026",
    mentor: "Lê Quốc Bảo",
    supportChannel: "Kênh Google Meet Hàng Tuần",
    notes: "Đã hoàn thành 4 buổi coaching trực tiếp về tâm lý chiến thuật và tối ưu hóa hệ thống Order Flow.",
  },
];

const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "tx-101",
    transactionCode: "EDU-892104",
    itemName: "Gói Tư vấn & Kiểm định Thuật toán Quant (Professional)",
    itemType: "Service",
    amount: 4500000,
    paymentMethod: "VNPay",
    paymentDate: "01/07/2026 14:32",
    status: "success",
  },
  {
    id: "tx-102",
    transactionCode: "EDU-774129",
    itemName: "Khóa học: Quản Trị Rủi Ro & Thiết Kế Hệ Thống Giao Dịch",
    itemType: "Course",
    amount: 2990000,
    paymentMethod: "Momo",
    paymentDate: "01/06/2026 09:15",
    status: "success",
  },
  {
    id: "tx-103",
    transactionCode: "EDU-653912",
    itemName: "Khóa học: Nền Tảng Quant Trading & Python Cho Nhà Đầu Tư",
    itemType: "Course",
    amount: 3490000,
    paymentMethod: "Bank Transfer",
    paymentDate: "10/05/2026 18:45",
    status: "success",
  },
];

export default function ConsolePage() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>(INITIAL_SAVED_POSTS);
  const [savedVideos, setSavedVideos] = useState<SavedVideo[]>(INITIAL_SAVED_VIDEOS);
  const [purchasedCourses] = useState<PurchasedCourse[]>(INITIAL_PURCHASED_COURSES);
  const [usedServices] = useState<UsedService[]>(INITIAL_USED_SERVICES);
  const [transactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);

  const handleRemovePost = (id: string) => {
    setSavedPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRemoveVideo = (id: string) => {
    setSavedVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const tabItems = [
    {
      key: "saved",
      label: (
        <span className="flex items-center gap-2 px-1 py-1 text-sm font-semibold">
          <BookmarkIcon className="w-4 h-4 text-indigo-500" />
          Mục đã lưu ({savedPosts.length + savedVideos.length})
        </span>
      ),
      children: (
        <SavedSection
          savedPosts={savedPosts}
          savedVideos={savedVideos}
          onRemovePost={handleRemovePost}
          onRemoveVideo={handleRemoveVideo}
        />
      ),
    },
    {
      key: "courses",
      label: (
        <span className="flex items-center gap-2 px-1 py-1 text-sm font-semibold">
          <AcademicCapIcon className="w-4 h-4 text-blue-500" />
          Khóa học đã mua ({purchasedCourses.length})
        </span>
      ),
      children: <PurchasedCoursesSection courses={purchasedCourses} />,
    },
    {
      key: "services",
      label: (
        <span className="flex items-center gap-2 px-1 py-1 text-sm font-semibold">
          <WrenchScrewdriverIcon className="w-4 h-4 text-amber-500" />
          Dịch vụ đã sử dụng ({usedServices.length})
        </span>
      ),
      children: <UsedServicesSection services={usedServices} />,
    },
    {
      key: "payment",
      label: (
        <span className="flex items-center gap-2 px-1 py-1 text-sm font-semibold">
          <CreditCardIcon className="w-4 h-4 text-emerald-500" />
          Lịch sử thanh toán ({transactions.length})
        </span>
      ),
      children: <PaymentHistorySection transactions={transactions} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-[#0b0c0e] text-slate-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Page Breadcrumb / Navigation indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 mb-6">
          <Squares2X2Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>EduSpace Hub</span>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white">Console Cá Nhân</span>
        </div>

        {/* User Profile Header Card */}
        <ConsoleHeader
          userName="Phạm Văn Trí"
          email="vantri.quant@eduspace.vn"
          savedCount={savedPosts.length + savedVideos.length}
          coursesCount={purchasedCourses.length}
          servicesCount={usedServices.length}
          transactionsCount={transactions.length}
        />

        {/* Main Tabbed Console Section */}
        <div className="bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-6">
          <Tabs
            defaultActiveKey="saved"
            items={tabItems}
            className="ant-custom-console-tabs"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
