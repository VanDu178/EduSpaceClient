import { BlogCategoryOption } from '../types';

interface BlogHeaderProps {
  categories: BlogCategoryOption[];
  selectedCategoryCode: string;
  onSelectCategory: (code: string) => void;
  isLoading?: boolean;
}

export function BlogHeader({
  categories,
  selectedCategoryCode,
  onSelectCategory,
  isLoading = false,
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
          {categories.map((category) => {
            const isActive = selectedCategoryCode === category.code;
            return (
              <button
                key={category.code}
                type="button"
                disabled={isLoading}
                onClick={() => onSelectCategory(category.code)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isLoading ? 'opacity-60 cursor-not-allowed' : ''
                } ${
                  isActive
                    ? 'bg-primary text-white border border-primary hover:bg-primary-hover'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
