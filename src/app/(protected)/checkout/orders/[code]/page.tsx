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
} from '@heroicons/react/24/outline';
import {
  getPaymentTransactionStatusApi,
  cancelPaymentTransactionApi,
  PaymentTransactionData,
} from '@/features/paymentMethods';

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
  const redirectParam = searchParams.get('redirect') || '/blogs';

  const [transaction, setTransaction] = useState<PaymentTransactionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(15 * 60);

  // Fetch transaction detail from backend API on mount
  useEffect(() => {
    if (!code) return;
    let isMounted = true;

    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const data = await getPaymentTransactionStatusApi(code);
        if (isMounted && data) {
          setTransaction(data as PaymentTransactionData);
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin đơn hàng:', error);
        toast.error('Không tìm thấy đơn hàng hoặc đơn hàng đã bị vô hiệu.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTransaction();
    return () => {
      isMounted = false;
    };
  }, [code]);

  // Countdown Timer Logic
  useEffect(() => {
    if (!transaction || transaction.status !== 'pending') return;

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
        setTransaction((prev) => (prev ? { ...prev, status: 'expired' } : null));
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [transaction]);

  // Handle Success Flow (Toast & Redirect) - Chỉ chạy khi Backend ĐÃ duyệt thành công (status === 'completed')
  const handleSuccessRedirect = useCallback(async () => {
    try {
      // Ép Zustand xóa cache và tải lại thông tin tài khoản mới nhất vừa được Backend duyệt thành công
      const fetchMeLazy = useAuthStore.getState().fetchMeLazy;
      await fetchMeLazy(true);
    } catch (err) {
      console.error('Lỗi làm mới thông tin tài khoản:', err);
    }

    toast.success(`🎉 Thanh toán thành công! Gói VIP đã được kích hoạt.`);
    setTimeout(() => {
      router.push(redirectParam);
      router.refresh();
    }, 1500);
  }, [redirectParam, router]);

  // Polling Status Logic (every 3 seconds)
  useEffect(() => {
    if (!transaction || transaction.status !== 'pending') return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await getPaymentTransactionStatusApi(transaction.code);
        if (res.status === 'completed') {
          setTransaction((prev) => (prev ? { ...prev, status: 'completed' } : null));
          clearInterval(pollInterval);
          handleSuccessRedirect();
        } else if (res.status === 'expired' || res.status === 'cancelled') {
          setTransaction((prev) => (prev ? { ...prev, status: res.status } : null));
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Lỗi polling đơn hàng:', error);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [transaction, handleSuccessRedirect]);

  // Manual Check Handler
  const handleManualCheckStatus = async () => {
    if (!transaction) return;
    setIsCheckingStatus(true);
    try {
      const res = await getPaymentTransactionStatusApi(transaction.code);
      if (res.status === 'completed') {
        setTransaction((prev) => (prev ? { ...prev, status: 'completed' } : null));
        handleSuccessRedirect();
      } else if (res.status === 'expired') {
        setTransaction((prev) => (prev ? { ...prev, status: 'expired' } : null));
        toast.error('Mã thanh toán này đã hết hạn. Vui lòng tạo đơn mới!');
      } else {
        toast('Hệ thống chưa ghi nhận tiền vào. Vui lòng đợi trong giây lát...', { icon: '⏳' });
      }
    } catch (error) {
      console.error('Lỗi kiểm tra thủ công:', error);
      toast.error('Không thể kết nối đến máy chủ. Vui lòng thử lại!');
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // Cancel Handler
  const handleCancelTransaction = async () => {
    if (transaction && transaction.status === 'pending') {
      try {
        await cancelPaymentTransactionApi(transaction.code);
        toast.success('Đã hủy giao dịch thanh toán.');
      } catch (err) {
        console.error('Lỗi khi hủy giao dịch:', err);
      }
    }
    router.push('/checkout');
  };


  // Format Time Helper (MM:SS)
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
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
            {transaction.status === 'completed' && (
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
                <p className="text-xs text-gray-500 animate-pulse">Đang tự động chuyển hướng...</p>
              </div>
            )}

            {transaction.status === 'expired' && (
              <div className="p-6 bg-white rounded-3xl border border-gray-200 text-center space-y-4">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto border-4 border-amber-50">
                  <ExclamationTriangleIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">Đơn hàng đã hết hạn</h3>
                  <p className="text-xs text-gray-600">
                    Mã VietQR chuyển khoản chỉ có hiệu lực trong 15 phút. Vui lòng bấm nút dưới đây để tạo mã thanh toán mới.
                  </p>
                </div>
                <Button type="button" variant="primary" size="md" rounded="xl" onClick={() => router.push('/checkout')}>
                  Tạo mã thanh toán mới
                </Button>
              </div>
            )}

            {transaction.status === 'pending' && (
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
                <div className="flex flex-col items-center justify-center text-center space-y-2">
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
