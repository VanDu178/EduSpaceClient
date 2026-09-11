'use client';

import { MagnifyingGlassIcon, XMarkIcon, SparklesIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { GetVideosParams, VideoType, SourceType } from '../types';
import { VIDEO_SORT_OPTIONS } from '../constants';

interface VideoFilterBarProps {
  params: GetVideosParams;
  onParamsChange: (newParams: GetVideosParams) => void;
  videoTypes: VideoType[];
  isLoadingTypes?: boolean;
}

export function VideoFilterBar({
  params,
  onParamsChange,
  videoTypes,
  isLoadingTypes = false,
}: VideoFilterBarProps) {
  const { search = '', videoTypeId, sourceType, isPremium, sortBy = 'createdAt', sortOrder = 'desc' } = params;

  const handleSearchChange = (val: string) => {
    onParamsChange({ ...params, search: val, page: 1 });
  };

  const handleTypeSelect = (typeId?: number) => {
    onParamsChange({ ...params, videoTypeId: typeId, page: 1 });
  };

  const handleSourceSelect = (srcType?: SourceType) => {
    onParamsChange({ ...params, sourceType: srcType, page: 1 });
  };

  const handleAccessSelect = (premiumStatus?: boolean) => {
    onParamsChange({ ...params, isPremium: premiumStatus, page: 1 });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const option = VIDEO_SORT_OPTIONS[selectedIndex];
    if (option) {
      onParamsChange({
        ...params,
        sortBy: option.sortBy,
        sortOrder: option.sortOrder as 'asc' | 'desc',
        page: 1,
      });
    }
  };

  // Current sort option index
  const currentSortIndex = VIDEO_SORT_OPTIONS.findIndex(
    (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-2xs">
      {/* Top Row: Search Bar & Sort Dropdown Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Tìm kiếm video bài giảng, chiến lược giao dịch..."
            className="w-full pl-9 pr-9 py-2 bg-white text-gray-900 text-xs sm:text-sm placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Sắp xếp:</span>
          <select
            value={currentSortIndex >= 0 ? currentSortIndex : 0}
            onChange={handleSortChange}
            className="text-xs sm:text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium focus:outline-none focus:border-primary cursor-pointer"
          >
            {VIDEO_SORT_OPTIONS.map((opt, index) => (
              <option key={index} value={index}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Category Filter Pills */}
      <div className="space-y-1.5 pt-2 border-t border-gray-100">
        <span className="text-xs font-semibold text-gray-500">Phân loại danh mục:</span>
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            type="button"
            disabled={isLoadingTypes}
            onClick={() => handleTypeSelect(undefined)}
            className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${videoTypeId === undefined
              ? 'bg-primary text-white border border-primary hover:bg-primary-hover'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            Tất cả danh mục
          </button>

          {videoTypes.map((t) => {
            const isActive = videoTypeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                disabled={isLoadingTypes}
                onClick={() => handleTypeSelect(t.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isActive
                  ? 'bg-primary text-white border border-primary hover:bg-primary-hover'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <VideoCameraIcon className="w-3.5 h-3.5" />
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Sub-Filters (Nguồn phát & Quyền truy cập) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
        {/* Source Type Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-semibold text-gray-500 mr-1 whitespace-nowrap">
            Nguồn phát:
          </span>
          <button
            type="button"
            onClick={() => handleSourceSelect(undefined)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${sourceType === undefined
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Tất cả nguồn
          </button>
          <button
            type="button"
            onClick={() => handleSourceSelect('direct_upload')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${sourceType === 'direct_upload'
              ? 'bg-sky-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Nội bộ TradeVerse
          </button>
          <button
            type="button"
            onClick={() => handleSourceSelect('youtube')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${sourceType === 'youtube'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            YouTube
          </button>
        </div>

        {/* Access Level Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-semibold text-gray-500 mr-1 whitespace-nowrap">
            Quyền truy cập:
          </span>
          <button
            type="button"
            onClick={() => handleAccessSelect(undefined)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${isPremium === undefined
              ? 'bg-gray-900 text-white border border-gray-900'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => handleAccessSelect(false)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${isPremium === false
              ? 'bg-emerald-600 text-white border border-emerald-600'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            Miễn phí
          </button>
          <button
            type="button"
            onClick={() => handleAccessSelect(true)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1 ${isPremium === true
              ? 'bg-amber-500 text-white border border-amber-500'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            Trả phí
          </button>
        </div>
      </div>
    </div>
  );
}
