import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 sm:mt-10">
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-md sm:rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md sm:rounded-lg flex items-center justify-center text-xs font-medium transition-colors cursor-pointer ${
              isActive
                ? 'border-2 border-primary text-primary bg-primary-light/50 font-bold'
                : 'border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-md sm:rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
