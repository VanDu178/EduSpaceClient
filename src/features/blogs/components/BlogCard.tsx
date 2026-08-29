import Link from 'next/link';
import { Blog } from '../types';
import { getReadTime, getCoverConfig, extractPlainText } from '../utils';
import { CoddyMascotIllustration } from './CoddyMascotIllustrations';
import { formatDate } from '@/core/utils';

interface BlogCardProps {
  blog: Blog;
  onPremiumClick?: (blog: Blog) => void;
}


export function BlogCard({ blog }: BlogCardProps) {
  const { coverColor, illustrationType } = getCoverConfig(blog.blogType?.code);
  const coverImage = blog.thumbnailUrl || blog.bannerUrl;
  const authorName = blog.creator?.name || 'TradeVerse Team';
  const formattedDate = formatDate(blog.publishedAt || blog.createdAt);
  const readTime = getReadTime(blog.content, blog.summary);

  // Trích xuất văn bản thuần (plain text) từ HTML của summary hoặc content
  const cleanSummary = extractPlainText(blog.summary);
  const cleanContent = extractPlainText(blog.content);

  const displaySummary =
    cleanSummary || (cleanContent ? cleanContent.slice(0, 130) + '...' : '');

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-gray-300 transition-all duration-200 h-full">
      <Link href={`/blogs/${blog.slug}`} className="flex-1 flex flex-col cursor-pointer">
        {/* Top Thumbnail (~16:9 aspect ratio) */}
        <div
          className="w-full aspect-[16/9] relative overflow-hidden flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-[1.01] flex-shrink-0"
          style={{ backgroundColor: coverColor }}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt={blog.title}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <CoddyMascotIllustration
              type={illustrationType}
              className="w-full h-full object-contain max-h-[125px]"
            />
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {blog.blogType?.name && (
              <span className="px-2 py-0.5 text-[11px] font-medium text-primary bg-primary-light/60 rounded-md">
                {blog.blogType.name}
              </span>
            )}
            {blog.isPremium && (
              <span className="px-2 py-0.5 text-[11px] font-medium text-amber-700 bg-amber-50 rounded-md">
                Trả phí
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          {/* Short Description */}
          {displaySummary && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {displaySummary}
            </p>
          )}
        </div>
      </Link>

      {/* Card Footer */}
      <div className="px-4 sm:px-5 pb-4 pt-2.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 flex-shrink-0">
        <div className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-[10px] flex-shrink-0">
          {authorName.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-700 truncate">
          {authorName}
        </span>
        <span className="text-gray-300">·</span>
        <span className="whitespace-nowrap">{formattedDate}</span>
        <span className="text-gray-300">·</span>
        <span className="whitespace-nowrap">{readTime}</span>
      </div>
    </article>
  );
}

