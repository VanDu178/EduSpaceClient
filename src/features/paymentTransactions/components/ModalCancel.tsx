import { Modal, Button } from 'antd';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/core/utils';

export interface ModalCancelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  code?: string;
  planName?: string;
  status?: string;
  paidAmount?: number;
  isLoading?: boolean;
}

export function ModalCancel({
  isOpen,
  onClose,
  onConfirm,
  code = '',
  planName = 'dịch vụ',
  status = 'pending',
  paidAmount = 0,
  isLoading = false,
}: ModalCancelProps) {
  const isPartiallyPaid = status === 'partially_paid';

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
            <ExclamationTriangleIcon className="w-4 h-4 stroke-[2]" />
          </div>
          <span>Xác nhận hủy giao dịch</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={460}
      centered
      closeIcon={<XMarkIcon className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />}
    >
      <div className="space-y-4 pt-3">
        {/* Flat Body Content */}
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          {isPartiallyPaid ? (
            <p className="text-slate-700">
              ⚠️ <strong className="font-bold text-amber-900">Lưu ý:</strong> Hệ thống đã ghi nhận số tiền{' '}
              <strong className="font-bold text-slate-900 underline">{formatCurrency(paidAmount)}</strong> bạn đã chuyển cho giao dịch{' '}
              <strong className="font-mono font-bold text-sky-600">#{code}</strong>. Nếu xác nhận hủy, gói dịch vụ sẽ không được
              kích hoạt. Vui lòng liên hệ bộ phận <strong className="font-bold text-slate-900">CSKH TradeVerse</strong> để được hỗ trợ.
            </p>
          ) : (
            <p className="text-slate-700">
              Bạn có chắc chắn muốn hủy giao dịch <strong className="font-mono font-bold text-sky-600">#{code}</strong> cho gói{' '}
              <strong className="font-bold text-slate-900">{planName}</strong> không ?
            </p>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-slate-100">
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="!rounded-xl font-medium text-xs h-9 px-4"
          >
            Đóng / Tiếp tục thanh toán
          </Button>
          <Button
            type="primary"
            danger
            loading={isLoading}
            disabled={isLoading}
            onClick={onConfirm}
            className="!rounded-xl font-bold text-xs h-9 px-4"
          >
            Hủy giao dịch
          </Button>
        </div>
      </div>
    </Modal>
  );
}

