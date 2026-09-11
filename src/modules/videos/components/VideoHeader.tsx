'use client';

import { VideoType } from '@/modules/videos/types';

interface VideoCategoryItem {
  id?: number;
  code: string;
  name: string;
}

interface VideoHeaderProps {
  categories: VideoType[];
  selectedCategoryId?: number;
  onSelectCategory: (id?: number) => void;
  isLoading?: boolean;
}

export function VideoHeader({
  categories,
  selectedCategoryId,
  onSelectCategory,
  isLoading = false,
}: VideoHeaderProps) {
  const categoryOptions: VideoCategoryItem[] = [
    { code: 'ALL', name: 'Tất cả' },
    ...categories,
  ];

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
        Tất Cả Video
      </h1>

      {/* Category Filter Pills (Scrollable) */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
          {categoryOptions.map((category) => {
            const isActive = selectedCategoryId === category.id;
            return (
              <button
                key={category.code}
                type="button"
                disabled={isLoading}
                onClick={() => onSelectCategory(category.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${isLoading ? 'opacity-60 cursor-not-allowed' : ''
                  } ${isActive
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
