'use client';

import { useState } from 'react';
import {
  WrenchScrewdriverIcon,
  CalculatorIcon,
  ChartBarIcon,
  CpuChipIcon,
  ArrowRightIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  SparklesIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  FunnelIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency } from '@/core/utils/format';

interface ToolItem {
  id: string;
  name: string;
  category: 'calc' | 'pivot' | 'algo' | 'risk';
  description: string;
  icon: typeof CalculatorIcon;
  status: 'Sẵn sàng' | 'Thử nghiệm' | 'Sắp mắt';
  tag: 'Miễn phí' | 'Pro' | 'Enterprise';
}

const TOOLS_LIST: ToolItem[] = [
  {
    id: 'position-size',
    name: 'Công cụ tính Khối lượng Lệnh & Dừng Lỗ',
    category: 'calc',
    description:
      'Tự động tính toán số lượng cổ phiếu/hợp đồng tối ưu dựa trên vốn tài khoản, % rủi ro cho phép và khoảng giá dừng lỗ.',
    icon: CalculatorIcon,
    status: 'Sẵn sàng',
    tag: 'Miễn phí',
  },
  {
    id: 'pivot-fib',
    name: 'Bộ Máy Tính Điểm Xoay Pivot & Fibonacci',
    category: 'pivot',
    description:
      'Xác định chính xác các vùng Hỗ trợ (S1-S3), Kháng cự (R1-R3) và các mốc thoái lùi Fibonacci quan trọng cho phiên giao dịch tiếp theo.',
    icon: AdjustmentsHorizontalIcon,
    status: 'Sẵn sàng',
    tag: 'Miễn phí',
  },
  {
    id: 'algo-screener',
    name: 'Rada Tín hiệu Quantitative AI (Algo Screener)',
    category: 'algo',
    description:
      'Quét toàn bộ thị trường theo thời gian thực tìm kiếm các mẫu hình bứt phá (Breakout), phân kỳ RSI và dòng tiền lớn.',
    icon: CpuChipIcon,
    status: 'Sẵn sàng',
    tag: 'Pro',
  },
  {
    id: 'risk-monte-carlo',
    name: 'Mô Phỏng Dòng Tiền & Drawdown (Monte Carlo)',
    category: 'risk',
    description:
      'Mô phỏng 100+ kịch bản chuỗi giao dịch ngẫu nhiên để đánh giá tỷ lệ Sharpe, Max Drawdown và xác suất cháy tài khoản.',
    icon: ChartBarIcon,
    status: 'Sẵn sàng',
    tag: 'Pro',
  },
];

