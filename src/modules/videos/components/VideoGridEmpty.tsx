'use client';

import { VideoCameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface VideoGridEmptyProps {
  onResetFilters?: () => void;
}

export function VideoGridEmpty({ onResetFilters }: VideoGridEmptyProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mx-auto">
        <VideoCameraIcon className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Không tìm thấy video phù hợp
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Thử tìm kiếm với từ khóa khác hoặc xóa bớt các bộ lọc danh mục hiện tại.
        </p>
      </div>

      {onResetFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-sky-200"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Đặt lại bộ lọc
        </button>
      )}
    </div>
  );
}
