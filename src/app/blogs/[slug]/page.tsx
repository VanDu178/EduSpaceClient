'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Blog, getBlogBySlugApi } from '@/features/blogs';
import { Button } from '@/components/common';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return 'Mới đăng';
  try {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

function getReadTime(content?: string | null, summary?: string | null) {
  const textLength = (content?.length || 0) + (summary?.length || 0);
  const minutes = Math.max(3, Math.ceil(textLength / 400));
  return `${minutes} phút đọc`;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const fetchBlogDetail = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getBlogBySlugApi(slug);
        if (isMounted) {
          setBlog(data);
        }
      } catch (error) {
        console.error('Failed to fetch blog detail:', error);
        if (isMounted) {
          setIsError(true);
          setBlog(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBlogDetail();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-64 sm:h-80 bg-gray-100 rounded-xl" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  // Not Found / Error State
  if (isError || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <ExclamationCircleIcon className="w-7 h-7" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Không tìm thấy bài viết
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.
        </p>
        <div className="pt-2">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Quay lại danh sách bài viết
          </Link>
        </div>
      </div>
    );
  }

  const coverImage = blog.bannerUrl || blog.thumbnailUrl;
  const authorName = blog.creator?.name || blog.creator?.email || 'TradeVerse Team';
  const publishedDateRaw = blog.publishedAt || blog.createdAt;
  const formattedDate = formatDate(publishedDateRaw);
  const formattedUpdatedDate = blog.updatedAt ? formatDate(blog.updatedAt) : null;
  const hasUpdatedDate =
    formattedUpdatedDate &&
    formattedUpdatedDate !== 'Mới đăng' &&
    formattedUpdatedDate !== formattedDate;
  const readTime = getReadTime(blog.content, blog.summary);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 relative">
      {/* 1. Navigation / Back Link */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 font-medium text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Tất cả bài viết
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/" className="hover:underline">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:underline">
            Bài viết
          </Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[150px]">
            {blog.slug}
          </span>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="space-y-4">
        {/* Badges & Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {blog.blogType?.name && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-primary bg-primary-light/60 rounded-md">
                <TagIcon className="w-3.5 h-3.5" />
                {blog.blogType.name}
              </span>
            )}
            {blog.isPremium && (
              <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-50 rounded-md">
                ★ Premium
              </span>
            )}
          </div>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 flex items-center gap-2">
                Tác giả: {" "}
                <span className="text-gray-800"> {authorName}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span>Ngày đăng:
                <span className="text-gray-800"> {formattedDate}</span></span>
            </div>

            {hasUpdatedDate && (
              <div className="flex items-center gap-1.5">
                <ArrowPathIcon className="w-4 h-4 text-gray-400" />
                <span>Ngày cập nhật:
                  <span className="text-gray-800"> {formattedUpdatedDate}</span></span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800">
                {readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-snug sm:leading-tight">
          {blog.title}
        </h1>

        {/* Summary */}
        {blog.summary && (
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            {blog.summary}
          </p>
        )}
      </header>

      {/* 3. Cover Banner (Only if coverImage exists!) */}
      {
        coverImage && (
          <div className="w-full rounded-2xl overflow-hidden aspect-[16/9] max-h-[400px] relative flex items-center justify-center p-2 sm:p-4 bg-gray-50 border border-gray-100">
            <img
              src={coverImage}
              alt={blog.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )
      }

      {/* 4. Article Body Content */}
      <main className="pt-2">
        {blog.content ? (
          <div
            className="blog-content-body text-gray-800 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <p className="text-gray-500 italic text-sm">
            Nội dung bài viết đang được cập nhật...
          </p>
        )}
      </main>

      {/* 5. Footer Navigation */}
      <footer className="pt-8 border-t border-gray-200 flex items-center justify-between">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Quay lại tất cả bài viết
        </Link>
      </footer>

      {/* 6. Back to Top Anchor */}
      {showScrollTop && (
        <Button
          type="button"
          onClick={scrollToTop}
          variant="primary"
          rounded="full"
          aria-label="Về đầu trang"
          title="Về đầu trang"
          className="fixed bottom-6 right-6 z-50 !w-11 !h-11 !p-0 flex items-center justify-center cursor-pointer"
        >
          <ArrowUpIcon className="w-5 h-5 text-white" />
        </Button>
      )}
    </article >
  );
}

