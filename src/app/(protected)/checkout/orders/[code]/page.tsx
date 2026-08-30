'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  SparklesIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ClipboardDocumentIcon,
  ArrowLeftIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import {
  usePaymentTransactionStatus,
  useCancelPaymentTransaction,
  PAYMENT_TRANSACTION_STATUS_MAP,
} from '@/features/paymentTransactions';

import { useMySubscriptions } from '@/features/account';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { Button } from '@/components/common';
import { copyToClipboard, formatCurrency } from '@/core/utils';
import toast from 'react-hot-toast';

function OrderDetailContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();

  const code = (params?.code as string) || '';
  const redirectParam = searchParams.get('redirect') || '/';

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(24 * 60 * 60);

  // Fetch active user subscription to check tier level
  const { data: subData } = useMySubscriptions();
  const activeSub = subData?.activeSubscription || null;
  const activePlanTier = activeSub?.plan?.tierLevel || 0;

  // Fetch & Poll Transaction Status via React Query
  const {
    data: transactionData,
    isLoading,
    refetch,
    isFetching: isCheckingStatus,
  } = usePaymentTransactionStatus(code, {
    refetchInterval: (query) => {
      const data = query.state.data;
      return (
        data?.status === PAYMENT_TRANSACTION_STATUS_MAP.PENDING ||
        data?.status === PAYMENT_TRANSACTION_STATUS_MAP.PARTIALLY_PAID
      ) ? 3000 : false;
    },
  });

  const transaction = transactionData || null;
  const cancelTransactionMutation = useCancelPaymentTransaction();

  // Calculated properties
  const txAmount = Number(transaction?.amount || 0);
  const txPaidAmount = Number(transaction?.paidAmount || 0);
  const txOverpaidAmount = Number((transaction as any)?.overpaidAmount || Math.max(0, txPaidAmount - txAmount));
  const txRemainingAmount = Number((transaction as any)?.remainingAmount || Math.max(0, txAmount - txPaidAmount));
  const refundsList = (transaction as any)?.refunds || [];

  // Calculate if payment is blocked due to active higher/equal tier
  const txPlanTier = (transaction?.plan as any)?.tierLevel || 0;
  const isBlockedByTier = Boolean(
    transaction?.status === PAYMENT_TRANSACTION_STATUS_MAP.PENDING &&
    activePlanTier > 0 &&
    txPlanTier > 0 &&
    txPlanTier <= activePlanTier
  );

  // Countdown Timer Logic
  useEffect(() => {
    if (!transaction || (transaction.status !== PAYMENT_TRANSACTION_STATUS_MAP.PENDING && transaction.status !== PAYMENT_TRANSACTION_STATUS_MAP.PARTIALLY_PAID)) return;

    const calculateDiff = () => {
      if (!transaction.expiredAt) return 0;
      const expireTime = new Date(transaction.expiredAt).getTime();
      const nowTime = Date.now();
      return Math.max(0, Math.floor((expireTime - nowTime) / 1000));
    };

    setTimeLeftSeconds(calculateDiff());

    const timerId = setInterval(() => {
      const remaining = calculateDiff();
      setTimeLeftSeconds(remaining);
      if (remaining <= 0) {
        refetch();
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [transaction, refetch]);

  // Handle Success Flow (Toast & Redirect) - Chỉ chạy khi Backend ĐÃ duyệt thành công (status === 'completed')
  const handleSuccessRedirect = useCallback(async () => {
    try {
      const fetchMeLazy = useAuthStore.getState().fetchMeLazy;
      await fetchMeLazy(true);
    } catch (err) {
      console.error('Lỗi làm mới thông tin tài khoản:', err);
    }

    toast.success(`🎉 Thanh toán thành công! Gói ${transaction?.plan?.name} đã được kích hoạt.`);
    setTimeout(() => {
      router.push(redirectParam);
      router.refresh();
    }, 1500);
  }, [redirectParam, router]);

  // Watch status changes to trigger success redirect
  useEffect(() => {
    if (
      transaction?.status === PAYMENT_TRANSACTION_STATUS_MAP.COMPLETED ||
      transaction?.status === PAYMENT_TRANSACTION_STATUS_MAP.OVERPAID
    ) {
      handleSuccessRedirect();
    }
  }, [transaction?.status, handleSuccessRedirect]);

  // Manual Check Handler
  const handleManualCheckStatus = async () => {
    if (!code) return;
    try {
      const res = await refetch();
      if (
        res.data?.status === PAYMENT_TRANSACTION_STATUS_MAP.COMPLETED ||
        res.data?.status === PAYMENT_TRANSACTION_STATUS_MAP.OVERPAID
      ) {
        handleSuccessRedirect();
      } else if (res.data?.status === PAYMENT_TRANSACTION_STATUS_MAP.EXPIRED) {
        toast.error('Mã thanh toán này đã hết hạn. Vui lòng tạo đơn mới!');
      } else {
        toast('Hệ thống chưa ghi nhận tiền vào. Vui lòng đợi trong giây lát...', { icon: '⏳' });
      }
    } catch (error) {
      console.error('Lỗi kiểm tra thủ công:', error);
      toast.error('Không thể kết nối đến máy chủ. Vui lòng thử lại!');
    }
  };

  // Cancel Handler
  const handleCancelTransaction = async () => {
    if (transaction && transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.PENDING) {
      try {
        await cancelTransactionMutation.mutateAsync(transaction.code);
        toast.success('Đã hủy giao dịch thanh toán.');
      } catch (err) {
        console.error('Lỗi khi hủy giao dịch:', err);
      }
    }
    router.push('/checkout');
  };



  // Format Time Helper (HH:MM:SS hoặc MM:SS)
  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-gray-600">Đang kiểm tra chi tiết đơn hàng #{code}...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 p-6 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <ExclamationTriangleIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">Không tìm thấy đơn hàng</h3>
            <p className="text-xs text-gray-600">Đơn hàng #{code} không tồn tại hoặc đã bị hủy.</p>
          </div>
          <Button type="button" variant="primary" size="md" rounded="xl" fullWidth onClick={() => router.push('/checkout')}>
            Quay lại trang Thanh toán
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Đổi gói / Chọn lại đơn hàng</span>
          </button>
        </div>

        {/* Page Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: VietQR Payment Box & Actions (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                Cổng thanh toán VietQR TradeVerse
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Thanh toán Đơn hàng #{transaction.code}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Mở ứng dụng Ngân hàng hoặc Ví điện tử để quét mã QR bên dưới và xác nhận giao dịch.
              </p>
            </div>

            {/* Target Account Info */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 truncate">
                <UserCircleIcon className="w-6 h-6 text-primary shrink-0" />
                <div className="truncate">
                  <span className="text-gray-500 block text-[11px]">Tài khoản thụ hưởng đặc quyền:</span>
                  <span className="font-bold text-gray-900 text-sm truncate block">
                    {user?.email || 'user@tradeverse.com'} {user?.name ? `(${user.name})` : ''}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold shrink-0">
                Chính chủ
              </span>
            </div>

            {/* Status Views */}
            {(transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.COMPLETED ||
              transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.OVERPAID) && (
                <div className="p-8 bg-white rounded-3xl border border-gray-200 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50 animate-bounce">
                    <CheckCircleIcon className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900">Thanh toán thành công!</h3>
                    <p className="text-sm text-gray-600">
                      Gói hội viên <span className="font-bold text-primary">{transaction.plan?.name}</span> đã được kích hoạt thành công.
                    </p>
                  </div>

                  {txOverpaidAmount > 0 && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                        <SparklesIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Kích hoạt gói thành công. Ghi nhận thanh toán dư {formatCurrency(txOverpaidAmount)}</span>
                      </div>
                      <p className="text-emerald-800 text-[11px]">
                        Hệ thống đã ghi nhận số tiền thanh toán thừa của bạn. Bộ phận CSKH sẽ chủ động liên hệ hoàn trả số tiền thừa này.
                      </p>
                      {refundsList.length > 0 && (
                        <div className="pt-2 border-t border-emerald-200 space-y-2">
                          <span className="font-bold text-emerald-950 block">Lịch sử CSKH hoàn tiền dư:</span>
                          {refundsList.map((rf: any, index: number) => (
                            <div key={rf.id || index} className="p-2.5 bg-white rounded-xl border border-emerald-200 space-y-1 text-[11px]">
                              <div className="flex justify-between font-semibold text-emerald-900">
                                <span>Mã hoàn tiền: {rf.code}</span>
                                <span className="font-bold text-emerald-700">+{formatCurrency(Number(rf.amount))}</span>
                              </div>
                              {rf.refundRef && <p className="text-slate-600 font-mono">Mã NH: {rf.refundRef}</p>}
                              {rf.proofUrls && rf.proofUrls.length > 0 && (
                                <div className="pt-1">
                                  <span className="text-slate-500 font-medium block mb-1">Ảnh minh chứng hoàn tiền:</span>
                                  <div className="flex gap-2 flex-wrap">
                                    {rf.proofUrls.map((url: string, i: number) => (
                                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block w-14 h-14 rounded-lg overflow-hidden border border-slate-200 hover:opacity-80 transition-opacity">
                                        <img src={url} alt={`Minh chứng ${i + 1}`} className="w-full h-full object-cover" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 animate-pulse">Đang tự động chuyển hướng...</p>
                </div>
              )}

            {transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.PARTIALLY_PAID && (
              <div className="p-4 bg-orange-50/90 rounded-2xl border border-orange-200 text-orange-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-orange-900 text-sm">
                  <ExclamationTriangleIcon className="w-5 h-5 text-orange-600 shrink-0" />
                  <span>Đã nhận {formatCurrency(txPaidAmount)} / Cần {formatCurrency(txAmount)}. Còn thiếu {formatCurrency(txRemainingAmount)}</span>
                </div>
                <p className="text-orange-800 text-[11px] leading-relaxed">
                  Giao dịch của bạn đã nhận được <strong className="font-bold">{formatCurrency(txPaidAmount)}</strong>. Quý khách vui lòng quét mã VietQR bên dưới hoặc chuyển khoản bổ sung <strong className="font-bold text-orange-950 underline">{formatCurrency(txRemainingAmount)}</strong> với cùng nội dung <strong className="font-mono font-bold text-orange-950">{transaction.transferContent}</strong> để gói dịch vụ được kích hoạt tự động.
                </p>
              </div>
            )}

            {transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.EXPIRED && (
              <div className="p-6 bg-white rounded-3xl border border-gray-200 text-center space-y-4">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto border-4 border-amber-50">
                  <ExclamationTriangleIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">Đơn hàng đã hết hạn</h3>
                  <p className="text-xs text-gray-600">
                    Mã VietQR chuyển khoản chỉ có hiệu lực trong 24 giờ. Vui lòng bấm nút dưới đây để tạo mã thanh toán mới.
                  </p>
                </div>
                <Button type="button" variant="primary" size="md" rounded="xl" onClick={() => router.push('/checkout')}>
                  Tạo mã thanh toán mới
                </Button>
              </div>
            )}

            {(transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.PENDING || transaction.status === PAYMENT_TRANSACTION_STATUS_MAP.PARTIALLY_PAID) && (
              isBlockedByTier ? (
                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 text-center space-y-4">
                  <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto border-4 border-amber-50">
                    <ExclamationTriangleIcon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">Giao dịch bị chặn thanh toán</h3>
                    <p className="text-xs text-gray-700 leading-relaxed max-w-md mx-auto">
                      Tài khoản của bạn đã sở hữu gói dịch vụ <span className="font-bold text-amber-900">{activeSub?.plan?.name || 'tương đương hoặc cao hơn'}</span> (Cấp độ Tier {activePlanTier}).
                      Đơn hàng #{transaction.code} là gói {transaction.plan?.name || ''} (Tier {txPlanTier}) nên hệ thống không cho phép thực hiện thanh toán.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button type="button" variant="primary" size="md" rounded="xl" onClick={() => router.push('/account?tab=subscription')}>
                      Quản lý Gói dịch vụ của tôi
                    </Button>
                    <Button type="button" variant="outline" size="md" rounded="xl" onClick={() => handleCancelTransaction()}>
                      Hủy đơn hàng này
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 space-y-5">
                  {/* Timer Header Bar */}
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                      <span>Đang chờ chuyển khoản tự động...</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 text-xs">
                      <ClockIcon className="w-4 h-4" />
                      <span>{formatTime(timeLeftSeconds)}</span>
                    </div>
                  </div>

                  {/* VietQR Code Display */}
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="p-3 bg-white border-2 border-primary/40 rounded-2xl flex flex-col items-center shrink-0 space-y-1.5 overflow-hidden">
                      <div className="w-48 h-48 rounded-xl flex items-center justify-center overflow-hidden bg-slate-50 border border-slate-200">
                        {transaction.qrCodeUrl ? (
                          <img src={transaction.qrCodeUrl} alt="VietQR Code" className="w-full h-full object-contain" />
                        ) : (
                          <div className="text-xs text-gray-400">Không thể tải mã QR</div>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-600 font-semibold">
                        Quét mã VietQR bằng ứng dụng Ngân hàng / Ví điện tử
                      </span>
                    </div>

                    {/* QR Scanning UX Tip Banner */}
                    <div className="w-full p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-left text-xs text-amber-900 flex items-start gap-2.5">
                      <LightBulbIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed text-amber-900">
                        <strong className="font-bold text-amber-950">Mẹo:</strong> Khi quét mã QR bằng App Ngân hàng, <strong className="font-bold text-amber-950">Số tiền</strong> và <strong className="font-bold text-amber-950">Nội dung chuyển khoản</strong> sẽ tự động điền chính xác. Quý khách vui lòng <span className="font-bold text-amber-950 underline">không sửa nội dung chuyển khoản</span> để gói dịch vụ được kích hoạt tự động tức thì.
                      </div>
                    </div>
                  </div>

                  {/* Transfer Info Details */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-500">Ngân hàng thụ hưởng:</span>
                      <span className="font-bold text-gray-900">
                        {transaction.paymentAccount?.bank?.name || transaction.bankCode || 'MB Bank'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-500">Số tài khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-gray-900 text-sm">
                          {transaction.accountNo || '0399998888'}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(transaction.accountNo || '', 'Đã sao chép số tài khoản!')}
                          className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                          title="Sao chép số tài khoản"
                        >
                          <ClipboardDocumentIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-500">Chủ tài khoản:</span>
                      <span className="font-bold text-gray-900 uppercase">
                        {transaction.accountHolder || 'CONG TY TRADEVERSE VIP'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-gray-500">Số tiền thanh toán:</span>
                      <span className="font-bold text-primary text-base">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>

                    {/* Transfer Content Highlight Box */}
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-emerald-900 uppercase">
                          Nội dung chuyển khoản (Bắt buộc):
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(transaction.transferContent, 'Đã sao chép nội dung chuyển khoản!')}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          <ClipboardDocumentIcon className="w-3 h-3" />
                          <span>Sao chép</span>
                        </button>
                      </div>
                      <p className="font-mono text-base font-extrabold text-emerald-800 tracking-wider">
                        {transaction.transferContent}
                      </p>
                      <p className="text-[10px] text-emerald-700">
                        ⚠️ Quý khách vui lòng điền <span className="font-bold">chính xác tuyệt đối</span> nội dung trên để hệ thống tự động kích hoạt gói ngay lập tức.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      rounded="xl"
                      fullWidth
                      isLoading={isCheckingStatus}
                      disabled={isCheckingStatus}
                      onClick={handleManualCheckStatus}
                      className="cursor-pointer font-bold py-3.5 text-base"
                    >
                      <ArrowPathIcon className="w-5 h-5 mr-1.5 inline-block" />
                      Tôi đã chuyển khoản (Kiểm tra ngay)
                    </Button>

                    <button
                      type="button"
                      disabled={isCheckingStatus}
                      onClick={handleCancelTransaction}
                      className={`w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer text-center ${isCheckingStatus ? 'pointer-events-none opacity-50' : ''
                        }`}
                    >
                      Hủy giao dịch này / Chọn phương thức khác
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary & Guarantee Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl border border-gray-200 space-y-6 p-5 sm:p-6">
              <div className="space-y-3 pb-5 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900 flex items-center justify-between">
                  <span>Tóm tắt đơn hàng</span>
                  <span className="text-xs font-mono text-primary font-bold">#{transaction.code}</span>
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Gói đã chọn:</span>
                    <span className="font-bold text-gray-900">{transaction.plan?.name || 'Hội viên'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chu kỳ thanh toán:</span>
                    <span className="font-medium text-gray-800">
                      {transaction.billingCycle === 'yearly' ? 'Theo năm (365 ngày)' : 'Theo tháng (30 ngày)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phương thức:</span>
                    <span className="font-semibold text-emerald-700">VietQR Chuyển khoản</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">Tổng thanh toán:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-900">
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <ShieldCheckIcon className="w-4 h-4 text-amber-700" />
                  <span>Cam kết dịch vụ TradeVerse</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-amber-800 list-disc list-inside">
                  <li>Tự động duyệt gói trong 10-30 giây sau khi chuyển khoản thành công.</li>
                  <li>Hoàn tiền 100% trong 7 ngày nếu không hài lòng dịch vụ.</li>
                  <li>Hỗ trợ kỹ thuật 24/7 trực tiếp qua Telegram / Hotline.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DedicatedOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 text-gray-900 p-8">Đang tải đơn hàng...</div>}>
      <OrderDetailContent />
    </Suspense>
  );
}
