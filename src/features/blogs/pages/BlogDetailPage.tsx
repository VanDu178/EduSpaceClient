'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  LockClosedIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Blog } from '../types';
import { useBlogBySlug, useBlogs } from '../hooks';
import { getReadTime } from '../utils';
import { BlogNotFound } from '../components/BlogNotFound';
import { BlogCard } from '../components/BlogCard';
import { PremiumAccessModal } from '@/features/membership';
import { Button } from '@/components/common';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { formatDate } from '@/core/utils';
import { USER_ROLE } from '@/core/constants/roles';

export function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = params?.slug as string;

  const { user, isInitialized } = useAuthStore();

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRelatedBlog, setSelectedRelatedBlog] = useState<Blog | null>(null);

  // Fetch chi tiết bài viết với TanStack Query (chờ isInitialized)
  const { data: blog = null, isLoading, isError } = useBlogBySlug(slug, isInitialized);

  // Fetch bài viết cùng thể loại & fallback bài mới nhất
  const { data: sameCatData, isLoading: isSameCatLoading } = useBlogs(
    { limit: 6, blogType: blog?.blogType?.code },
    Boolean(blog && blog.blogType?.code)
  );

  const { data: fallbackData, isLoading: isFallbackLoading } = useBlogs(
    { limit: 6 },
    Boolean(blog)
  );

  const sameCategoryBlogs = (sameCatData?.blogs || []).filter((b) => b.id !== blog?.id);
  let relatedBlogs = sameCategoryBlogs.slice(0, 3);
  if (relatedBlogs.length < 3 && fallbackData?.blogs) {
    const existingIds = new Set([blog?.id, ...relatedBlogs.map((b) => b.id)]);
    const fallbackBlogs = fallbackData.blogs.filter((b) => !existingIds.has(b.id));
    relatedBlogs = [...relatedBlogs, ...fallbackBlogs].slice(0, 3);
  }
  const isRelatedLoading = isSameCatLoading || isFallbackLoading;

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

  const handleRelatedPremiumClick = (relatedBlog: Blog) => {
    setSelectedRelatedBlog(relatedBlog);
    setIsModalOpen(true);
  };

  // Loading Skeleton State
  if (!isInitialized || isLoading) {
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
    return <BlogNotFound />;
  }

  const coverImage = blog.bannerUrl || blog.thumbnailUrl;
  const authorName = blog.creator?.name || 'TradeVerse Team';
  const formattedDate = formatDate(blog.publishedAt || blog.createdAt);
  const formattedUpdatedDate = formatDate(blog.updatedAt);
  const hasUpdatedDate = Boolean(blog.updatedAt) && formattedUpdatedDate !== formattedDate;
  const readTime = getReadTime(blog.content, blog.summary);
  const isGuest = !user;
  const isAdmin = user?.role === USER_ROLE.ADMIN;
  const isClientPaidInadequateTier = user?.role === USER_ROLE.CLIENT && user?.isPremium && blog.hasFullAccess === false;

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
          <div className="flex flex-wrap items-center gap-2">
            {blog.blogType?.name && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-primary bg-primary-light/60 rounded-md">
                <TagIcon className="w-3.5 h-3.5" />
                {blog.blogType.name}
              </span>
            )}
            {blog.isPremium && (
              <span className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-md">
                ★ Trả phí
              </span>
            )}

            {/* Role / Access Level Badges */}
            {isAdmin && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-md">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                Chế độ xem Quản trị viên
              </span>
            )}

            {blog.isPremium && blog.hasFullAccess && user?.role === USER_ROLE.CLIENT && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-md ">
                <SparklesIcon className="w-3.5 h-3.5" />
                Đặc quyền Hội viên Premium
              </span>
            )}
          </div>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 flex items-center gap-2">
                Tác giả: <span className="text-gray-800"> {authorName}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
              <span>
                Ngày đăng: <span className="text-gray-800"> {formattedDate}</span>
              </span>
            </div>

            {hasUpdatedDate && (
              <div className="flex items-center gap-1.5">
                <ArrowPathIcon className="w-4 h-4 text-gray-400" />
                <span>
                  Ngày cập nhật: <span className="text-gray-800"> {formattedUpdatedDate}</span>
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-800">{readTime}</span>
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
      {coverImage && (
        <div className="w-full rounded-2xl overflow-hidden aspect-[16/9] max-h-[400px] relative flex items-center justify-center p-2 sm:p-4 bg-gray-50 border border-gray-100">
          <img
            src={coverImage}
            alt={blog.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      {/* 4. Article Body Content */}
      <main className="pt-2 relative">
        {blog.content ? (
          <div className="relative">
            <div
              className={`blog-content-body text-gray-800 text-sm sm:text-base leading-relaxed ${blog.hasFullAccess === false
                ? '[mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]'
                : ''
                }`}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Premium Access Callout Container */}
            {blog.hasFullAccess === false && (
              <div className="relative z-10 -mt-20 pt-12 flex flex-col items-center justify-center text-center p-6 sm:p-8 space-y-4 border border-amber-200/80 rounded-2xl bg-gradient-to-b from-amber-50/60 via-amber-50/90 to-amber-50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <LockClosedIcon className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="space-y-1 max-w-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center justify-center gap-1.5">
                    <SparklesIcon className="w-5 h-5 text-amber-600" />
                    {isGuest
                      ? 'Bài viết này dành riêng cho Gói Hội Viên Premium'
                      : isClientPaidInadequateTier
                        ? 'Gói hội viên hiện tại chưa bao gồm bài viết này'
                        : 'Bài viết dành riêng cho Gói Hội Viên Premium'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {isGuest
                      ? 'Bạn đang xem nội dung xem trước. Vui lòng đăng nhập hoặc tạo tài khoản để trải nghiệm các phân tích chuyên sâu.'
                      : isClientPaidInadequateTier
                        ? `Gói ${user?.planName || 'hội viên hiện tại'} của bạn chưa bao gồm đặc quyền xem bài viết phân tích nâng cao này. Hãy nâng cấp lên gói Pro Trader để mở khóa.`
                        : 'Bạn đang xem bản xem trước. Vui lòng nâng cấp gói hội viên để mở khóa toàn bộ nội dung bài viết.'}
                  </p>
                </div>

                {isGuest ? (
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      rounded="full"
                      onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}
                      className="cursor-pointer font-semibold"
                    >
                      Đăng nhập ngay để tiếp tục
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      rounded="full"
                      onClick={() => router.push(`/register?redirect=${encodeURIComponent(pathname)}`)}
                      className="cursor-pointer font-semibold"
                    >
                      Đăng ký tài khoản
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    rounded="full"
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer font-semibold"
                  >
                    {isClientPaidInadequateTier
                      ? 'Nâng cấp hạng gói để mở khóa'
                      : 'Nâng cấp gói hội viên ngay'}
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">
            Nội dung bài viết đang được cập nhật...
          </p>
        )}
      </main>

      {/* 5. Related Posts Section */}
      <section className="pt-10 pb-4 border-t border-gray-200 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Bài viết liên quan
          </h2>
          <Link
            href="/blogs"
            className="text-xs sm:text-sm font-medium text-primary hover:underline"
          >
            Xem tất cả
          </Link>
        </div>

        {isRelatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse h-72 flex flex-col justify-between p-4 space-y-3"
              >
                <div className="w-full aspect-[16/9] bg-gray-100 rounded-md" />
                <div className="space-y-2 flex-1 pt-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : relatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard
                key={relatedBlog.id}
                blog={relatedBlog}
                onPremiumClick={handleRelatedPremiumClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500 italic">
            Chưa có bài viết liên quan nào khác.
          </p>
        )}
      </section>

      {/* 6. Footer Navigation */}
      <footer className="pt-8 border-t border-gray-200 flex items-center justify-between">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Quay lại tất cả bài viết
        </Link>
      </footer>

      {/* 7. Back to Top Anchor */}
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

      {/* Restricted Access Modal */}
      <PremiumAccessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRelatedBlog(null);
        }}
        postTitle={selectedRelatedBlog?.title || blog.title}
        requiredFeatureCode={selectedRelatedBlog?.requiredFeatureCode || blog?.requiredFeatureCode}
        isUpgradeTier={isClientPaidInadequateTier}
        currentPlanName={user?.planName || undefined}
      />
    </article>
  );
}
