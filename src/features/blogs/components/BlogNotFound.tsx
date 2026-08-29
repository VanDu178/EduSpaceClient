import Link from 'next/link';
import { ExclamationCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export interface BlogNotFoundProps {
  title?: string;
  message?: string;
  backLink?: string;
  backText?: string;
}

export function BlogNotFound({
  title = 'Không tìm thấy bài viết',
  message = 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.',
  backLink = '/blogs',
  backText = 'Quay lại danh sách bài viết',
}: BlogNotFoundProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
      <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
        <ExclamationCircleIcon className="w-7 h-7" />
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        {title}
      </h1>
      <p className="text-sm text-gray-600 max-w-md mx-auto">
        {message}
      </p>
      <div className="pt-2">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {backText}
        </Link>
      </div>
    </div>
  );
}
