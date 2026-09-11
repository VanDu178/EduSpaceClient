import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BlogSearch({
  searchQuery,
  onSearchChange,
}: BlogSearchProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search articles..."
        className="w-full pl-9 pr-9 py-2.5 bg-white text-gray-900 text-xs sm:text-sm placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
