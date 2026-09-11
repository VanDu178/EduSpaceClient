'use client';

import { QrCodeIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Modal, Button } from 'antd';
import { copyToClipboard, formatCurrency } from '@/core/utils';
import { UserTransactionItem } from '../types';

export interface PayVietQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTx: UserTransactionItem | null;
}

export function PayVietQrModal({ isOpen, onClose, selectedTx }: PayVietQrModalProps) {
  if (!selectedTx) return null;

  const isSelectedPartiallyPaid = selectedTx.status === 'partially_paid';
  const modalTxRemaining = Number(
    (selectedTx as any)?.remainingAmount ||
      Math.max(0, Number(selectedTx.amount || 0) - Number((selectedTx as any)?.paidAmount || 0))
  );
  const modalDisplayAmount = isSelectedPartiallyPaid ? modalTxRemaining : Number(selectedTx.amount || 0);
  const modalQrCodeUrl =
    isSelectedPartiallyPaid && selectedTx.qrCodeUrl
      ? selectedTx.qrCodeUrl.replace(/amount=\d+/, `amount=${modalDisplayAmount}`)
      : selectedTx.qrCodeUrl;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <QrCodeIcon className="w-5 h-5 text-emerald-600" />
          Thanh toán VietQR cho Hóa đơn #{selectedTx.code}
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={680}
      footer={[
        <Button key="close" onClick={onClose} className="!rounded-lg text-xs font-medium">
          Đóng
        </Button>,
      ]}
    >
      <div className="space-y-4 pt-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Left Column: VietQR Code */}
          {modalQrCodeUrl && (
            <div className="md:col-span-5 bg-slate-50/80 rounded-2xl border border-slate-100 p-4 text-center flex flex-col items-center justify-center space-y-2.5">
              <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                <img
                  src={modalQrCodeUrl}
                  alt="Mã VietQR"
                  className="w-40 h-40 object-contain mx-auto"
                />
              </div>
              <span>Quét mã VietQR bằng ứng dụng Ngân hàng / Ví điện tử</span>
            </div>
          )}

          {/* Right Column: Flat List Details */}
          <div className={`${modalQrCodeUrl ? 'md:col-span-7' : 'md:col-span-12'} space-y-3`}>
            <div className="font-semibold text-slate-900 pb-1 text-xs flex items-center justify-between border-b border-slate-100">
              <span>Thông tin chuyển khoản thủ công</span>
              <span className="text-[11px] text-slate-400 font-normal">Chuyển khoản 24/7</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {/* Bank Name */}
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {selectedTx.paymentAccount?.bank?.name}
                </span>
              </div>

              {/* Account No */}
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                    {selectedTx.paymentAccount?.accountNo || selectedTx.accountNo || '190368888888'}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedTx.paymentAccount?.accountNo || selectedTx.accountNo || '190368888888',
                        'Đã sao chép số tài khoản!'
                      )
                    }
                    className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    title="Sao chép"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Account Holder */}
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Chủ tài khoản:</span>
                <span className="font-bold text-slate-900 uppercase text-xs sm:text-sm">
                  {selectedTx.paymentAccount?.accountHolder || selectedTx.accountHolder || 'TRADEVERSE GLOBAL'}
                </span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Số tiền thanh toán:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sky-600 text-xs sm:text-sm">
                    {formatCurrency(modalDisplayAmount)}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(String(modalDisplayAmount || 0), 'Đã sao chép số tiền!')
                    }
                    className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    title="Sao chép"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Transfer Content */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-0.5">
                  <span className="text-slate-500">Nội dung chuyển khoản</span>
                  <span className="text-rose-500 font-bold text-sm leading-none ml-0.5">*</span>
                  <span className="text-slate-500">:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
                    {selectedTx.transferContent || selectedTx.code}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedTx.transferContent || selectedTx.code,
                        'Đã sao chép nội dung chuyển khoản!'
                      )
                    }
                    className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    title="Sao chép nội dung"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note banner at bottom */}
        <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 leading-tight">
          ⚠️ <strong className="font-semibold text-amber-950">Lưu ý:</strong> Vui lòng giữ{' '}
          <strong className="font-bold text-amber-950">chính xác tuyệt đối nội dung chuyển khoản trên</strong> để hệ
          thống tự động kích hoạt giao dịch.
        </div>
      </div>
    </Modal>
  );
}
