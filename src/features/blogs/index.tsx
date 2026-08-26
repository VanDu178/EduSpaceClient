'use client';

import { useState, useEffect } from 'react';
import { Blog, BlogCategoryOption } from './types';
import { getBlogTypesApi, getBlogsApi } from './services/blogService';
import { BlogHeader } from './components/BlogHeader';
import { BlogSearch } from './components/BlogSearch';
import { BlogGrid } from './components/BlogGrid';
import { BlogPagination } from './components/BlogPagination';

const ITEMS_PER_PAGE = 6;
const DEFAULT_CATEGORY: BlogCategoryOption = { code: 'ALL', name: 'Tất cả' };

export function BlogsFeature() {
  const [categories, setCategories] = useState<BlogCategoryOption[]>([DEFAULT_CATEGORY]);
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch blog types from API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const types = await getBlogTypesApi();
        if (isMounted) {
          const apiCategories: BlogCategoryOption[] = types.map((t) => ({
            code: t.code,
            name: t.name,
          }));
          setCategories([DEFAULT_CATEGORY, ...apiCategories]);
        }
      } catch (error) {
        console.error('Failed to fetch blog types:', error);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch blogs list from API when page, category or search query changes
  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await getBlogsApi({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          keyword: debouncedSearch.trim() || undefined,
          blogType: selectedCategoryCode === 'ALL' ? undefined : selectedCategoryCode,
        });

        if (isMounted) {
          setBlogs(data.blogs);
          setTotalPages(data.pagination.totalPages || 1);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        if (isMounted) {
          setBlogs([]);
          setTotalPages(1);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, [currentPage, selectedCategoryCode, debouncedSearch]);

  const handleCategoryChange = (categoryCode: string) => {
    setSelectedCategoryCode(categoryCode);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* 1. Header (Title + Category Filter Pills) */}
      <BlogHeader
        categories={categories}
        selectedCategoryCode={selectedCategoryCode}
        onSelectCategory={handleCategoryChange}
        isLoading={isLoading}
      />

      {/* 2. Search Bar */}
      <BlogSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* 3. Article Cards Grid */}
      <BlogGrid blogs={blogs} isLoading={isLoading} />

      {/* 4. Pagination */}
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export * from './types';
export * from './services/blogService';

