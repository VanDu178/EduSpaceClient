'use client';

import { useRouter } from 'next/navigation';
import {
  DocumentMagnifyingGlassIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/common';
import { APP_ROUTES } from '@/core/config/routes';

export interface OrderNotFoundViewProps {
  code?: string;
}

export function OrderNotFoundView({ code }: OrderNotFoundViewProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border-4 border-rose-50/50">
          <DocumentMagnifyingGlassIcon className="w-8 h-8 stroke-[1.75]" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Không tìm thấy giao dịch</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Giao dịch{' '}
            <code className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              #{code || 'N/A'}
            </code>{' '}
            không tồn tại hoặc đường dẫn thanh toán không chính xác.
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Button
            type="button"
            variant="primary"
            size="md"
            rounded="xl"
            fullWidth
            onClick={() => router.push(APP_ROUTES.PRICING)}
            className="cursor-pointer font-bold py-3"
          >
            <SparklesIcon className="w-4 h-4 mr-1.5 inline-block" />
            Tạo giao dịch khác
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            rounded="xl"
            fullWidth
            onClick={() => router.push('/account?tab=transactions')}
            className="cursor-pointer font-medium py-2.5"
          >
            Lịch sử giao dịch
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-start gap-2.5 text-left text-[11px] text-gray-500 bg-slate-50/80 p-3 rounded-2xl border border-slate-200/60">
          <QuestionMarkCircleIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            Bạn đã chuyển khoản nhưng gặp sự cố này? {" "} Vui lòng liên hệ bộ phận {" "}
            <strong className="font-bold text-amber-950">CSKH TradeVerse</strong> để được hỗ
            trợ.
          </p>
        </div>
      </div>
    </div>
  );
}
