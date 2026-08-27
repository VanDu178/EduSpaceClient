'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FeatureHighlightSlide } from '../types';
import { CoddyMascotIllustration } from '@/features/blogs/components/CoddyMascotIllustrations';

const FEATURE_SLIDES: FeatureHighlightSlide[] = [
  {
    id: 1,
    title: 'Phân tích kịch bản giao dịch theo thời gian thực',
    description: 'Thực hành dự đoán nhịp tăng giảm thị trường, phân tích xu hướng kỹ thuật chuyên sâu chỉ có trên gói hội viên.',
    badgeText: 'Kịch bản VIP',
    illustrationType: 'quant',
  },
  {
    id: 2,
    title: 'Mở khóa kho bài viết & Báo cáo độc quyền',
    description: 'Truy cập hàng trăm bài phân tích tư duy, chiến lược Quant và phương pháp quản trị rủi ro tối ưu.',
    badgeText: 'Kiến thức VIP',
    illustrationType: 'tuduy',
  },
  {
    id: 3,
    title: 'Bộ chỉ báo Quant & Tín hiệu thị trường 24/7',
    description: 'Nhận thông báo biến động và chiến lược giao dịch tự động hóa trực tiếp từ chuyên gia TradeVerse.',
    badgeText: 'Công cụ Quant',
    illustrationType: 'phuongphap',
  },
];

interface MascotBannerGraphicProps {
  onSlideChange?: (slide: FeatureHighlightSlide) => void;
  className?: string;
  layout?: 'banner' | 'sidebar';
}

export function MascotBannerGraphic({
  onSlideChange,
  className = '',
  layout = 'sidebar',
}: MascotBannerGraphicProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURE_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = FEATURE_SLIDES[currentIndex];

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(activeSlide);
    }
  }, [currentIndex, onSlideChange, activeSlide]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FEATURE_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURE_SLIDES.length);
  };

  const isSidebar = layout === 'sidebar';

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-white flex flex-col justify-between ${className}`}
    >
      {/* Top Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-950 pointer-events-none" />

      {/* Slide Visual Graphic Area */}
      <div
        className={`relative z-10 p-3.5 sm:p-4 flex flex-col ${
          isSidebar ? 'items-center text-center gap-3 min-h-[160px]' : 'sm:flex-row items-center gap-4 min-h-[180px]'
        }`}
      >
        {/* Mascot Illustration Container */}
        <div
          className={`${
            isSidebar
              ? 'w-full aspect-[16/9] max-h-[105px]'
              : 'w-full sm:w-2/5 aspect-[16/10] max-h-[130px]'
          } bg-slate-800/80 border border-slate-700/60 rounded-xl p-1.5 flex items-center justify-center relative overflow-hidden shrink-0`}
        >
          <div className="absolute top-1.5 left-1.5 z-20">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold border border-cyan-500/30">
              <SparklesIcon className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
              {activeSlide.badgeText}
            </span>
          </div>

          <CoddyMascotIllustration
            type={activeSlide.illustrationType}
            className="w-full h-full object-contain max-h-[90px]"
          />
        </div>

        {/* Content Text */}
        <div
          className={`${
            isSidebar ? 'w-full space-y-1 text-center' : 'w-full sm:w-3/5 space-y-1.5 text-left'
          }`}
        >
          <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
            {activeSlide.title}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {activeSlide.description}
          </p>
        </div>
      </div>

      {/* Bottom Controls Bar (Carousel indicators & navigation buttons) */}
      <div className="relative z-10 px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Slide trước"
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Slide tiếp"
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center gap-1.5">
          {FEATURE_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Chuyển đến slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-5 bg-cyan-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Slide Step indicator */}
        <span className="text-[10px] font-medium text-slate-400">
          {currentIndex + 1} / {FEATURE_SLIDES.length}
        </span>
      </div>
    </div>
  );
}
