import { Metadata } from 'next';
import { Suspense } from 'react';
import { VideoListPage } from '@/features/videos';

export const metadata: Metadata = {
  title: 'Thư Viện Video - TradeVerse',
  description:
    'Tổng hợp video hướng dẫn, phân tích thị trường thực chiến và bài giảng phương pháp giao dịch từ các chuyên gia TradeVerse.',
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-12">
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-gray-400 text-xs sm:text-sm">
            Đang tải thư viện video...
          </div>
        }
      >
        <VideoListPage />
      </Suspense>
    </main>
  );
}
