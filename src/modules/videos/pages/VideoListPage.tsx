'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Pagination } from 'antd';
import { useVideoTypes, useVideos } from '@/modules/videos/hooks/useVideos';
import { VideoHeader } from '@/modules/videos/components/VideoHeader';
import { VideoSearch } from '@/modules/videos/components/VideoSearch';
import { VideoGrid } from '@/modules/videos/components/VideoGrid';
import { Video } from '@/modules/videos/types';
import { ITEMS_PER_PAGE } from '@/modules/videos/constants';

export function VideoListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filterState, setFilterState] = useState<{
    videoTypeId?: number;
    searchQuery: string;
    debouncedSearch: string;
    page: number;
  }>({
    videoTypeId: undefined,
    searchQuery: '',
    debouncedSearch: '',
    page: 1,
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterState((prev) => ({
        ...prev,
        debouncedSearch: prev.searchQuery,
        page: 1,
      }));
    }, 350);

    return () => clearTimeout(timer);
  }, [filterState.searchQuery]);

  // Fetch video types
  const { data: videoTypes = [], isLoading: isLoadingTypes } = useVideoTypes();

  // Fetch videos list
  const getVideosParams = {
    page: filterState.page,
    limit: ITEMS_PER_PAGE,
    search: filterState.debouncedSearch.trim() || undefined,
    videoTypeId: filterState.videoTypeId,
    status: 'published',
    sortBy: 'createdAt',
    sortOrder: 'desc' as const,
  };

  const { data: videosData, isLoading: isLoadingVideos } = useVideos(getVideosParams);
  const videos = videosData?.videos || [];
  const totalItems = videosData?.pagination?.total || 0;
  const isLoading = isLoadingTypes || isLoadingVideos;

  // Tự động chuyển hướng nếu có query `?v=ID` cũ
  const videoIdFromUrl = searchParams.get('v');
  useEffect(() => {
    if (videoIdFromUrl) {
      router.replace(`/videos/${videoIdFromUrl}`);
    }
  }, [videoIdFromUrl, router]);

  const handleCategoryChange = (videoTypeId?: number) => {
    setFilterState((prev) => ({
      ...prev,
      videoTypeId,
      page: 1,
    }));
  };

  const handleSearchChange = (query: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilterState((prev) => ({
      ...prev,
      page,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideo = (video: Video) => {
    router.push(`/videos/${video.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* 1. Header (Title + Category Filter Pills: Tất cả, Học thuật, Nhận định thị trường) */}
      <VideoHeader
        categories={videoTypes}
        selectedCategoryId={filterState.videoTypeId}
        onSelectCategory={handleCategoryChange}
        isLoading={isLoading}
      />

      {/* 2. Search Bar */}
      <VideoSearch
        searchQuery={filterState.searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* 3. Video Cards Grid */}
      <VideoGrid
        videos={videos}
        isLoading={isLoading}
        onSelectVideo={handleOpenVideo}
      />

      {/* 4. Pagination */}
      {totalItems > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center mt-8 sm:mt-10">
          <Pagination
            current={filterState.page}
            total={totalItems}
            pageSize={ITEMS_PER_PAGE}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
