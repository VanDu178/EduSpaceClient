'use client';

import { useState, useMemo } from 'react';
import { BlogCategoryName } from './types';
import { MOCK_BLOGS } from './mockData';
import { BlogHeader } from './components/BlogHeader';
import { BlogSearch } from './components/BlogSearch';
import { BlogGrid } from './components/BlogGrid';
import { BlogPagination } from './components/BlogPagination';

const ITEMS_PER_PAGE = 6;

export function BlogsFeature() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryName>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter blogs based on category and search query
  const filteredBlogs = useMemo(() => {
    return MOCK_BLOGS.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || blog.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        blog.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: BlogCategoryName) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* 1. Header (Title + Category Filter Pills) */}
      <BlogHeader
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* 2. Search Bar */}
      <BlogSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* 3. Article Cards Grid */}
      <BlogGrid blogs={paginatedBlogs} />

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
