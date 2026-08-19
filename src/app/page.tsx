"use client";

import Link from "next/link";
import { Tag } from "antd";
import { Button } from "@/components/common/Button";
import { PostCard } from "@/features/posts";
import { VideoCard } from "@/features/videos";
import { ResourceCard } from "@/features/resources";
import { CourseCard, CourseItem } from "@/features/courses";
import { ServiceCard } from "@/features/services";
import {
  PlayIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  CommandLineIcon,
  CpuChipIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const articles = [
    {
      id: "building-algo-trading-python-vectorbt",
      title: "Xây dựng hệ thống Algorithmic Trading đơn giản với Python, VectorBT & Interactive Brokers API",
      category: "Quant Trading",
      readTime: "10 phút đọc",
      date: "20 Tháng 7, 2026",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
      excerpt: "Tìm hiểu kiến trúc backtest độ phân giải cao, quản lý lệnh tự động và tối ưu tham số thuật toán giao dịch theo thời gian thực.",
    },
    {
      id: "risk-management-kelly-criterion",
      title: "Quản lý rủi ro & Ứng dụng công thức Kelly Criterion trong giao dịch định lượng",
      category: "Risk Management",
      readTime: "8 phút đọc",
      date: "18 Tháng 7, 2026",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop",
      excerpt: "Phân tích công thức xác suất tối ưu quy mô vị thế (Position Sizing) nhằm giảm thiểu khả năng cháy tài khoản và tối đa hóa lợi nhuận kỳ vọng.",
    },
    {
      id: "order-flow-smc-data-perspective",
      title: "Phân tích Order Flow & Smart Money Concepts (SMC) dưới góc nhìn dữ liệu định lượng",
      category: "Price Action & Data",
      readTime: "12 phút đọc",
      date: "15 Tháng 7, 2026",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=600&auto=format&fit=crop",
      excerpt: "Giải mã dòng tiền tổ chức thông qua Volume Profile, Liquidity Pools và kết hợp mô hình xác suất thống kê để tăng tỷ lệ thắng Win Rate.",
    },
  ];

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
  ];

  const resources = [
    {
      title: "Kho Code & Template Chiến Lược",
      description: "Thư viện mở lưu trữ các bộ mã nguồn Python Quant, Pine Script v5 và thư viện backtest chiến lược giao dịch hoàn toàn miễn phí.",
      icon: CodeBracketIcon,
      recommended: false,
      badge: "MÃ NGUỒN MỞ",
      features: [
        "Mẫu backtest với VectorBT & Backtrader",
        "Script kết nối API Binance, Bybit, Interactive Brokers",
        "Chỉ báo Pine Script v5 tùy chỉnh nâng cao",
        "Cập nhật & đóng góp liên tục trên GitHub",
      ],
      actionText: "Truy cập Kho Code",
      actionHref: "/posts?category=Quant+Trading",
    },
    {
      title: "Góc Thảo Luận & Peer Review",
      description: "Cộng đồng chia sẻ góc nhìn phân tích thị trường, thảo luận ý tưởng giao dịch và hỗ trợ peer-review thuật toán cùng nhau.",
      icon: CommandLineIcon,
      recommended: true,
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
      actionText: "Đọc bản tin mới nhất",
      actionHref: "/posts",
    },
  ];

  const courses: CourseItem[] = [
    {
      id: "c1",
      title: "Next.js 15 App Router & SaaS Architecture Masterclass",
      category: "Frontend & Fullstack",
      difficulty: "Nâng cao",
      banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      originalPrice: 2490000,
      discountedPrice: 1690000,
      roadmap: [
        "Thiết kế kiến trúc App Router, Clean Code & Server Actions",
        "Tích hợp Stripe Payment & OAuth Authentication",
        "Tối ưu Performance Server Components & SEO Ranking",
      ],
      students: 1250,
      rating: 4.9,
      hours: "42 giờ học",
    },
    {
      id: "c2",
      title: "Python Quant Trading & Backtesting Masterclass",
      category: "Quant Trading",
      difficulty: "Nâng cao",
      banner: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
      originalPrice: 2990000,
      discountedPrice: 1990000,
      roadmap: [
        "Xây dựng khung Backtest độ phân giải cao với VectorBT",
        "Kết nối API sàn giao dịch & Quản lý lệnh tự động",
        "Tối ưu hóa tham số thuật toán & Quản trị Drawdown",
      ],
      students: 980,
      rating: 4.9,
      hours: "48 giờ học",
    },
    {
      id: "c3",
      title: "PineScript v5 & TradingView Strategy Automation",
      category: "PineScript & Automation",
      difficulty: "Cơ bản",
      banner: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=600&auto=format&fit=crop",
      originalPrice: 1490000,
      discountedPrice: 890000,
      roadmap: [
        "Lập trình chỉ báo tùy chỉnh & Mô phỏng chiến lược",
        "Cấu hình Webhook gửi tín hiệu đến Telegram / Discord",
        "Tự động hóa khớp lệnh giao dịch theo thời gian thực",
      ],
      students: 1420,
      rating: 4.8,
      hours: "30 giờ học",
    },
  ];

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
      actionHref: "/services",
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
      actionHref: "/services",
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
      actionHref: "/services",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 bg-white text-zinc-900">
      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-10 lg:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Minimalist Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs sm:text-sm font-medium">
              <SparklesIcon className="w-4 h-4 text-zinc-900" />
              <span>Nền tảng chia sẻ tri thức Trading & Quant Analysis</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
              Cộng Đồng Chia Sẻ Tri Thức <br className="hidden sm:inline" />
              <span className="text-zinc-900 font-extrabold block mt-1">Trading & Quantitative Analysis</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Không gian tổng hợp bài viết kỹ thuật chuyên sâu, phân tích thuật toán giao dịch, hướng dẫn backtesting và chia sẻ góc nhìn thực chiến dành cho Trader & Quant Developer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/posts" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<BookOpenIcon className="w-4 h-4" />}
                  className="w-full sm:w-auto bg-zinc-900 text-white hover:bg-zinc-800 border-0 rounded-lg font-medium"
                >
                  Khám phá bài viết
                </Button>
              </Link>
              <Link href="/videos" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<PlayIcon className="w-4 h-4" />}
                  className="w-full sm:w-auto border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg font-medium"
                >
                  Xem video chia sẻ
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Stats Card Mockup (Minimalist Monochrome) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-7 rounded-2xl relative overflow-hidden border border-zinc-200 transition-colors hover:border-zinc-400">
              <div className="flex items-center justify-between pb-5 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-zinc-900 font-bold text-base m-0">Chỉ số Kho Tri Thức</h3>
                    <p className="text-xs text-zinc-500 m-0">Hệ sinh thái tri thức & tài nguyên mở</p>
                  </div>
                </div>
                <span className="rounded-md bg-zinc-100 border border-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-800 uppercase tracking-wider">
                  CỘNG ĐỒNG
                </span>
              </div>

              {/* Grid of Stats */}
              <div className="grid grid-cols-2 gap-3.5 mt-5">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5 font-medium">
                    <DocumentTextIcon className="w-4 h-4 text-zinc-700" />
                    <span>Bài viết & Phân tích</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-900">150+</div>
                  <div className="text-[11px] text-zinc-600 font-medium mt-1">✓ Chuyên sâu & Thực chiến</div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5 font-medium">
                    <CodeBracketIcon className="w-4 h-4 text-zinc-700" />
                    <span>Code mẫu & Scripts</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-900">50+</div>
                  <div className="text-[11px] text-zinc-600 font-medium mt-1">✓ Python & PineScript</div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5 font-medium">
                    <UserGroupIcon className="w-4 h-4 text-zinc-700" />
                    <span>Độc giả active</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-900">5,200+</div>
                  <div className="text-[11px] text-zinc-500 mt-1">Tham gia đọc & thảo luận</div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5 font-medium">
                    <SparklesIcon className="w-4 h-4 text-zinc-700" />
                    <span>Tài nguyên</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-900">100%</div>
                  <div className="text-[11px] text-zinc-600 font-medium mt-1">Chia sẻ mở & Miễn phí</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-200/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* 2. Bài viết Section (Posts) */}
      <section id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <BookOpenIcon className="w-4 h-4 text-zinc-700" />
              GÓC CHIA SẺ TRI THỨC
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Bài viết & Phân tích mới nhất
            </h2>
          </div>
          <Link href="/posts" className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors underline underline-offset-4 decoration-zinc-300">
            Xem tất cả bài viết <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-200/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* 3. Featured Videos Section */}
      <section id="videos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <PlayIcon className="w-4 h-4 text-zinc-700" />
              VIDEO HƯỚNG DẪN & LIVE BACKTEST
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Video chia sẻ & Trực quan hoá dữ liệu
            </h2>
          </div>
          <Link href="/videos" className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors underline underline-offset-4 decoration-zinc-300">
            Xem tất cả video <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-200/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* 4. Resources & Community Section */}
      <section id="resources" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
            GÓC CỘNG ĐỒNG & CHIA SẺ
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-2.5">
            Tài nguyên & Kết nối
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Khám phá các bộ tài nguyên mở, mã nguồn mẫu và thảo luận chuyên sâu cùng các thành viên có cùng đam mê giao dịch định lượng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {resources.map((res, idx) => (
            <ResourceCard key={idx} resource={res} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-200/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* 5. Courses Section */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <AcademicCapIcon className="w-4 h-4 text-zinc-700" />
              LỘ TRÌNH ĐÀO TẠO CHUYÊN SÂU
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Khóa Học Nổi Bật
            </h2>
          </div>
          <Link href="/courses" className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors underline underline-offset-4 decoration-zinc-300">
            Xem tất cả khóa học <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-200/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

      {/* 6. Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <WrenchScrewdriverIcon className="w-4 h-4 text-zinc-700" />
              DỊCH VỤ CHUYÊN NGHỆP
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Giải pháp & Dịch vụ Tư vấn Quant Trading
            </h2>
          </div>
          <Link href="/services" className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors underline underline-offset-4 decoration-zinc-300">
            Xem tất cả dịch vụ <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </section>
    </div>
  );
}
