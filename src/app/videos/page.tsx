import { Metadata } from 'next';
import { VideoCameraIcon, SparklesIcon, PlayIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Video & Bài Học Trực Quan - TradeVerse',
  description:
    'Tổng hợp video hướng dẫn, phân tích thị trường thực chiến và bài giảng phương pháp giao dịch từ các chuyên gia TradeVerse.',
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <VideoCameraIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
              Học viện TradeVerse
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Thư viện Video & Bài Học Trực Quan
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
            Theo dõi video phân tích kỹ thuật, phương pháp quản lý rủi ro và các chiến lược giao dịch thực chiến được cập nhật hàng tuần.
          </p>
        </div>

        {/* Demo Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Hướng dẫn cài đặt & Quản lý danh mục TradeVerse",
              duration: "12:45",
              category: "Cơ bản",
              views: "1.2k lượt xem",
            },
            {
              title: "Chiến lược Quantitative Trading & Quản trị rủi ro",
              duration: "24:10",
              category: "Nâng cao",
              views: "2.8k lượt xem",
            },
            {
              title: "Phân tích xu hướng thị trường & Tín hiệu giao dịch",
              duration: "18:30",
              category: "Thực chiến",
              views: "3.5k lượt xem",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sky-300 transition-colors"
            >
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="w-12 h-12 rounded-full bg-white/90 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayIcon className="w-6 h-6 ml-0.5" />
                </div>
                <span className="absolute bottom-3 right-3 text-xs font-medium text-white bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                  {item.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {item.category}
                    </span>
                    <span>{item.views}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <SparklesIcon className="w-3.5 h-3.5 text-sky-500" />
                    TradeVerse Team
                  </span>
                  <span>Đã cập nhật</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
