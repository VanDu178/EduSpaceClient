import { Metadata } from 'next';
import { Suspense } from 'react';
import { VideoDetailPage } from '@/features/videos';

export const metadata: Metadata = {
  title: 'Xem Video - TradeVerse',
  description: 'Xem video bài giảng, phân tích thị trường chi tiết trên TradeVerse.',
};

export default function VideoDetailRoute() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-12">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-gray-400 text-sm">
            Đang tải nội dung video...
          </div>
        }
      >
        <VideoDetailPage />
      </Suspense>
    </main>
  );
}
