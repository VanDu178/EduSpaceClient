import { Blog } from '../types';
import { BlogCard } from './BlogCard';
import { BlogEmpty } from './BlogEmpty';

interface BlogGridProps {
  blogs: Blog[];
  isLoading?: boolean;
}

export function BlogGrid({ blogs, isLoading = false }: BlogGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse flex flex-col justify-between"
          >
            <div>
              <div className="w-full aspect-[16/9] bg-gray-100" />
              <div className="p-4 sm:p-5 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="h-5 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            </div>
            <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-gray-100 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gray-100" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return <BlogEmpty />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

