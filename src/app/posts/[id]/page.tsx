"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, Input, Tag, message } from "antd";
import { Button } from "@/components/common";
import {
  CalendarIcon,
  ClockIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ShareIcon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

export default function PostDetailPage() {
  const params = useParams();
  const id = (params.id as string) || (params.slug as string) || "building-scalable-saas-nextjs";

  const [messageApi, contextHolder] = message.useMessage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");

  const postsCatalog: Record<
    string,
    {
      title: string;
      category: string;
      readTime: string;
      date: string;
      author: {
        name: string;
        role: string;
        avatar: string;
      };
      banner: string;
      content: {
        intro: string;
        sections: {
          id: string;
          heading: string;
          body: string;
          code?: {
            fileName: string;
            language: string;
            snippet: string;
          };
          quote?: string;
        }[];
      };
    }
  > = {
    "building-scalable-saas-nextjs": {
      title: "Xây dựng hệ thống SaaS mở rộng với Next.js 15 App Router và Clean Architecture",
      category: "Architecture & Quant Systems",
      readTime: "8 phút đọc",
      date: "20 Tháng 7, 2026",
      author: {
        name: "Phạm Văn Dự",
        role: "Trưởng nhóm Kiến trúc Phần mềm & Quantitative Systems",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      },
      banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      content: {
        intro:
          "Trong bối cảnh phát triển ứng dụng Web SaaS & Trading Platform hiện đại, việc duy trì một cấu trúc mã nguồn sạch sẽ (Clean Architecture) và khả năng xử lý dữ liệu thời gian thực là yếu tố quyết định. Next.js 15 với App Router nâng cấp cung cấp cơ chế Server Components mạnh mẽ giúp tối ưu hóa hiệu năng và khả năng mở rộng vượt trội.",
        sections: [
          {
            id: "structure",
            heading: "1. Cấu trúc tổ chức thư mục chuẩn theo Feature-based Modules",
            body: "Đối với hệ thống EduSpace, chúng tôi tuân thủ nguyên tắc mô-đun hóa tính năng (Feature-based Modular Structure). Mỗi feature bao gồm components, hooks, services và types riêng biệt nhằm tách biệt hoàn toàn phạm vi xử lý và tránh phình to mã nguồn:",
            code: {
              fileName: "src/features/posts/services/postService.ts",
              language: "TypeScript",
              snippet: `// Modular API Service for Posts Feature
import api from "@/services/api";
import type { Post } from "../types";

export async function getPostById(id: string): Promise<Post> {
  const response = await api.get<Post>(\`/v1/posts/\${id}\`);
  return response.data;
}

export async function fetchRelatedPosts(category: string): Promise<Post[]> {
  const response = await api.get<Post[]>("/v1/posts/related", {
    params: { category },
  });
  return response.data;
}`,
            },
          },
          {
            id: "antd-tailwind",
            heading: "2. Tối ưu kết hợp Ant Design 5 & Tailwind CSS",
            body: "Ant Design đóng vai trò cung cấp các UI Control phức tạp như Form Validation, Modal, Sider, Slider và Table. Trong khi đó, Tailwind CSS đảm nhận phần bố cục Layout, các biến màu sắc Dark Mode và hiệu ứng Glassmorphism.",
            quote:
              "Việc đồng bộ Token Theme trong ConfigProvider của Antd giúp các popup UI tự động chuyển đổi giao diện mượt mà theo Dark Mode của hệ thống mà không gây ra hiện tượng xung đột CSS Class.",
          },
          {
            id: "realtime-websocket",
            heading: "3. Tích hợp dữ liệu chuỗi thời gian & WebSocket",
            body: "Đối với ứng dụng Quant Trading, luồng dữ liệu giá và chỉ báo cần được cập nhật liên tục thông qua kết nối WebSocket song song với API RESTful. Việc bao bọc WebSocket Context ở cấp root giúp các component con lắng nghe sự thay đổi giá chỉ trong vài mili-giây.",
          },
        ],
      },
    },
  };

  const currentPost = postsCatalog[id] || postsCatalog["building-scalable-saas-nextjs"];

  const relatedPosts = [
    {
      slug: "mastering-antd-tailwind",
      title: "Kỹ thuật kết hợp Ant Design 5 và Tailwind CSS cho giao diện SaaS hiện đại",
      category: "Frontend UI",
      readTime: "6 phút đọc",
    },
    {
      slug: "microservices-go-grpc",
      title: "Triển khai Microservices hiệu năng cao với Go, gRPC và Docker Container",
      category: "Backend & DevOps",
      readTime: "12 phút đọc",
    },
  ];

  const mockComments = [
    {
      id: "c1",
      user: "Đặng Hoàng Nam",
      time: "1 ngày trước",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      content: "Bài viết phân tích kiến trúc rất sắc bén! Việc chia theo Feature-based thực sự giúp dự án lớn dễ bảo trì hơn nhiều.",
    },
    {
      id: "c2",
      user: "Vũ Thanh Hằng",
      time: "2 ngày trước",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      content: "Hy vọng tác giả ra thêm bài hướng dẫn chi tiết cách viết WebSocket Interceptor kết hợp Axios client trong Next 15.",
    },
  ];

  const handleSubscribeNewsletter = () => {
    if (!newsletterEmail.trim()) {
      messageApi.error("Vui lòng nhập địa chỉ email!");
      return;
    }
    messageApi.success("Cảm ơn bạn đã đăng ký nhận bản tin kỹ thuật EduSpace!");
    setNewsletterEmail("");
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
    messageApi.success(isSaved ? "Đã bỏ lưu bài viết!" : "Đã lưu bài viết vào danh sách đánh dấu!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    messageApi.success("Đã sao chép liên kết bài viết!");
  };

  const handleAddComment = () => {
    if (!commentText.trim()) {
      messageApi.error("Vui lòng nhập nội dung bình luận!");
      return;
    }
    messageApi.success("Bình luận của bạn đã gửi thành công!");
    setCommentText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {contextHolder}
      {/* Back button */}
      <div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Quay lại danh sách bài viết</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Reading Area (8 cols) */}
        <main className="lg:col-span-8 space-y-8">
          {/* Post Header */}
          <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Tag color="blue" className="rounded-full px-3 py-0.5 text-xs font-semibold border-none">
                {currentPost.category}
              </Tag>
              <span className="text-slate-400 dark:text-zinc-500">•</span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                {currentPost.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {currentPost.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-3">
                <Avatar
                  size={46}
                  src={currentPost.author.avatar}
                  className="border-2 border-blue-500 shrink-0"
                />
                <div>
                  <div className="text-slate-900 dark:text-white font-bold text-sm flex items-center gap-1.5">
                    {currentPost.author.name}
                    <CheckCircleIcon className="w-4 h-4 text-blue-500 inline-block" />
                  </div>
                  <div className="text-slate-500 dark:text-zinc-400 text-xs flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" /> {currentPost.date}
                    </span>
                    <span>•</span>
                    <span>{currentPost.author.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSavePost}
                  className="!rounded-xl flex items-center gap-1.5"
                >
                  <BookmarkIcon className={`w-4 h-4 ${isSaved ? "text-amber-500 fill-amber-500" : ""}`} />
                  <span>{isSaved ? "Đã lưu" : "Lưu bài"}</span>
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
              </div>
            </div>
          </header>

          {/* Post Banner Image */}
          <div className="rounded-3xl overflow-hidden h-72 sm:h-96 w-full relative border border-slate-200 dark:border-white/10 bg-slate-900">
            <img
              src={currentPost.banner}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Body Content */}
          <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-zinc-300 space-y-6 leading-relaxed text-base">
            <p className="text-base sm:text-lg text-slate-800 dark:text-zinc-200 font-medium leading-relaxed">
              {currentPost.content.intro}
            </p>

            {currentPost.content.sections.map((section) => (
              <div key={section.id} id={section.id} className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight border-l-4 border-blue-500 pl-4">
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base">{section.body}</p>

                {section.code && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 text-zinc-100 p-5 font-mono text-xs sm:text-sm leading-6">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-700 text-xs text-zinc-400">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                        <span className="ml-2 text-zinc-300 font-sans">{section.code.fileName}</span>
                      </span>
                      <span>{section.code.language}</span>
                    </div>
                    <pre className="overflow-x-auto">
                      <code>{section.code.snippet}</code>
                    </pre>
                  </div>
                )}

                {section.quote && (
                  <blockquote className="border-l-4 border-blue-500 pl-4 py-3 my-6 text-slate-700 dark:text-zinc-300 italic bg-slate-100 dark:bg-white/5 rounded-r-xl pr-4 text-sm sm:text-base">
                    "{section.quote}"
                  </blockquote>
                )}
              </div>
            ))}
          </article>

          {/* Download Resources Widget inside Post */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Tài liệu & Mã nguồn đính kèm bài viết
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                Bao gồm mã nguồn Clean Architecture mẫu và cấu hình Docker Compose sẵn sàng chạy.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => message.success("Đã bắt đầu tải file tài liệu kiến trúc (.zip)")}
              className="btn-gradient border-none shrink-0 flex items-center gap-1.5"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>Tải file .ZIP</span>
            </Button>
          </div>

          {/* Comment Section */}
          <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Thảo luận bài viết ({mockComments.length})
              </h3>
            </div>

            {/* Input comment */}
            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
              <Input.TextArea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Chia sẻ góc nhìn hoặc câu hỏi của bạn về bài viết..."
                className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 !text-sm !rounded-xl"
              />
              <div className="flex justify-end">
                <Button variant="primary" size="sm" onClick={handleAddComment} className="btn-gradient border-none">
                  Gửi bình luận
                </Button>
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div
                  key={comment.id}
                  className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex gap-4"
                >
                  <Avatar size={40} src={comment.avatar} className="border border-blue-500/30 shrink-0" />
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
          </section>
        </main>

        {/* Sidebar Area (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Table of Contents Widget */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3 flex items-center gap-2">
              <ListBulletIcon className="w-5 h-5 text-blue-500" />
              Mục lục nội dung
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
              {currentPost.content.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Posts Widget */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
              Bài viết cùng chủ đề
            </h3>
            <div className="space-y-4">
              {relatedPosts.map((rel, idx) => (
                <Link
                  key={idx}
                  href={`/posts/${rel.slug}`}
                  className="block group p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">{rel.category}</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {rel.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-2">{rel.readTime}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
              <PaperAirplaneIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Bản tin Kỹ thuật EduSpace</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Nhận tổng hợp bài viết kỹ thuật chọn lọc và mẹo phát triển hệ thống SaaS vào thứ Hai hằng tuần.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Input
                placeholder="Nhập email của bạn..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white dark:bg-zinc-900/90 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 !text-xs !rounded-lg h-9"
              />
              <Button
                onClick={handleSubscribeNewsletter}
                variant="primary"
                size="sm"
                className="btn-gradient w-full h-9 !rounded-lg font-semibold text-xs border-none"
              >
                Đăng ký nhận bài
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
