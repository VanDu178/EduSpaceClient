import { Metadata } from 'next';
import {
  WrenchScrewdriverIcon,
  CalculatorIcon,
  ChartBarIcon,
  CpuChipIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Bộ Công Cụ Hỗ Trợ Giao Dịch - TradeVerse',
  description:
    'Tổng hợp công cụ phân tích, tính toán khối lượng lệnh, định giá rủi ro và mô phỏng chiến lược Trading chuyên nghiệp.',
};

export default function ToolsPage() {
  const tools = [
    {
      name: 'Công cụ tính Khối lượng Lệnh (Position Size Calculator)',
      description:
        'Tự động tính toán số lượng cổ phiếu/lô hợp đồng tối ưu dựa trên % rủi ro tài khoản và khoảng dừng lỗ (Stop Loss).',
      icon: CalculatorIcon,
      status: 'Sẵn sàng',
      tag: 'Miễn phí',
    },
    {
      name: 'Mô phỏng Phân bổ Dòng tiền & Quản trị Rủi ro',
      description:
        'Kiểm tra và đánh giá tỷ lệ Sharpe, Max Drawdown và mô phỏng kịch bản biến động thị trường theo thời gian thực.',
      icon: ChartBarIcon,
      status: 'Sẵn sàng',
      tag: 'Pro',
    },
    {
      name: 'Bộ Lọc Tín hiệu Quantitative AI (Algo Screener)',
      description:
        'Quét toàn bộ thị trường tìm kiếm các tín hiệu bứt phá (Breakout), phân kỳ RSI và mô hình nến giá theo thuật toán.',
      icon: CpuChipIcon,
      status: 'Thử nghiệm',
      tag: 'Pro',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <WrenchScrewdriverIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
              Hệ sinh thái TradeVerse
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Bộ Công Cụ Hỗ Trợ Giao Dịch Chuyên Nghiệp
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
            Tối ưu hóa hiệu suất đầu tư của bạn với các tiện ích tính toán rủi ro, lọc tín hiệu thuật toán và phân tích kỹ thuật hiện đại.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-300 transition-colors space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        tool.tag === 'Miễn phí'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Trạng thái: <strong className="text-slate-700 font-semibold">{tool.status}</strong>
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    <span>Khám phá</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
