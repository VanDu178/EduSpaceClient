import { InboxIcon } from '@heroicons/react/24/outline';

export interface MembershipPlanEmptyProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function MembershipPlanEmpty({
  title = 'Chưa có gói hội viên nào',
  message = 'Hiện tại hệ thống chưa mở bán gói hội viên nào hoặc các gói đang được cập nhật. Vui lòng quay lại sau.',
  onRetry,
}: MembershipPlanEmptyProps) {
  return (
    <div className="py-8 px-4 text-center space-y-4 max-w-lg mx-auto">
      <div className="w-14 h-14 bg-primary-light/40 text-primary rounded-full flex items-center justify-center mx-auto">
        <InboxIcon className="w-7 h-7 stroke-1.5" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-primary bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Tải lại trang
          </button>
        </div>
      )}
    </div>
  );
}
