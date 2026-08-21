"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Input } from "antd";
import { toast } from "react-hot-toast";
import {
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BoltIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { resetPasswordApi } from "@/features/auth";

function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");
    if (emailParam || otpParam) {
      form.setFieldsValue({
        email: emailParam || "",
        otp: otpParam || "",
      });
    }
  }, [searchParams, form]);

  const handleResetPassword = async (values: {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Xác nhận mật khẩu mới không khớp!");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordApi({
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      });
      toast.success(
        res?.message || "Đặt lại mật khẩu thành công! Đang chuyển đến Đăng nhập..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Đặt lại mật khẩu thất bại. Vui lòng kiểm tra lại thông tin mã OTP!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-slate-50 dark:bg-[#070d19] transition-colors duration-300">
      {/* Background Ambient Glow FX */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-sky-200/50 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Quant Mascot */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Đặt Lại Mật Khẩu <br className="hidden sm:inline" />
            <span className="text-sky-600 dark:text-cyan-400">TradeVerse</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Nhập mã OTP xác nhận và khởi tạo mật khẩu mới an toàn cho tài khoản TradeVerse của bạn.
          </p>

          <div className="relative w-full max-w-md h-80 sm:h-96 flex items-center justify-center my-4">
            <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-sky-400/40 dark:border-cyan-500/30 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-indigo-400/40 dark:border-indigo-500/30 pointer-events-none" />

            <div className="relative w-44 h-44 sm:w-52 sm:h-52 z-10 transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/mascot-quant-robot.png"
                alt="TradeVerse Quant Robot Mascot"
                fill
                priority
                className="object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              />
            </div>

            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 transition-transform duration-300 hover:scale-110">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sky-100 via-sky-50 to-white dark:from-cyan-950 dark:via-sky-950 dark:to-slate-950 border-2 border-sky-400 dark:border-cyan-400 backdrop-blur-md flex flex-col items-center justify-center text-center p-2">
                <ChartBarIcon className="w-4 h-4 text-sky-600 dark:text-cyan-400 mb-0.5 shrink-0" />
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter leading-none">
                  WIN RATE
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-sky-600 dark:text-cyan-300 leading-tight">
                  46%
                </span>
              </div>
            </div>

            <div className="absolute top-16 right-0 sm:right-2 z-20 transition-transform duration-300 hover:scale-110">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-white dark:from-emerald-950 dark:via-teal-950 dark:to-slate-950 border-2 border-emerald-400 dark:border-emerald-400 backdrop-blur-md flex flex-col items-center justify-center text-center p-2">
                <BoltIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-0.5 shrink-0" />
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter leading-none">
                  R:R
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-300 leading-tight">
                  1:4
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 left-6 sm:left-10 z-20 transition-transform duration-300 hover:scale-110">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-100 via-orange-50 to-white dark:from-amber-950 dark:via-orange-950 dark:to-slate-950 border-2 border-amber-400 dark:border-amber-400 backdrop-blur-md flex flex-col items-center justify-center text-center p-2">
                <ArrowTrendingDownIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-0.5 shrink-0" />
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter leading-none">
                  MAX DD
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-300 leading-tight">
                  -25%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: HUD Reset Form Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white dark:bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-slate-200/90 dark:border-cyan-500/30 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-sky-500 dark:via-cyan-400 to-transparent" />

            <div className="mb-4">
              <Link
                href="/login"
                onClick={(e) => {
                  if (loading) e.preventDefault();
                }}
                className={`inline-flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors ${
                  loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" /> Quay lại Đăng nhập
              </Link>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1">
                Đặt lại mật khẩu
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nhập Email, mã OTP 6 chữ số và tạo Mật khẩu mới
              </p>
            </div>

            <Form
              form={form}
              name="reset_password_form"
              layout="vertical"
              onFinish={handleResetPassword}
              autoComplete="off"
              size="large"
              disabled={loading}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ Email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<EnvelopeIcon className="w-5 h-5 text-sky-500/80 dark:text-cyan-400/80 mr-2" />}
                  placeholder="Địa chỉ Email"
                  className="!bg-slate-50 dark:!bg-slate-950/90 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 placeholder:!text-slate-400 dark:placeholder:!text-slate-500 hover:!border-sky-500 dark:hover:!border-cyan-500/60 focus:!shadow-none focus-within:!shadow-none focus:!border-slate-200 dark:focus:!border-slate-800 focus-within:!border-slate-200 dark:focus-within:!border-slate-800 !rounded-xl !py-2.5 !px-4 !text-sm"
                />
              </Form.Item>

              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Vui lòng nhập mã OTP!" },
                  { len: 6, message: "Mã OTP gồm chính xác 6 chữ số!" },
                ]}
              >
                <Input
                  prefix={<KeyIcon className="w-5 h-5 text-sky-500/80 dark:text-cyan-400/80 mr-2" />}
                  placeholder="Mã OTP 6 chữ số"
                  maxLength={6}
                  className="!bg-slate-50 dark:!bg-slate-950/90 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 placeholder:!text-slate-400 dark:placeholder:!text-slate-500 hover:!border-sky-500 dark:hover:!border-cyan-500/60 focus:!shadow-none focus-within:!shadow-none focus:!border-slate-200 dark:focus:!border-slate-800 focus-within:!border-slate-200 dark:focus-within:!border-slate-800 !rounded-xl !py-2.5 !px-4 !text-sm font-mono tracking-wider"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập Mật khẩu mới!" },
                  { min: 8, message: "Mật khẩu phải chứa ít nhất 8 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<LockClosedIcon className="w-5 h-5 text-sky-500/80 dark:text-cyan-400/80 mr-2" />}
                  placeholder="Mật khẩu mới (Tối thiểu 8 ký tự)"
                  className="!bg-slate-50 dark:!bg-slate-950/90 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 placeholder:!text-slate-400 dark:placeholder:!text-slate-500 hover:!border-sky-500 dark:hover:!border-cyan-500/60 focus:!shadow-none focus-within:!shadow-none focus:!border-slate-200 dark:focus:!border-slate-800 focus-within:!border-slate-200 dark:focus-within:!border-slate-800 !rounded-xl !py-2.5 !px-4 !text-sm"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<ShieldCheckIcon className="w-5 h-5 text-sky-500/80 dark:text-cyan-400/80 mr-2" />}
                  placeholder="Xác nhận mật khẩu mới"
                  className="!bg-slate-50 dark:!bg-slate-950/90 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 placeholder:!text-slate-400 dark:placeholder:!text-slate-500 hover:!border-sky-500 dark:hover:!border-cyan-500/60 focus:!shadow-none focus-within:!shadow-none focus:!border-slate-200 dark:focus:!border-slate-800 focus-within:!border-slate-200 dark:focus-within:!border-slate-800 !rounded-xl !py-2.5 !px-4 !text-sm"
                />
              </Form.Item>

              <Button
                type="submit"
                variant="primary"
                size="md"
                rounded="xl"
                fullWidth
                isLoading={loading}
                disabled={loading}
                className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500 text-white dark:!bg-cyan-500 dark:hover:!bg-cyan-400 dark:!border-cyan-400 dark:text-slate-950 font-semibold mt-2"
              >
                Đổi mật khẩu ngay
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">Đang tải...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
