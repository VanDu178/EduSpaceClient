"use client";

import React, { useState } from "react";
import { Button, Checkbox, Slider, Layout, Tag, Select, Drawer } from "antd";
import {
  AcademicCapIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts";

const { Sider, Content } = Layout;

export default function CoursesPage() {
  const { theme } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const courses = [
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
      title: "Ant Design 5 & Tailwind CSS Enterprise Design System",
      category: "UI/UX & Frontend",
      difficulty: "Cơ bản",
      banner: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
      originalPrice: 1490000,
      discountedPrice: 890000,
      roadmap: [
        "Xây dựng Token Theme Custom trong Antd ConfigProvider",
        "Tích hợp Tailwind CSS utilities mà không bị xung đột CSS",
        "Xây dựng thư viện Component tái sử dụng cao cho SaaS",
      ],
      students: 980,
      rating: 4.8,
      hours: "28 giờ học",
    },
    {
      id: "c3",
      title: "Go (Golang) Microservices & gRPC High Performance Backend",
      category: "Backend & Cloud",
      difficulty: "Nâng cao",
      banner: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop",
      originalPrice: 2990000,
      discountedPrice: 1990000,
      roadmap: [
        "Xây dựng Microservices chuẩn RESTful & gRPC với Go",
        "Xử lý Concurrent Goroutines & Channel tối ưu",
        "Triển khai Docker, Kubernetes & CI/CD Pipeline",
      ],
      students: 740,
      rating: 5.0,
      hours: "50 giờ học",
    },
    {
      id: "c4",
      title: "React 19 & TypeScript Production Testing Guide",
      category: "Frontend & Fullstack",
      difficulty: "Cơ bản",
      banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      originalPrice: 1290000,
      discountedPrice: 690000,
      roadmap: [
        "TypeScript Strict Mode & Generic Pattern nâng cao",
        "Unit testing với Vitest, React Testing Library",
        "End-to-End Testing với Playwright",
      ],
      students: 620,
      rating: 4.7,
      hours: "22 giờ học",
    },
  ];

  const categories = ["Frontend & Fullstack", "Backend & Cloud", "UI/UX & Frontend"];
  const difficulties = ["Cơ bản", "Nâng cao"];

  const FilterContent = (
    <div className="space-y-6 text-slate-700 dark:text-zinc-300">
      <div>
        <h4 className="text-slate-900 dark:text-white font-semibold mb-3 text-sm uppercase tracking-wider">Danh mục (Category)</h4>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <Checkbox
              key={cat}
              checked={selectedCategories.includes(cat)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, cat]);
                } else {
                  setSelectedCategories(selectedCategories.filter((c) => c !== cat));
                }
              }}
              className="text-slate-700 dark:text-zinc-300 text-sm"
            >
              {cat}
            </Checkbox>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-white/10">
        <h4 className="text-slate-900 dark:text-white font-semibold mb-3 text-sm uppercase tracking-wider">Độ khó (Difficulty)</h4>
        <div className="flex flex-col gap-2.5">
          {difficulties.map((diff) => (
            <Checkbox
              key={diff}
              checked={selectedDifficulties.includes(diff)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDifficulties([...selectedDifficulties, diff]);
                } else {
                  setSelectedDifficulties(selectedDifficulties.filter((d) => d !== diff));
                }
              }}
              className="text-slate-700 dark:text-zinc-300 text-sm"
            >
              {diff}
            </Checkbox>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-white/10">
        <h4 className="text-slate-900 dark:text-white font-semibold mb-3 text-sm uppercase tracking-wider">Khoảng giá (Price)</h4>
        <Slider
          range
          min={0}
          max={3000000}
          step={100000}
          defaultValue={[0, 3000000]}
          onChange={(val) => setPriceRange(val as [number, number])}
          tooltip={{
            formatter: (v) => `${(v || 0).toLocaleString("vi-VN")}₫`,
          }}
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-zinc-400 mt-2">
          <span>{priceRange[0].toLocaleString("vi-VN")}₫</span>
          <span>{priceRange[1].toLocaleString("vi-VN")}₫</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Khóa Học <span className="gradient-text">Kỹ Thuật EduSpace</span>
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-sm">
            Nâng cao năng lực lập trình với các lộ trình bài bản từ Beginner đến Advanced
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex lg:hidden items-center gap-3">
          <Button
            onClick={() => setFilterDrawerOpen(true)}
            icon={<FunnelIcon className="w-4 h-4" />}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-white border-slate-300 dark:border-zinc-700 rounded-xl"
          >
            Bộ lọc
          </Button>
        </div>
      </div>

      <Layout className="bg-transparent gap-8">
        {/* Ant Design Sider Filter (Desktop) */}
        <Sider
          width={280}
          className="hidden lg:block glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 h-fit"
          style={{ background: theme === "dark" ? "rgba(24, 24, 27, 0.65)" : "#ffffff" }}
        >
          <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white font-bold text-base border-b border-slate-200 dark:border-white/10 pb-4">
            <FunnelIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Bộ Lọc Khóa Học</span>
          </div>
          {FilterContent}
        </Sider>

        {/* Mobile Drawer Filter */}
        <Drawer
          title="Bộ lọc tìm kiếm"
          placement="left"
          onClose={() => setFilterDrawerOpen(false)}
          open={filterDrawerOpen}
          styles={{
            header: {
              background: theme === "dark" ? "#18181b" : "#ffffff",
              borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: theme === "dark" ? "#fff" : "#0f172a",
            },
            body: {
              background: theme === "dark" ? "#18181b" : "#ffffff",
              padding: "20px",
            },
          }}
        >
          {FilterContent}
        </Drawer>

        {/* Main Content: Course Cards Grid */}
        <Content className="bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all duration-300"
              >
                <div>
                  {/* Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-zinc-900">
                    <img
                      src={course.banner}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold ${course.difficulty === "Cơ bản"
                            ? "bg-emerald-600 dark:bg-emerald-500/90 text-white"
                            : "bg-purple-600/90 text-white"
                          }`}
                      >
                        {course.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        {course.students} học viên
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
                        <StarIcon className="w-4 h-4 fill-amber-400" />
                        {course.rating}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
                        {course.hours}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    {/* 3 Bullet points Roadmap */}
                    <div className="space-y-2 py-2 border-t border-slate-200 dark:border-white/5">
                      <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                        Lộ trình học nổi bật:
                      </div>
                      {course.roadmap.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                          <CheckCircleIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / Pricing & Enroll CTA */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-200 dark:border-white/10 mt-4">
                  <div>
                    <div className="text-xs text-slate-400 dark:text-zinc-500 line-through">
                      {course.originalPrice.toLocaleString("vi-VN")}₫
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {course.discountedPrice.toLocaleString("vi-VN")}₫
                    </div>
                  </div>

                  <Button
                    type="primary"
                    className="btn-gradient h-11 px-6 !rounded-md font-semibold text-sm border-none"
                  >
                    Đăng ký học
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </div>
  );
}
