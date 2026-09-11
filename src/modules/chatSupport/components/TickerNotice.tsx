'use client';

import Link from 'next/link';
import { ExclamationTriangleIcon, ArrowUpRightIcon, TicketIcon } from '@heroicons/react/24/outline';

interface TickerNoticeProps {
  redirectCountdown: number | null;
  autoConvertedTicketCode: string | null;
  onProceedToSupport?: () => void;
}

export function TickerNotice({
  redirectCountdown,
  autoConvertedTicketCode,
  onProceedToSupport,
}: TickerNoticeProps) {
  return (
    <>
      {/* Offline Notice Banner */}
      {redirectCountdown !== null && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-xs space-y-3 mb-3">
          <div className="flex items-start space-x-2.5">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-amber-900 text-sm">Admin hiện ngoài giờ trực Live Chat!</p>
              <p className="mt-1 text-slate-700 leading-relaxed">
                Vui lòng truy cập **Trung tâm hỗ trợ** trong Console để gửi yêu cầu hỗ trợ. CSKH sẽ phản hồi bạn sớm nhất.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-amber-200/80 text-xs">
            <span className="text-amber-800 font-medium">Tự động chuyển sau {redirectCountdown}s...</span>
            <Link
              href="/account?tab=support"
              onClick={onProceedToSupport}
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs transition cursor-pointer"
            >
              <span>Trung tâm hỗ trợ</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Converted Ticket Notice Banner */}
      {autoConvertedTicketCode && (
        <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl text-sky-800 text-xs flex items-start justify-between space-x-2 mb-3">
          <div className="flex items-start space-x-2">
            <TicketIcon className="w-5 h-5 flex-shrink-0 text-sky-600 mt-0.5" />
            <div>
              <p className="font-semibold text-sky-900">Cuộc trò chuyện đã được chuyển thành yêu cầu hỗ trợ</p>
            </div>
          </div>
          <Link
            href="/account?tab=support"
            className="text-xs text-sky-700 font-bold underline shrink-0 hover:text-sky-900"
          >
            Xem yêu cầu hỗ trợ ↗
          </Link>
        </div>
      )}
    </>
  );
}
