import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface BlogEmptyProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function BlogEmpty({
  title = 'Không tìm thấy bài viết nào',
  message = 'Không tìm thấy bài viết phù hợp với tìm kiếm hoặc bộ lọc danh mục của bạn. Hãy thử xóa bộ lọc hoặc tìm kiếm với từ khóa khác.',
  action,
}: BlogEmptyProps) {
  return (
    <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 space-y-2">
      <DocumentMagnifyingGlassIcon className="w-10 h-10 text-gray-400 mx-auto stroke-1" />
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
        {message}
      </p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
