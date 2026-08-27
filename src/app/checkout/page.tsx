'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  QrCodeIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { BillingCycle, MembershipPlan, PaymentMethod } from '@/features/membership/types';
import { getMembershipPlansApi, getDefaultPaymentAccountApi, ActivePaymentAccount } from '@/features/membership/services/membershipService';
import {
  createPaymentTransactionApi,
  fetchActivePaymentMethodsApi,
  ActivePaymentMethod,
  PaymentMethodIcon,
  DEFAULT_FALLBACK_PAYMENT_METHODS,
} from '@/features/paymentMethods';
import { Button } from '@/components/common';
import toast from 'react-hot-toast';



function CheckoutContent() {

  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters
  const planCodeParam = searchParams.get('plan') || 'PRO_TRADER';
  const initialBillingParam = (searchParams.get('billing') as BillingCycle) || 'yearly';
  const redirectParam = searchParams.get('redirect') || '/blogs';

  // Component state
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [paymentAccount, setPaymentAccount] = useState<ActivePaymentAccount | null>(null);
  const [activePaymentMethods, setActivePaymentMethods] = useState<ActivePaymentMethod[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(initialBillingParam);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vietqr');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Fetch membership plans, default payment account & active payment methods
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoadingPlans(true);
      try {
        const [plansData, accountData, methodsData] = await Promise.all([
          getMembershipPlansApi(),
          getDefaultPaymentAccountApi(),
          fetchActivePaymentMethodsApi(),
        ]);
        if (isMounted) {
          setPlans(plansData);
          setPaymentAccount(accountData);
          if (methodsData && methodsData.length > 0) {
            setActivePaymentMethods(methodsData);
            setPaymentMethod(methodsData[0].code as PaymentMethod);
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu thanh toán:', error);
      } finally {
        if (isMounted) {
          setIsLoadingPlans(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic Payment Methods layout calculation
  const displayPaymentMethods =
    activePaymentMethods.length > 0 ? activePaymentMethods : DEFAULT_FALLBACK_PAYMENT_METHODS;
  const totalMethodsCount = displayPaymentMethods.length;

  const getGridContainerClass = (count: number) => {
    if (count === 1) return 'grid grid-cols-1 gap-2.5';
    if (count === 2) return 'grid grid-cols-2 gap-2.5';
    return 'grid grid-cols-3 gap-2.5';
  };

  const getItemSpanClass = (count: number, index: number) => {
    if (count === 4 && index === 3) {
      return 'col-span-3';
    }
    return 'col-span-1';
  };

  // Selected Plan Object

  const selectedPlan: MembershipPlan | undefined =
    plans.find((p) => p.code.toLowerCase() === planCodeParam.toLowerCase()) ||
    plans.find((p) => p.monthlyPrice > 0) ||
    plans[0];

  const monthlyPrice = selectedPlan?.monthlyPrice || 0;
  const yearlyPrice = selectedPlan?.yearlyPrice || monthlyPrice * 12;
  const yearlyDiscountPercent =
    selectedPlan?.yearlyDiscountPercent ||
    (monthlyPrice > 0 ? Math.round(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100) : 0);
  const monthlyEqPrice = yearlyPrice > 0 ? Math.round(yearlyPrice / 12) : 0;
  const totalSavings = monthlyPrice * 12 - yearlyPrice;

  const finalPrice = selectedCycle === 'yearly' ? yearlyPrice : monthlyPrice;

  // Date Calculation Helper
  const now = new Date();
  const formatDate = (date: Date) =>
    date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const startDateStr = formatDate(now);
  const expiryDate = new Date(now);
  if (selectedCycle === 'yearly') {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  } else {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  }
  const expiryDateStr = formatDate(expiryDate);
  const daysCount = selectedCycle === 'yearly' ? 365 : 30;

  const handleConfirmPayment = async () => {
    if (!selectedPlan?.id) {
      toast.error('Gói hội viên không hợp lệ. Vui lòng thử lại!');
      return;
    }

    if (paymentMethod === 'vietqr' || paymentMethod === 'qr_banking') {
      setIsProcessing(true);
      try {
        const txData = await createPaymentTransactionApi(selectedPlan.id, selectedCycle);
        toast.success('Khởi tạo đơn thanh toán thành công!');
        router.push(`/checkout/orders/${txData.code}?redirect=${encodeURIComponent(redirectParam)}`);
      } catch (error: any) {
        console.error('Lỗi khi tạo giao dịch thanh toán:', error);
        toast.error(error?.response?.data?.message || error.message || 'Không thể tạo đơn thanh toán. Vui lòng thử lại!');
      } finally {
        setIsProcessing(false);
      }
    } else {
      toast('Phương thức thanh toán qua Thẻ/Ví điện tử đang được kết nối cổng tự động. Vui lòng chọn VietQR!', {
        icon: 'ℹ️',
      });
    }
  };

  if (isLoadingPlans) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-gray-600">Đang chuẩn bị màn hình thanh toán an toàn TradeVerse...</p>
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
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Quay lại trang trước</span>
          </button>
        </div>

        {/* Page Main Grid (Desktop 12 columns: Left 7 cols, Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Order Details & Customization (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title Section */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Nâng cấp Gói {selectedPlan?.name || 'Pro Trader'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {selectedPlan?.tagLine || 'Mở khóa toàn bộ đặc quyền bài viết VIP, phân tích chuyên sâu & bộ công cụ Quant.'}
              </p>
            </div>

            {/* Block 1: Choose Billing Cycle (Month ↔ Year Selector) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                1. Chọn chu kỳ thanh toán
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A: Monthly */}
                <div
                  onClick={() => setSelectedCycle('monthly')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${selectedCycle === 'monthly'
                    ? 'border-primary bg-primary-light/20 text-gray-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">Theo tháng</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCycle === 'monthly'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white'
                        }`}
                    >
                      {selectedCycle === 'monthly' && <CheckIcon className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {monthlyPrice > 0 ? `${monthlyPrice.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                      <span className="text-xs font-normal text-gray-500"> / tháng</span>
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">Thanh toán linh hoạt từng tháng (30 ngày)</p>
                  </div>
                </div>

                {/* Option B: Yearly (Recommended) */}
                <div
                  onClick={() => setSelectedCycle('yearly')}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${selectedCycle === 'yearly'
                    ? 'border-primary bg-primary-light/20 text-gray-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                >
                  {/* Discount Badge */}
                  {yearlyDiscountPercent > 0 && (
                    <span className="absolute -top-3 right-4 px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-md shadow-2xs">
                      Tiết kiệm {yearlyDiscountPercent}%
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">Theo năm (Ưu đãi tốt nhất)</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCycle === 'yearly'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white'
                        }`}
                    >
                      {selectedCycle === 'yearly' && <CheckIcon className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">
                      {yearlyPrice > 0 ? `${yearlyPrice.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                      <span className="text-xs font-normal text-gray-500"> / năm</span>
                    </p>
                    {monthlyEqPrice > 0 && (
                      <p className="text-[11px] text-emerald-700 font-medium mt-1">
                        Chỉ ~{monthlyEqPrice.toLocaleString('vi-VN')}đ / tháng
                        {totalSavings > 0 && ` (Giảm ${totalSavings.toLocaleString('vi-VN')}đ)`}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Activation & Duration Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 text-primary shrink-0" />
                  <span>Ngày kích hoạt: <strong className="font-bold text-gray-900">{startDateStr}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-semibold text-[11px]">
                    Thời hạn {daysCount} ngày
                  </span>
                  <span>Từ <strong className="font-semibold text-gray-900">{startDateStr}</strong> đến <strong className="font-semibold text-primary">{expiryDateStr}</strong></span>
                </div>
              </div>
            </div>

            {/* Block 4: Included Features Checklist */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                2. Đặc quyền bạn sẽ nhận được
              </label>

              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3">
                {selectedPlan?.features && selectedPlan.features.length > 0 ? (
                  selectedPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div
                        className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center ${feature.isIncluded
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-200 text-gray-400'
                          }`}
                      >
                        {feature.isIncluded ? (
                          <CheckIcon className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <XMarkIcon className="w-3 h-3 stroke-[2.5]" />
                        )}
                      </div>
                      <span
                        className={`font-medium ${feature.isIncluded ? 'text-gray-800' : 'text-gray-400 line-through'
                          }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                    Mở khóa toàn bộ bài viết VIP, báo cáo phân tích chuyên sâu & công cụ Quant.
                  </div>
                )}
              </div>
            </div>

            {/* Block 5: Risk Reversal & Guarantees */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <ShieldCheckIcon className="w-4 h-4 text-amber-700" />
                <span>Chính sách cam kết & Bảo vệ người dùng TradeVerse</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-amber-800 list-disc list-inside">
                <li>Hủy tự động gia hạn bất kỳ lúc nào chỉ với 1-click trong Cài đặt tài khoản.</li>
                <li>Cam kết hoàn tiền 100% trong vòng 7 ngày nếu dịch vụ không đáp ứng kỳ vọng.</li>
                <li>Thanh toán mã hóa tuyệt đối, không chi phí ẩn, không ràng buộc hợp đồng.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Payment Gateway Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl border border-gray-200 space-y-6 p-5 sm:p-6">
              {/* Order Summary Header */}
              <div className="space-y-3 pb-5 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900 flex items-center justify-between">
                  <span>Tóm tắt đơn hàng</span>
                  <span className="text-xs font-mono text-gray-500 font-semibold">
                    {`Gói ${selectedPlan?.code || 'PRO'}`}
                  </span>
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Gói đã chọn:</span>
                    <span className="font-bold text-gray-900">{selectedPlan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chu kỳ thanh toán:</span>
                    <span className="font-medium text-gray-800">
                      {selectedCycle === 'yearly' ? 'Theo năm (365 ngày)' : 'Theo tháng (30 ngày)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-semibold text-gray-800">
                      {selectedCycle === 'yearly'
                        ? `${(monthlyPrice * 12).toLocaleString('vi-VN')}đ`
                        : `${monthlyPrice.toLocaleString('vi-VN')}đ`}
                    </span>
                  </div>

                  {selectedCycle === 'yearly' && totalSavings > 0 && (
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>Giảm giá ưu đãi năm:</span>
                      <span>-{totalSavings.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">Tổng cộng thanh toán:</span>
                  <span className="text-xl font-bold text-primary">
                    {finalPrice > 0 ? `${finalPrice.toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                  </span>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Phương thức thanh toán
                </label>

                <div className={getGridContainerClass(totalMethodsCount)}>
                  {displayPaymentMethods.map((method, index) => {
                    const isSelected = paymentMethod === method.code;
                    return (
                      <button
                        key={method.id || method.code}
                        type="button"
                        onClick={() => setPaymentMethod(method.code as PaymentMethod)}
                        className={`p-2.5 rounded-xl border transition-all flex flex-col items-center justify-center text-center gap-1 cursor-pointer ${getItemSpanClass(
                          totalMethodsCount,
                          index
                        )} ${
                          isSelected
                            ? 'border-primary bg-primary-light/20 text-primary font-bold'
                            : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <PaymentMethodIcon iconName={method.icon} className="w-5 h-5" />
                        <span className="text-[10px] sm:text-[11px] truncate max-w-full px-1">{method.name}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Payment Details per Active Method */}
              {(paymentMethod === 'vietqr' || paymentMethod === 'qr_banking') && (
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0 border border-emerald-200">
                      <QrCodeIcon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 text-xs text-emerald-950">
                      <h4 className="font-bold text-sm text-emerald-900">Thanh toán tự động qua VietQR</h4>
                      <p className="text-[11px] leading-relaxed text-emerald-800">
                        Mã QR Code động và Nội dung chuyển khoản duy nhất sẽ được hệ thống sinh tự động ngay sau khi bạn bấm nút <span className="font-bold">Xác nhận & Thanh toán ngay</span>.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/80 text-[11px] text-emerald-900 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Ngân hàng thụ hưởng:</span>
                      <span className="font-bold">{paymentAccount?.bankName || 'MB Bank (Quân Đội)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Số tài khoản:</span>
                      <span className="font-mono font-bold">{paymentAccount?.accountNo || '0399998888'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Chủ tài khoản:</span>
                      <span className="font-bold uppercase">{paymentAccount?.accountHolder || 'CONG TY TRADEVERSE VIP'}</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700">Số thẻ Visa / Mastercard / ATM</label>
                    <input
                      type="text"
                      defaultValue="4123 •••• •••• 9999"
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono text-sm text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-700">Tên trên thẻ</label>
                      <input
                        type="text"
                        defaultValue="NGUYEN VAN A"
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-medium text-sm text-gray-900 uppercase focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-700">MM/YY</label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono text-sm text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-gray-700">CVC</label>
                        <input
                          type="password"
                          defaultValue="888"
                          maxLength={3}
                          className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono text-sm text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'e_wallet' && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center space-y-3">
                  <p className="text-xs font-semibold text-gray-700">Quét mã và xác nhận giao dịch bằng ví điện tử</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-3 py-1 bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold rounded-lg">MoMo</span>
                    <span className="px-3 py-1 bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold rounded-lg">ZaloPay</span>
                    <span className="px-3 py-1 bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold rounded-lg">ShopeePay</span>
                  </div>
                </div>
              )}

              {/* Confirm Checkout Action Button */}
              <Button
                type="button"
                variant="primary"
                size="lg"
                rounded="xl"
                fullWidth
                isLoading={isProcessing}
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="cursor-pointer font-bold py-3.5 text-base"
              >
                Xác nhận & Thanh toán ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 text-gray-900 p-8">Đang tải trang thanh toán...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
