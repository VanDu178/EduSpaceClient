import { Metadata } from 'next';
import { BlogsFeature } from '@/features/blogs';

export const metadata: Metadata = {
  title: 'Tất Cả Bài Viết - EduSpace Blog',
  description:
    'Khám phá các bài viết, hướng dẫn và chia sẻ kinh nghiệm mới nhất về AI, Lập trình, Cấu trúc dữ liệu và Phát triển phần mềm.',
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-12">
      <BlogsFeature />
    </main>
  );
}
