'use client';

import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { BlogCategoryOption, BlogFilterState } from './types';
import { useBlogTypes, useBlogs } from './hooks';
import { BlogHeader } from './components/BlogHeader';
import { BlogSearch } from './components/BlogSearch';
import { BlogGrid } from './components/BlogGrid';

const ITEMS_PER_PAGE = 6;
const DEFAULT_CATEGORY: BlogCategoryOption = { code: 'ALL', name: 'Tất cả' };

export function BlogsFeature() {
  const [blogFilter, setBlogFilter] = useState<BlogFilterState>({
    categoryCode: 'ALL',
    searchQuery: '',
    debouncedSearch: '',
    page: 1,
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setBlogFilter((prev) => ({
        ...prev,
        debouncedSearch: prev.searchQuery,
        page: 1,
      }));
    }, 350);

    return () => clearTimeout(timer);
  }, [blogFilter.searchQuery]);

  // Fetch blog types using TanStack Query
  const { data: blogTypes = [], isLoading: isLoadingTypes } = useBlogTypes();
  const categories: BlogCategoryOption[] = [
    DEFAULT_CATEGORY,
    ...blogTypes.map((t) => ({ code: t.code, name: t.name })),
  ];

  // Fetch blogs list using TanStack Query
  const getBlogsParams = {
    page: blogFilter.page,
    limit: ITEMS_PER_PAGE,
    keyword: blogFilter.debouncedSearch.trim() || undefined,
    blogType: blogFilter.categoryCode === 'ALL' ? undefined : blogFilter.categoryCode,
  };

  const { data: blogsData, isLoading: isLoadingBlogs } = useBlogs(getBlogsParams);
  const blogs = blogsData?.blogs || [];
  const totalItems = blogsData?.pagination?.total || 0;
  const isLoading = isLoadingTypes || isLoadingBlogs;

  const handleCategoryChange = (categoryCode: string) => {
    setBlogFilter((prev) => ({
      ...prev,
      categoryCode,
      page: 1,
    }));
  };

  const handleSearchChange = (query: string) => {
    setBlogFilter((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const handlePageChange = (page: number) => {
    setBlogFilter((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* 1. Header (Title + Category Filter Pills) */}
      <BlogHeader
        categories={categories}
        selectedCategoryCode={blogFilter.categoryCode}
        onSelectCategory={handleCategoryChange}
        isLoading={isLoading}
      />

      {/* 2. Search Bar */}
      <BlogSearch
        searchQuery={blogFilter.searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* 3. Article Cards Grid */}
      <BlogGrid blogs={blogs} isLoading={isLoading} />

      {/* 4. Pagination */}
      {totalItems > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center mt-8 sm:mt-10">
          <Pagination
            current={blogFilter.page}
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

export * from './types';
export * from './services';
export * from './hooks';
export * from './components';
export * from './utils';

