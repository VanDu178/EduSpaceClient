import { Metadata } from 'next';
import { BlogDetailPage } from '@/features/blogs';

export const metadata: Metadata = {
  title: 'Chi Tiết Bài Viết - TradeVerse Blog',
  description:
    'Khám phá bài viết chi tiết, hướng dẫn và phân tích chuyên sâu từ TradeVerse.',
};

export default function BlogDetailRoute() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-12">
      <BlogDetailPage />
    </main>
  );
}
