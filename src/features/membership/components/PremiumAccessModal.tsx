'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { XMarkIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { PremiumAccessModalProps } from '../types';
import { MascotBannerGraphic } from './MascotBannerGraphic';
import { Button } from '@/components/common';
import { subscribeMembershipPlanApi } from '../services/membershipService';

export function PremiumAccessModal({
  isOpen,
  onClose,
  postTitle,
  recommendedPlanCode = 'PRO_TRADER',
  isUpgradeTier = false,
  currentPlanName,
}: PremiumAccessModalProps) {
  const router = useRouter();
  const [selectedPlanCode, setSelectedPlanCode] = useState<string>(recommendedPlanCode);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUpgradeNow = async () => {
    setIsLoading(true);
    try {
      await subscribeMembershipPlanApi(selectedPlanCode, 'yearly');
      onClose();
      router.push('/pricing');
    } catch (error) {
      console.error('Failed to process upgrade:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPricingPage = () => {
    onClose();
    router.push('/pricing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 2. Modal Content Container */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden border border-gray-200 z-10 animate-slide-up-fade max-h-[90vh] flex flex-col justify-between">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng modal"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors flex items-center justify-center cursor-pointer"
        >
          <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Content Area */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Top Visual Banner (Mascot / Graphic Illustration Carousel) */}
          <MascotBannerGraphic />

          {/* Headline & Description */}
          <div className="space-y-2 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {postTitle
                ? `${isUpgradeTier ? 'Nâng cấp mở khóa bài viết' : 'Mở khóa bài viết'}: "${postTitle}"`
                : isUpgradeTier
                ? 'Nâng cấp hạng gói để truy cập bài viết chuyên sâu'
                : 'Mở khóa toàn bộ bài viết & phân tích chuyên sâu'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              {isUpgradeTier
                ? `Gói ${currentPlanName || 'hội viên hiện tại'} của bạn chưa bao gồm đặc quyền truy cập bài viết này. Hãy nâng cấp lên gói đề xuất bên dưới để trải nghiệm toàn bộ kiến thức chuyên sâu từ TradeVerse.`
                : 'Luyện tập và nâng cao kỹ năng giao dịch mỗi ngày cùng các chuyên gia hàng đầu TradeVerse — chỉ có trên các gói hội viên nâng cấp.'}
            </p>
          </div>

          {/* Current Plan vs Recommended Plan Selector Cards Box */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Left Card: Current Plan */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                selectedPlanCode === 'STANDARD'
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-500">
                  Gói hiện tại
                </span>
                <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                  <XMarkIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-700 mt-1 truncate">
                {currentPlanName || 'Cơ bản (Miễn phí)'}
              </h3>
            </div>

            {/* Right Card: Recommended Plan (Pro Trader / VIP) */}
            <div
              onClick={() => setSelectedPlanCode('PRO_TRADER')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                selectedPlanCode === 'PRO_TRADER'
                  ? 'border-primary bg-primary-light/30'
                  : 'border-primary/40 bg-white hover:border-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  Gói đề xuất
                </span>
                <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                  <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-1">
                Pro Trader
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 space-y-2.5 text-center">
          <Button
            type="button"
            variant="primary"
            size="lg"
            rounded="xl"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleUpgradeNow}
            className="cursor-pointer"
          >
            Trải nghiệm 30 ngày ngay
          </Button>

          <button
            type="button"
            onClick={handleViewPricingPage}
            className="text-xs font-medium text-gray-500 hover:text-primary transition-colors underline cursor-pointer"
          >
            Xem so sánh chi tiết các gói hội viên
          </button>
        </div>
      </div>
    </div>
  );
}
