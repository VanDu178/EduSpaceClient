import { Metadata } from 'next';
import { BlogsFeature } from '@/features/blogs';

export const metadata: Metadata = {
  title: 'Tất Cả Bài Viết - TradeVerse Blog',
  description:
    'Khám phá các bài viết, hướng dẫn và chia sẻ kinh nghiệm mới nhất về Trading, Quantitative Trading, Phân tích kỹ thuật và Quản lý vốn.',
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-12">
      <BlogsFeature />
    </main>
  );
}
