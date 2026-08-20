import { BlogPost } from '../types';
import { CoddyMascotIllustration } from './CoddyMascotIllustrations';

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-gray-300 transition-all duration-200">
      <div>
        {/* Top Thumbnail (~16:9 aspect ratio) with Flat Color & Compact Mascot Illustration */}
        <div
          className="w-full aspect-[16/9] relative overflow-hidden flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-[1.01]"
          style={{ backgroundColor: blog.coverColor }}
        >
          <CoddyMascotIllustration
            type={blog.illustrationType}
            className="w-full h-full object-contain max-h-[125px]"
          />
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-2">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {blog.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 sm:px-5 pb-4 pt-2.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
        <img
          src={blog.author.avatar}
          alt={blog.author.name}
          className="w-5 h-5 rounded-full object-cover flex-shrink-0"
        />
        <span className="font-medium text-gray-700 truncate">
          {blog.author.name}
        </span>
        <span className="text-gray-300">·</span>
        <span className="whitespace-nowrap">{blog.publishedAt}</span>
        <span className="text-gray-300">·</span>
        <span className="whitespace-nowrap">{blog.readTime}</span>
      </div>
    </article>
  );
}
