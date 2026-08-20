import { BlogCategoryName } from '../types';
import { BLOG_CATEGORIES } from '../mockData';

interface BlogHeaderProps {
  selectedCategory: BlogCategoryName;
  onSelectCategory: (category: BlogCategoryName) => void;
}

export function BlogHeader({
  selectedCategory,
  onSelectCategory,
}: BlogHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
        Tất Cả Bài Viết
      </h1>

      {/* Category Filter Pills (Scrollable) */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
          {BLOG_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#3B82F6] text-white border border-[#3B82F6]'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
