import { BlogPost } from '../types';
import { BlogCard } from './BlogCard';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface BlogGridProps {
  blogs: BlogPost[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 space-y-2">
        <DocumentMagnifyingGlassIcon className="w-10 h-10 text-gray-400 mx-auto stroke-1" />
        <h3 className="text-base font-semibold text-gray-800">
          Không tìm thấy bài viết nào
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Không tìm thấy bài viết phù hợp với tìm kiếm hoặc bộ lọc danh mục của bạn.
          Hãy thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
