import { useState } from 'react';
import { useMySubscriptions, useMyTransactions, useCancelTransaction, useDownloadInvoicePdf } from '../hooks';
import { UserTransactionItem } from '../types';
import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClockIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  CreditCardIcon,
  ClipboardDocumentIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { Table, Tag, Button, Modal, Empty, Dropdown, MenuProps, Tooltip } from 'antd';
import { formatDate, copyToClipboard, formatCurrency } from '@/core/utils';
import toast from 'react-hot-toast';
import { useCreatePaymentTransaction } from '@/features/paymentTransactions';
import { BillingCycle } from '@/features/membership/types';

export function TransactionHistoryView() {
  const { data: subData } = useMySubscriptions();
  const activeSub = subData?.activeSubscription || null;
  const activePlanTier = activeSub?.plan?.tierLevel || 0;

  const { data, isLoading, isFetching, refetch } = useMyTransactions();
  const transactions: UserTransactionItem[] = data || [];

  const cancelTransaction = useCancelTransaction();
  const downloadInvoicePdf = useDownloadInvoicePdf();
  const createPaymentTransaction = useCreatePaymentTransaction();

  const [selectedTx, setSelectedTx] = useState<UserTransactionItem | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleReSubscribe = async (record: UserTransactionItem) => {
    const planId = record.plan?.id;
    if (!planId) {
      toast.error('Gói hội viên không tồn tại hoặc đã ngừng cung cấp');
      return;
    }
    try {
      const newTxData = await createPaymentTransaction.mutateAsync({
        planId: Number(planId),
        billingCycle: (record.billingCycle as BillingCycle) || 'monthly',
      });

      toast.success('Đã khởi tạo đơn thanh toán mới thành công!');
      refetch();
      setSelectedTx({
        id: newTxData.id,
        code: newTxData.code,
        status: newTxData.status,
        amount: newTxData.amount,
        billingCycle: newTxData.billingCycle,
        transferContent: newTxData.transferContent,
        qrCodeUrl: newTxData.qrCodeUrl,
        expiredAt: newTxData.expiredAt,
        createdAt: (newTxData as any).createdAt || new Date().toISOString(),
        paymentAccount: newTxData.paymentAccount,
        plan: newTxData.plan as any,
      });
      setIsPayModalOpen(true);
    } catch (err: any) {
      console.error('Lỗi khi đăng ký lại:', err);
      toast.error(err?.message || 'Không thể đăng ký lại gói dịch vụ');
    }
  };


  const filteredItems = transactions.filter((item) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') {
      return item.status === 'completed' || item.status === 'active';
    }
    if (filterStatus === 'pending') {
      return item.status === 'pending' || item.status === 'pending_payment';
    }
    return item.status === filterStatus;
  });

  const handleCancelTx = async (code: string) => {
    try {
      await cancelTransaction.mutateAsync(code);
      toast.success(`Đã hủy hóa đơn #${code} thành công.`);
    } catch (error) {
      console.error('Lỗi khi hủy hóa đơn:', error);
      toast.error('Hủy hóa đơn thất bại. Vui lòng thử lại.');
    }
  };

  const columns = [
    {
      title: 'Mã hóa đơn',
      key: 'code',
      render: (record: UserTransactionItem) => {
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-primary text-xs">{record?.code}</span>
            {record?.code && (
              <button
                onClick={() => copyToClipboard(record.code, 'Đã sao chép mã hóa đơn!')}
                className="p-1 text-primary hover:bg-primary-light/50 rounded transition-colors"
                title="Sao chép mã hóa đơn"
              >
                <ClipboardDocumentIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        );
      },
    },
    {
      title: 'Gói dịch vụ',
      key: 'planName',
      render: (record: UserTransactionItem) => (
        <span className="font-semibold text-slate-900 text-xs">
          {record.plan?.name || 'Gói hội viên'}
        </span>
      ),
    },
    {
      title: 'Chu kỳ',
      key: 'billingCycle',
      render: (record: UserTransactionItem) => {
        const isYearly = record.billingCycle === 'annually' || record.billingCycle === 'yearly';
        return (
          <Tag color={isYearly ? 'purple' : 'blue'} className="!rounded-md font-medium text-[11px]">
            {isYearly ? 'Hàng năm' : 'Hàng tháng'}
          </Tag>
        );
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span className="font-bold text-slate-900 text-xs">
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: 'Thời gian',
      key: 'dates',
      render: (record: UserTransactionItem) => (
        <div className="text-xs space-y-0.5">
          <div className="text-slate-700">Tạo: {formatDate(record.createdAt)}</div>
          {record.paidAt ? (
            <div className="text-emerald-600 text-[11px] font-medium">Thanh toán: {formatDate(record.paidAt)}</div>
          ) : record.expiredAt ? (
            <div className="text-slate-400 text-[11px]">Hạn: {formatDate(record.expiredAt)}</div>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'completed' || status === 'active') {
          return (
            <Tag color="success" className="!rounded-full border-none font-medium px-2.5 py-0.5 text-[11px]">
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="w-3.5 h-3.5" />
                Thành công
              </span>
            </Tag>
          );
        }
        if (status === 'pending' || status === 'pending_payment') {
          return (
            <Tag color="warning" className="!rounded-full border-none font-medium px-2.5 py-0.5 text-[11px]">
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                Chờ thanh toán
              </span>
            </Tag>
          );
        }
        if (status === 'cancelled') {
          return (
            <Tag color="error" className="!rounded-full border-none font-medium px-2.5 py-0.5 text-[11px]">
              <span className="flex items-center gap-1">
                <XCircleIcon className="w-3.5 h-3.5" />
                Đã hủy
              </span>
            </Tag>
          );
        }
        if (status === 'expired') {
          return (
            <Tag color="default" className="!rounded-full font-medium px-2.5 py-0.5 text-[11px]">
              Đã hết hạn
            </Tag>
          );
        }
        return (
          <Tag color="default" className="!rounded-full font-medium px-2.5 py-0.5 text-[11px]">
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right' as const,
      align: 'center' as const,
      width: 90,
      render: (record: UserTransactionItem) => {
        const isDownloading = downloadInvoicePdf.isPending && downloadInvoicePdf.variables === record.code;
        const isReSubscribing = createPaymentTransaction.isPending && Number(createPaymentTransaction.variables?.planId) === Number(record.plan?.id);

        const recordPlanTier = record.plan?.tierLevel || 0;
        const isLowerOrEqualTier = activePlanTier > 0 && recordPlanTier > 0 && recordPlanTier <= activePlanTier;

        const menuItems: MenuProps['items'] = [];

        // 1. Tải hóa đơn (cho đơn completed)
        if (record.status === 'completed' || record.status === 'active') {
          menuItems.push({
            key: 'download_invoice',
            label: <span className="font-medium">Tải hóa đơn</span>,
            icon: <ArrowDownTrayIcon className="w-4 h-4 text-sky-600" />,
            onClick: () => downloadInvoicePdf.mutate(record.code),
          });
        }

        // 2. Thanh toán ngay & Hủy đơn (cho đơn pending)
        if (record.status === 'pending' || record.status === 'pending_payment') {
          menuItems.push({
            key: 'pay_now',
            disabled: isLowerOrEqualTier,
            label: (
              <Tooltip title={isLowerOrEqualTier ? 'Bạn đang sử dụng gói dịch vụ tương đương hoặc cao hơn. Không cần thanh toán.' : undefined}>
                <span className={`font-medium ${isLowerOrEqualTier ? 'text-slate-400 cursor-not-allowed' : 'text-emerald-600'}`}>
                  Thanh toán
                </span>
              </Tooltip>
            ),
            icon: <CreditCardIcon className={`w-4 h-4 ${isLowerOrEqualTier ? 'text-slate-400' : 'text-emerald-600'}`} />,
            onClick: () => {
              if (isLowerOrEqualTier) {
                toast.error('Bạn đang sử dụng gói dịch vụ tương đương hoặc cao hơn. Không thể thanh toán đơn hàng này.');
                return;
              }
              setSelectedTx(record);
              setIsPayModalOpen(true);
            },
          });

          menuItems.push({
            key: 'cancel_tx',
            label: <span className="font-medium text-red-600">Hủy đơn</span>,
            icon: <XCircleIcon className="w-4 h-4 text-red-600" />,
            danger: true,
            onClick: () => {
              Modal.confirm({
                title: 'Hủy hóa đơn',
                content: `Bạn có chắc chắn muốn hủy hóa đơn #${record.code} không?`,
                okText: 'Hủy hóa đơn',
                okType: 'danger',
                cancelText: 'Quay lại',
                onOk: () => handleCancelTx(record.code),
              });
            },
          });
        }

        // 3. Đăng ký lại gói này (cho đơn expired hoặc cancelled)
        if (record.status === 'expired' || record.status === 'cancelled') {
          menuItems.push({
            key: 're_subscribe',
            disabled: isLowerOrEqualTier,
            label: (
              <Tooltip title={isLowerOrEqualTier ? 'Bạn đang sử dụng gói dịch vụ tương đương hoặc cao hơn. Không thể đăng ký lại.' : undefined}>
                <span className={`font-medium ${isLowerOrEqualTier ? 'text-slate-400 cursor-not-allowed' : 'text-sky-600'}`}>
                  Đăng ký lại gói này
                </span>
              </Tooltip>
            ),
            icon: <ArrowPathIcon className={`w-4 h-4 ${isLowerOrEqualTier ? 'text-slate-400' : 'text-sky-600'}`} />,
            onClick: () => {
              if (isLowerOrEqualTier) {
                toast.error('Bạn đang sử dụng gói dịch vụ tương đương hoặc cao hơn. Không thể đăng ký lại gói này.');
                return;
              }
              handleReSubscribe(record);
            },
          });
        }

        if (menuItems.length === 0) return null;

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <Button
              type="text"
              size="small"
              loading={isDownloading || isReSubscribing}
              icon={<EllipsisVerticalIcon className="w-5 h-5 text-slate-600 hover:text-slate-900" />}
              className="!rounded-lg hover:!bg-slate-100 flex items-center justify-center p-1.5"
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
      {/* Header & Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CurrencyDollarIcon className="w-5 h-5 text-sky-600" />
            Hóa đơn thanh toán
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="primary"
            size="small"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            icon={<ArrowPathIcon className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />}
            className="!rounded-lg text-xs font-medium"
          >
            Làm mới
          </Button>

          {/* Filter Status Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
            {[
              { key: 'all', label: 'Tất cả' },
              { key: 'completed', label: 'Thành công' },
              { key: 'pending', label: 'Chờ thanh toán' },
              { key: 'cancelled', label: 'Đã hủy' },
              { key: 'expired', label: 'Đã hết hạn' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterStatus(tab.key)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${filterStatus === tab.key
                  ? 'bg-white text-slate-900 font-semibold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      {isLoading ? (
        <div className="space-y-3 animate-pulse py-2">
          {/* Skeleton Table Header */}
          <div className="h-10 bg-slate-100 rounded-xl w-full flex items-center px-4 justify-between">
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="h-3 bg-slate-200 rounded w-28" />
            <div className="h-3 bg-slate-200 rounded w-20" />
            <div className="h-3 bg-slate-200 rounded w-20" />
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="h-3 bg-slate-200 rounded w-16" />
          </div>
          {/* Skeleton Table Rows */}
          {[1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="h-14 bg-white border border-slate-200/70 rounded-xl w-full flex items-center px-4 justify-between gap-4"
            >
              <div className="h-4 bg-slate-200 rounded w-24" />
              <div className="h-4 bg-slate-100 rounded w-28" />
              <div className="h-4 bg-slate-100 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-6 bg-slate-100 rounded-full w-24" />
              <div className="h-8 bg-slate-100 rounded-lg w-16" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <Empty description={<span className="text-xs text-slate-500">Chưa có hóa đơn nào</span>} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            dataSource={filteredItems}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 8 }}
            className="custom-table text-xs"
          />
        </div>
      )}

      {/* Pay VietQR Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <QrCodeIcon className="w-5 h-5 text-emerald-600" />
            Thanh toán VietQR cho Hóa đơn #{selectedTx?.code}
          </div>
        }
        open={isPayModalOpen}
        onCancel={() => setIsPayModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsPayModalOpen(false)} className="!rounded-lg text-xs font-medium">
            Đóng
          </Button>,
        ]}
      >
        {selectedTx && (
          <div className="space-y-4 pt-3 text-xs">
            {selectedTx.qrCodeUrl ? (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-900">
                  <QrCodeIcon className="w-4 h-4 text-emerald-600" />
                  Mã QR Thanh toán VietQR
                </div>
                <img
                  src={selectedTx.qrCodeUrl}
                  alt="Mã VietQR"
                  className="w-48 h-48 mx-auto object-contain bg-white p-2 rounded-xl border border-slate-200"
                />
                <p className="text-[11px] text-slate-500">
                  Quét mã QR bằng ứng dụng ngân hàng và nhập đúng nội dung chuyển khoản để đơn được tự động kích hoạt.
                </p>
              </div>
            ) : null}

            {/* Bank Transfer Info Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-semibold text-slate-900 border-b border-slate-200 pb-2">
                Thông tin chuyển khoản thủ công
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="font-bold text-slate-900">
                  {selectedTx.paymentAccount?.bank?.shortName || selectedTx.bankCode || 'MBBank'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-900">
                    {selectedTx.paymentAccount?.accountNo || selectedTx.accountNo || '190368888888'}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedTx.paymentAccount?.accountNo || selectedTx.accountNo || '190368888888',
                        'Đã sao chép số tài khoản!'
                      )
                    }
                    className="p-1 text-sky-600 hover:bg-sky-50 rounded transition-colors"
                    title="Sao chép"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Chủ tài khoản:</span>
                <span className="font-semibold text-slate-900 uppercase">
                  {selectedTx.paymentAccount?.accountHolder || selectedTx.accountHolder || 'TRADEVERSE GLOBAL'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Số tiền:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-600 text-sm">
                    {formatCurrency(selectedTx.amount)}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(String(selectedTx.amount || 0), 'Đã sao chép số tiền!')
                    }
                    className="p-1 text-sky-600 hover:bg-sky-50 rounded transition-colors"
                    title="Sao chép"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-sky-50 p-2.5 rounded-lg border border-sky-100">
                <span className="text-slate-600 font-medium">Nội dung CK:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sky-700">
                    {selectedTx.transferContent || selectedTx.code}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        selectedTx.transferContent || selectedTx.code,
                        'Đã sao chép nội dung chuyển khoản!'
                      )
                    }
                    className="p-1 text-sky-600 hover:bg-sky-100 rounded transition-colors"
                    title="Sao chép nội dung"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
