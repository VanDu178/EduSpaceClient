'use client';

import { useRouter } from 'next/navigation';
import { ClockIcon, SparklesIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common';
import { APP_ROUTES } from '@/core/config/routes';

export interface OrderExpiredViewProps {
  code?: string;
}

export function OrderExpiredView({ code }: OrderExpiredViewProps) {
  const router = useRouter();

  return (
    <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 text-center space-y-5">
      <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto border-4 border-amber-50">
        <ClockIcon className="w-9 h-9 stroke-[1.75]" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-gray-900">Mã thanh toán đã hết hạn</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Mã VietQR chuyển khoản cho giao dịch{' '}
          <strong className="font-mono font-bold text-gray-800">#{code || 'N/A'}</strong> chỉ có
          hiệu lực trong 24 giờ và đã quá thời hạn xử lý.
        </p>
      </div>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          rounded="xl"
          onClick={() => router.push(APP_ROUTES.PRICING)}
          className="cursor-pointer font-bold w-full sm:w-auto px-6"
        >
          <SparklesIcon className="w-4 h-4 mr-1.5 inline-block" />
          Tạo giao dịch khác
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          rounded="xl"
          onClick={() => router.push('/account?tab=transactions')}
          className="cursor-pointer font-medium w-full sm:w-auto px-6"
        >
          Lịch sử giao dịch
        </Button>
      </div>
      <div className="pt-3 border-t border-gray-100 text-left text-[11px] text-amber-900 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60 flex items-start gap-2">
        <LightBulbIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong className="font-bold text-amber-950">Lưu ý:</strong> Trường hợp bạn vừa thực hiện
          chuyển khoản sau khi mã hết hạn, vui lòng liên hệ bộ phận <strong className="font-bold text-amber-950">CSKH TradeVerse</strong> để được hổ trợ.
        </p>
      </div>
    </div>
  );
}