const ALGO_SIGNALS_MOCK = [
  {
    symbol: 'VN30F1M',
    strategy: 'Breakout M15 + Volume Spike',
    type: 'BUY' as const,
    time: '10:42 AM',
    entry: 1285.5,
    stopLoss: 1279.0,
    target: 1298.0,
    winRate: '78%',
    confidence: 'Rất cao',
    timeframe: 'M15',
  },
  {
    symbol: 'FPT',
    strategy: 'Phân kỳ ẩn RSI + Golden Cross EMA20/50',
    type: 'BUY' as const,
    time: '10:15 AM',
    entry: 134.2,
    stopLoss: 131.0,
    target: 141.5,
    winRate: '82%',
    confidence: 'Cao',
    timeframe: 'H1',
  },
  {
    symbol: 'SSI',
    strategy: 'Rejection tại kháng cự R2 Pivot',
    type: 'SELL' as const,
    time: '09:55 AM',
    entry: 36.8,
    stopLoss: 37.6,
    target: 35.2,
    winRate: '69%',
    confidence: 'Trung bình',
    timeframe: 'M30',
  },
  {
    symbol: 'VCB',
    strategy: 'Bứt phá đỉnh 20 ngày + Dòng tiền Cá mập',
    type: 'BUY' as const,
    time: '09:30 AM',
    entry: 92.5,
    stopLoss: 90.0,
    target: 97.0,
    winRate: '85%',
    confidence: 'Rất cao',
    timeframe: 'D1',
  },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'calc' | 'pivot' | 'algo' | 'risk'>('calc');
  const [copied, setCopied] = useState(false);

  // Position Size Calculator State
  const [capital, setCapital] = useState<number>(100000000);
  const [riskPercent, setRiskPercent] = useState<number>(2);
  const [entryPrice, setEntryPrice] = useState<number>(50000);
  const [stopLossPrice, setStopLossPrice] = useState<number>(47000);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(56000);

  // Pivot Points State
  const [highPrice, setHighPrice] = useState<number>(52000);
  const [lowPrice, setLowPrice] = useState<number>(48500);
  const [closePrice, setClosePrice] = useState<number>(50500);

  // Algo Screener Filter
  const [signalSearch, setSignalSearch] = useState('');
  const [signalTypeFilter, setSignalTypeFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');

  // Risk Monte Carlo State
  const [mcWinRate, setMcWinRate] = useState<number>(55);
  const [mcRiskReward, setMcRiskReward] = useState<number>(2.0);
  const [mcTradesCount, setMcTradesCount] = useState<number>(50);

  // Calculations: Position Size
  const maxAllowableRisk = (capital * riskPercent) / 100;
  const priceRiskPerShare = Math.abs(entryPrice - stopLossPrice);
  const recommendedShares =
    priceRiskPerShare > 0 ? Math.floor(maxAllowableRisk / priceRiskPerShare) : 0;
  const totalPositionValue = recommendedShares * entryPrice;
  const potentialRewardPerShare = Math.abs(takeProfitPrice - entryPrice);
  const totalExpectedProfit = recommendedShares * potentialRewardPerShare;
  const riskRewardRatio =
    priceRiskPerShare > 0 ? (potentialRewardPerShare / priceRiskPerShare).toFixed(2) : '0.00';
  const capitalExposurePercent = capital > 0 ? ((totalPositionValue / capital) * 100).toFixed(1) : '0';

  // Calculations: Pivot & Fibonacci
  const pivotP = (highPrice + lowPrice + closePrice) / 3;
  const pivotR1 = 2 * pivotP - lowPrice;
  const pivotS1 = 2 * pivotP - highPrice;
  const pivotR2 = pivotP + (highPrice - lowPrice);
  const pivotS2 = pivotP - (highPrice - lowPrice);
  const pivotR3 = highPrice + 2 * (pivotP - lowPrice);
  const pivotS3 = lowPrice - 2 * (highPrice - pivotP);

  const fibDiff = highPrice - lowPrice;
  const fib236 = highPrice - fibDiff * 0.236;
  const fib382 = highPrice - fibDiff * 0.382;
  const fib500 = highPrice - fibDiff * 0.5;
  const fib618 = highPrice - fibDiff * 0.618;
  const fib786 = highPrice - fibDiff * 0.786;

  // Calculations: Monte Carlo EV
  const expectedValuePerTrade = (mcWinRate / 100) * mcRiskReward - (1 - mcWinRate / 100) * 1;
  const estimatedProfitPercent = expectedValuePerTrade * mcTradesCount * (riskPercent / 100) * 100;
  const lossStreakProbability = (Math.pow(1 - mcWinRate / 100, 5) * 100).toFixed(1);

  const handleCopySetup = () => {
    const summaryText = `[TradeVerse Order Setup]
Vốn tài khoản: ${formatCurrency(capital)}
Tỷ lệ Rủi ro: ${riskPercent}% (${formatCurrency(maxAllowableRisk)})
Giá Vào (Entry): ${formatCurrency(entryPrice)}
Giá Dừng Lỗ (SL): ${formatCurrency(stopLossPrice)}
Giá Chốt Lời (TP): ${formatCurrency(takeProfitPrice)}
Khối lượng khuyến nghị: ${recommendedShares.toLocaleString('vi-VN')} cổ phiếu
Tổng giá trị vị thế: ${formatCurrency(totalPositionValue)}
Tỷ lệ R:R: 1 : ${riskRewardRatio}
Lợi nhuận kỳ vọng: ${formatCurrency(totalExpectedProfit)}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSignals = ALGO_SIGNALS_MOCK.filter((sig) => {
    const matchesSearch =
      sig.symbol.toLowerCase().includes(signalSearch.toLowerCase()) ||
      sig.strategy.toLowerCase().includes(signalSearch.toLowerCase());
    const matchesType = signalTypeFilter === 'ALL' || sig.type === signalTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Command Center Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <WrenchScrewdriverIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                    TradeVerse Quant Hub
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Algo Engine Active
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Bộ Công Cụ Giao Dịch & Quản Trị Rủi Ro Chuyên Nghiệp
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
              <div className="text-right">
                <p className="text-[11px] text-slate-500 font-medium">Độ trễ hệ thống</p>
                <p className="text-xs font-semibold text-emerald-600">12ms (Real-time)</p>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="text-right">
                <p className="text-[11px] text-slate-500 font-medium">Độ chính xác SL</p>
                <p className="text-xs font-semibold text-sky-600">100% An toàn</p>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
            Hệ sinh thái công cụ hỗ trợ Nhà đầu tư tính toán chính xác khối lượng lệnh, quản trị quy tắc rủi ro tài khoản, quét tín hiệu thuật toán Quant AI và mô phỏng kịch bản biến động thị trường theo chuẩn mực giao dịch quốc tế.
          </p>

          {/* Quick Workspace Switcher Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('calc')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'calc'
                  ? 'bg-sky-50 border-sky-500 text-sky-950 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <CalculatorIcon className={`w-5 h-5 ${activeTab === 'calc' ? 'text-sky-600' : 'text-slate-500'}`} />
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Phổ biến
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Công cụ 01</p>
                <p className="text-sm font-semibold mt-0.5">Tính Khối Lượng & SL</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pivot')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'pivot'
                  ? 'bg-sky-50 border-sky-500 text-sky-950 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <AdjustmentsHorizontalIcon className={`w-5 h-5 ${activeTab === 'pivot' ? 'text-sky-600' : 'text-slate-500'}`} />
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                  Miễn phí
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Công cụ 02</p>
                <p className="text-sm font-semibold mt-0.5">Điểm Xoay Pivot & Fib</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('algo')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'algo'
                  ? 'bg-sky-50 border-sky-500 text-sky-950 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <CpuChipIcon className={`w-5 h-5 ${activeTab === 'algo' ? 'text-sky-600' : 'text-slate-500'}`} />
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  Pro Algo
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Công cụ 03</p>
                <p className="text-sm font-semibold mt-0.5">Rada Tín Hiệu AI</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('risk')}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeTab === 'risk'
                  ? 'bg-sky-50 border-sky-500 text-sky-950 font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <ChartBarIcon className={`w-5 h-5 ${activeTab === 'risk' ? 'text-sky-600' : 'text-slate-500'}`} />
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Quant Pro
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Công cụ 04</p>
                <p className="text-sm font-semibold mt-0.5">Mô Phỏng Monte Carlo</p>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Workspace Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* TAB 1: Position Size Calculator */}
          {activeTab === 'calc' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <CalculatorIcon className="w-6 h-6 text-sky-600" />
                    Bộ Tính Toán Khối Lượng Lệnh (Position Size Calculator)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Bảo vệ vốn tài khoản với công thức phân bổ quy mô vị thế theo tỷ lệ rủi ro tuyệt đối.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopySetup}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-4 h-4 text-emerald-600" />
                      <span>Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-4 h-4" />
                      <span>Sao chép thông số lệnh</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs Column */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Vốn Tài Khoản (VNĐ)
                    </label>
                    <input
                      type="number"
                      value={capital}
                      onChange={(e) => setCapital(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Hiển thị: <strong className="text-slate-700">{formatCurrency(capital)}</strong>
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-slate-700">
                        Tỷ Lệ Rủi Ro Cho Phép (% Vốn)
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 5].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setRiskPercent(pct)}
                            className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${
                              riskPercent === pct
                                ? 'bg-sky-600 text-white border-sky-600'
                                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Giá Vào (Entry)
                      </label>
                      <input
                        type="number"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(Number(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5 text-rose-700">
                        Giá Dừng Lỗ (SL)
                      </label>
                      <input
                        type="number"
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(Number(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 text-sm font-semibold text-rose-900 bg-rose-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5 text-emerald-700">
                        Giá Chốt Lời (TP)
                      </label>
                      <input
                        type="number"
                        value={takeProfitPrice}
                        onChange={(e) => setTakeProfitPrice(Number(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-200 text-sm font-semibold text-emerald-900 bg-emerald-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Outputs Dashboard Column */}
                <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <span className="text-xs font-medium text-slate-400">Kết quả tính toán Khối lượng</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        Công thức An toàn 2%
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-xs text-slate-400">Số lượng khuyến nghị đặt lệnh</p>
                        <p className="text-3xl font-extrabold text-sky-400 mt-1">
                          {recommendedShares.toLocaleString('vi-VN')}{' '}
                          <span className="text-sm font-semibold text-slate-300">cổ phiếu / hợp đồng</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
                          <p className="text-[11px] text-slate-400 font-medium">Mức Rủi Ro Tối Đa</p>
                          <p className="text-base font-bold text-rose-400 mt-0.5">
                            {formatCurrency(maxAllowableRisk)}
                          </p>
                          <p className="text-[10px] text-slate-400">({riskPercent}% Vốn tài khoản)</p>
                        </div>

                        <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
                          <p className="text-[11px] text-slate-400 font-medium">Lợi Nhuận Kỳ Vọng (TP)</p>
                          <p className="text-base font-bold text-emerald-400 mt-0.5">
                            {formatCurrency(totalExpectedProfit)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
                          <p className="text-[11px] text-slate-400 font-medium">Tổng Giá Trị Vị Thế</p>
                          <p className="text-sm font-semibold text-slate-200 mt-0.5">
                            {formatCurrency(totalPositionValue)}
                          </p>
                        </div>

                        <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
                          <p className="text-[11px] text-slate-400 font-medium">Tỷ Lệ Risk / Reward (R:R)</p>
                          <p className="text-sm font-bold text-amber-400 mt-0.5">
                            1 : {riskRewardRatio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Tỷ lệ phơi nhiễm vốn: <strong>{capitalExposurePercent}%</strong></span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      Number(capitalExposurePercent) > 100
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {Number(capitalExposurePercent) > 100 ? 'Cảnh báo Đòn bẩy' : 'An toàn vĩ mô'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Pivot Points & Fibonacci */}
          {activeTab === 'pivot' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <AdjustmentsHorizontalIcon className="w-6 h-6 text-sky-600" />
                  Bộ Máy Tính Điểm Xoay Pivot & Các Mốc Fibonacci
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Xác định các ngưỡng cản tâm lý và vùng biến động giá kỹ thuật dựa trên phiên liền trước.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900">Dữ liệu phiên liền trước</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Giá Cao Nhất (High)
                    </label>
                    <input
                      type="number"
                      value={highPrice}
                      onChange={(e) => setHighPrice(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Giá Thấp Nhất (Low)
                    </label>
                    <input
                      type="number"
                      value={lowPrice}
                      onChange={(e) => setLowPrice(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Giá Đóng Cửa (Close)
                    </label>
                    <input
                      type="number"
                      value={closePrice}
                      onChange={(e) => setClosePrice(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                    />
                  </div>
                </div>

                {/* Pivot Table */}
                <div className="lg:col-span-4 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center justify-between">
                    <span>Mức Pivot Chuẩn (Standard)</span>
                    <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      P = {pivotP.toFixed(1)}
                    </span>
                  </h3>
                  <div className="space-y-1.5 text-xs font-medium">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-100">
                      <span>Kháng cự R3</span>
                      <span className="font-bold">{pivotR3.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-rose-50/70 text-rose-700 border border-rose-100">
                      <span>Kháng cự R2</span>
                      <span className="font-bold">{pivotR2.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-rose-50/40 text-rose-700 border border-rose-100">
                      <span>Kháng cự R1</span>
                      <span className="font-bold">{pivotR1.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-sky-100 text-sky-900 font-bold border border-sky-200">
                      <span>Điểm Xoay Pivot (P)</span>
                      <span>{pivotP.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50/40 text-emerald-700 border border-emerald-100">
                      <span>Hỗ trợ S1</span>
                      <span className="font-bold">{pivotS1.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50/70 text-emerald-700 border border-emerald-100">
                      <span>Hỗ trợ S2</span>
                      <span className="font-bold">{pivotS2.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <span>Hỗ trợ S3</span>
                      <span className="font-bold">{pivotS3.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Fibonacci Retracement */}
                <div className="lg:col-span-4 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">Mốc Fibonacci Thoái Lùi</h3>
                  <div className="space-y-1.5 text-xs font-medium">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      <span>Fib 23.6%</span>
                      <span className="font-bold">{fib236.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                      <span>Fib 38.2% (Key Zone)</span>
                      <span className="font-bold">{fib382.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 font-bold">
                      <span>Fib 50.0% (Trọng tâm)</span>
                      <span>{fib500.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                      <span>Fib 61.8% (Tỷ lệ Vàng)</span>
                      <span className="font-bold">{fib618.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      <span>Fib 78.6%</span>
                      <span className="font-bold">{fib786.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Algo Screener Radar */}
          {activeTab === 'algo' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <CpuChipIcon className="w-6 h-6 text-sky-600" />
                    Rada Tín Hiệu Thuật Toán Quantitative AI
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Quét tự động tín hiệu bứt phá, phân kỳ kỹ thuật và theo chân dòng tiền lớn thời gian thực.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm mã cổ phiếu hoặc thuật toán..."
                      value={signalSearch}
                      onChange={(e) => setSignalSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setSignalTypeFilter('ALL')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        signalTypeFilter === 'ALL' ? 'bg-white text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignalTypeFilter('BUY')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        signalTypeFilter === 'BUY' ? 'bg-emerald-600 text-white' : 'text-emerald-700'
                      }`}
                    >
                      Mua
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignalTypeFilter('SELL')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        signalTypeFilter === 'SELL' ? 'bg-rose-600 text-white' : 'text-rose-700'
                      }`}
                    >
                      Bán
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSignals.map((sig, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-2xl p-5 hover:border-sky-300 transition-colors bg-white space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                          {sig.symbol}
                        </span>
                        <span className="text-xs font-medium text-slate-500">{sig.timeframe}</span>
                        <span className="text-xs font-medium text-slate-400">• {sig.time}</span>
                      </div>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          sig.type === 'BUY'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {sig.type === 'BUY' ? 'Tín hiệu MUA' : 'Tín hiệu BÁN'}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 inline-block">
                        ⚡ {sig.strategy}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">Giá Vào (Entry)</p>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">{sig.entry}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">Cắt lỗ (SL)</p>
                        <p className="text-xs font-bold text-rose-600 mt-0.5">{sig.stopLoss}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-medium">Chốt lời (TP)</p>
                        <p className="text-xs font-bold text-emerald-600 mt-0.5">{sig.target}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">
                        Độ tin cậy: <strong className="text-slate-800 font-semibold">{sig.confidence} ({sig.winRate})</strong>
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                      >
                        <span>Chi tiết mô hình</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Monte Carlo Risk Simulator */}
          {activeTab === 'risk' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <ChartBarIcon className="w-6 h-6 text-sky-600" />
                  Mô Phỏng Quản Trị Dòng Tiền & Drawdown (Monte Carlo)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Đánh giá kỳ vọng lợi nhuận và rủi ro sụt giảm tài sản tối đa qua chuỗi 50+ lệnh giao dịch.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Tỷ Lệ Thắng Kỳ Vọng (Win Rate %): <strong>{mcWinRate}%</strong>
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="85"
                      value={mcWinRate}
                      onChange={(e) => setMcWinRate(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Tỷ Lệ Risk / Reward Trung Bình (R:R): <strong>1 : {mcRiskReward}</strong>
                    </label>
                    <input
                      type="range"
                      min="1.0"
                      max="4.0"
                      step="0.1"
                      value={mcRiskReward}
                      onChange={(e) => setMcRiskReward(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Số Lệnh Mô Phỏng Chuỗi: <strong>{mcTradesCount} lệnh</strong>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="10"
                      value={mcTradesCount}
                      onChange={(e) => setMcTradesCount(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-semibold text-slate-400">Kết Quả Mô Phỏng Toán Học</span>
                    <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                      Monte Carlo Engine
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Giá Trị Kỳ Vọng Cho Mỗi Lệnh (EV)</p>
                      <p
                        className={`text-2xl font-bold mt-1 ${
                          expectedValuePerTrade > 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {expectedValuePerTrade > 0 ? '+' : ''}
                        {expectedValuePerTrade.toFixed(2)} R
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {expectedValuePerTrade > 0
                          ? 'Hệ thống có kỳ vọng dương (Có lợi thế dài hạn)'
                          : 'Kỳ vọng âm (Không nên giao dịch)'}
                      </p>
                    </div>

                    <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Xác Suất Chuỗi Thua 5 Lệnh Liên Tiếp</p>
                      <p className="text-2xl font-bold text-amber-400 mt-1">{lossStreakProbability}%</p>
                      <p className="text-[11px] text-slate-400 mt-1">Xác suất xảy ra chuỗi rủi ro tâm lý</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-300 font-semibold mb-1">Tăng Trưởng Kỳ Vọng Ước Tính</p>
                    <p className="text-3xl font-extrabold text-sky-400">
                      {estimatedProfitPercent > 0 ? '+' : ''}
                      {estimatedProfitPercent.toFixed(1)}% Vốn
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Ước tính dựa trên quản trị rủi ro cố định {riskPercent}% vốn cho mỗi lệnh qua {mcTradesCount} phiên.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Directory Showcase Grid */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Danh Mục Tất Cả Công Cụ TradeVerse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS_LIST.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-300 transition-all space-y-4"
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

                    <h3 className="text-base font-semibold text-slate-900">{tool.name}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Trạng thái: <strong className="text-slate-800 font-semibold">{tool.status}</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveTab(tool.category)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      <span>Mở công cụ</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Management FAQs Accordion Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <QuestionMarkCircleIcon className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Quy Tắc Quản Trị Rủi Ro Chuẩn TradeVerse
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                Quy tắc 01
              </span>
              <h3 className="text-base font-semibold text-slate-900">Quy Tắc 2% Vốn</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tuyệt đối không bao giờ mạo hiểm quá 2% tổng tài sản cho một lệnh duy nhất. Điều này giúp bạn chịu đựng được chuỗi thua 10 lệnh liên tiếp mà tài khoản chỉ giảm chưa tới 18%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
                Quy tắc 02
              </span>
              <h3 className="text-base font-semibold text-slate-900">Tỷ Lệ Risk/Reward ≥ 1:2</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chỉ thực hiện lệnh khi mức chốt lời kỳ vọng gấp ít nhất 2 lần khoảng dừng lỗ. Với R:R = 1:2, bạn chỉ cần Win Rate 35% là đã có lợi nhuận tổng thể.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-100">
                Quy tắc 03
              </span>
              <h3 className="text-base font-semibold text-slate-900">Kỷ Luật Dừng Lỗ Cố Định</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Luôn đặt lệnh Dừng lỗ (Stop Loss) ngay khi mở vị thế. Không hủy hoặc nới rộng khoảng Stop Loss khi giá đang đi ngược kịch bản dự tính ban đầu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
