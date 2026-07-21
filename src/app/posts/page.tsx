"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClockIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "@/components/common";

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const posts = [
    {
      slug: "building-scalable-saas-nextjs",
      title: "Xây dựng hệ thống SaaS mở rộng với Next.js 15 App Router và Clean Architecture",
      category: "Architecture",
      author: "Phạm Văn Dự",
      readTime: "8 phút đọc",
      date: "20 Tháng 7, 2026",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      excerpt: "Tìm hiểu kiến trúc chuẩn mực để tổ chức thư mục, phân chia UI Components, API Clients và State Contexts trong quy mô doanh nghiệp lớn.",
    },
    {
      slug: "mastering-antd-tailwind",
      title: "Kỹ thuật kết hợp Ant Design 5 và Tailwind CSS cho giao diện SaaS hiện đại",
      category: "Frontend UI",
      author: "EduSpace Team",
      readTime: "6 phút đọc",
      date: "18 Tháng 7, 2026",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
      excerpt: "Tối ưu token theme trong Antd ConfigProvider kết hợp với utility classes của Tailwind để tạo Dark Mode mượt mà không bị conflict CSS.",
    },
    {
      slug: "microservices-go-grpc",
      title: "Triển khai Microservices hiệu năng cao với Go, gRPC và Docker Container",
      category: "Backend & DevOps",
      author: "Nguyễn Văn A",
      readTime: "12 phút đọc",
      date: "15 Tháng 7, 2026",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop",
      excerpt: "Bắt đầu với kiến trúc microservices thông qua giao thức gRPC tốc độ cao, quản lý các container service thông qua Kubernetes đơn giản.",
    },
  ];

  const filteredPosts = posts.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Thư Viện Bài Viết <span className="gradient-text">Kỹ Thuật EduSpace</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed">
          Tổng hợp kiến thức thực chiến về Next.js, Microservices, UI/UX Design System và DevOps dành cho kỹ sư phần mềm chuyên nghiệp.
        </p>

        {/* Search Bar */}
        <div className="pt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm bài viết theo tiêu đề, chuyên mục, nội dung..."
          />
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((item) => (
            <Link key={item.slug} href={`/posts/${item.slug}`} className="group">
              <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30">
                <div className="relative h-52 w-full overflow-hidden bg-slate-200 dark:bg-zinc-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/70 dark:bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 mb-2">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-400" />
                        {item.readTime}
                      </span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    Đọc chi tiết <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/30">
          <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-slate-400 dark:text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            Không tìm thấy bài viết phù hợp
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Thử tìm kiếm với từ khóa khác như "Next.js", "Antd", "Microservices"...
          </p>
        </div>
      )}
    </div>
  );
}
