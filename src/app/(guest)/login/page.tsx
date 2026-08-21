"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Checkbox, Divider, Form, Input } from "antd";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { GoogleIcon } from "@/core/icons";
import { loginApi, googleLoginApi, useAuthStore } from "@/features/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await loginApi({
        email: values?.email,
        password: values?.password,
      });
      useAuthStore.getState().setAuth(res?.user, res?.accessToken || null);
      toast.success("Đăng nhập thành công! Chào mừng đến với TradeVerse.");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse: any) => {
    setLoading(true);
    try {
      const res = await googleLoginApi({
        accessToken: tokenResponse?.access_token,
      });
      useAuthStore.getState().setAuth(res?.user, res?.accessToken || null);
      toast.success("Đăng nhập bằng Google thành công!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Đăng nhập bằng Google thất bại. Vui lòng thử lại sau!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast.error("Đăng nhập bằng Google bị hủy hoặc gặp lỗi!");
    },
  });

  const handleGoogleLogin = () => {
    if (loading) return;
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      toast.error("Chưa cấu hình NEXT_PUBLIC_GOOGLE_CLIENT_ID trong môi trường!");
      return;
    }
    loginWithGoogle();
  };


  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-slate-50 dark:bg-[#070d19] transition-colors duration-300">
      {/* Background Ambient Glow FX */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-sky-200/50 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* Left Column: Cosmic Quant Universe Visual */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Heading */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Vũ Trụ Trading & <br className="hidden sm:inline" />
            <span className="text-sky-600 dark:text-cyan-400">
              Giao Dịch Định Lượng
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Hệ sinh thái kết nối tri thức và cộng đồng: Nơi tiếp thu khóa học chuẩn chỉnh, thảo luận kinh nghiệm và cùng nhau phát triển.
          </p>

          {/* Mascot & Orbital Planet Showcase */}
          <div className="relative w-full max-w-md h-80 sm:h-96 flex items-center justify-center my-4">
            {/* Outer Elliptical Orbit Line */}
            <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-sky-400/40 dark:border-cyan-500/30 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />

            {/* Inner Elliptical Orbit Line */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-indigo-400/40 dark:border-indigo-500/30 pointer-events-none" />

            {/* Central Mascot Image */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 z-10 transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/mascot-quant-robot.png"
                alt="TradeVerse Quant Robot Mascot"
                fill
                priority
                className="object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              />
            </div>

            {/* Orbiting Planet Spheres */}

            {/* Planet 1: WIN RATE (Top-Left Orbit Planet) */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 transition-transform duration-300 hover:scale-110">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sky-100 via-sky-50 to-white dark:from-cyan-950 dark:via-sky-950 dark:to-slate-950 border-2 border-sky-400 dark:border-cyan-400 backdrop-blur-md flex flex-col items-center justify-center text-center p-2">
                <ChartBarIcon className="w-4 h-4 text-sky-600 dark:text-cyan-400 mb-0.5 shrink-0" />
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter leading-none">WIN RATE</span>
                <span className="text-[11px] sm:text-xs font-bold text-sky-600 dark:text-cyan-300 leading-tight">46%</span>
              </div>
            </div>

            {/* Planet 2: R:R (Right Orbit Planet) */}
            <div className="absolute top-16 right-0 sm:right-2 z-20 transition-transform duration-300 hover:scale-110">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-white dark:from-emerald-950 dark:via-teal-950 dark:to-slate-950 border-2 border-emerald-400 dark:border-emerald-400 backdrop-blur-md flex flex-col items-center justify-center text-center p-2">
                <BoltIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-0.5 shrink-0" />
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter leading-none">R:R</span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-300 leading-tight">1:4</span>
              </div>
            </div>

            {/* Planet 3: MAX DRAWDOWN (Bottom-Left Orbit Planet) */}
            <div className="absolute bottom-2 left-6 sm:left-10 z-20 transition-transform duration-300 hover:scale-110">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-100 via-orange-50 to-white dark:from-amber-950 dark:via-orange-950 dark:to-slate-950 border-2 border-amber-400 dark:border-amber-400 backdrop-blur-md flex flex-col items-center justify-center text-center p-2">
                <ArrowTrendingDownIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-0.5 shrink-0" />
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter leading-none">MAX DD</span>
                <span className="text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-300 leading-tight">-25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech HUD Login Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white dark:bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-slate-200/90 dark:border-cyan-500/30 p-6 sm:p-8 relative overflow-hidden">
            {/* Glowing Accent Bar */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-sky-500 dark:via-cyan-400 to-transparent" />

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1">
                Đăng nhập <span className="text-sky-600 dark:text-cyan-400">TradeVerse</span>
              </h2>
            </div>

            {/* Form */}
            <Form
              name="login_form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              size="large"
              disabled={loading}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập Email!" },
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
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập Mật khẩu!" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<LockClosedIcon className="w-5 h-5 text-sky-500/80 dark:text-cyan-400/80 mr-2" />}
                  placeholder="Mật khẩu"
                  className="!bg-slate-50 dark:!bg-slate-950/90 !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-slate-100 placeholder:!text-slate-400 dark:placeholder:!text-slate-500 hover:!border-sky-500 dark:hover:!border-cyan-500/60 focus:!shadow-none focus-within:!shadow-none focus:!border-slate-200 dark:focus:!border-slate-800 focus-within:!border-slate-200 dark:focus-within:!border-slate-800 !rounded-xl !py-2.5 !px-4 !text-sm"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-5">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="!text-slate-600 dark:!text-slate-300 text-xs sm:text-sm [&_.ant-checkbox-inner]:!bg-white dark:[&_.ant-checkbox-inner]:!bg-slate-950 [&_.ant-checkbox-inner]:!border-slate-300 dark:[&_.ant-checkbox-inner]:!border-slate-700 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-sky-500 dark:[&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-cyan-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-sky-500 dark:[&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-cyan-500">
                    Ghi nhớ đăng nhập
                  </Checkbox>
                </Form.Item>
                <Link
                  href="/forgot-password"
                  onClick={(e) => {
                    if (loading) e.preventDefault();
                  }}
                  className={`!text-sky-600 hover:!text-sky-700 dark:!text-cyan-400 dark:!hover:text-cyan-300 !transition-colors ${loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  Quên mật khẩu
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                rounded="xl"
                fullWidth
                isLoading={loading}
                disabled={loading}
                className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500 text-white dark:!bg-cyan-500 dark:hover:!bg-cyan-400 dark:!border-cyan-400 dark:text-slate-950 font-semibold"
              >
                Đăng nhập
              </Button>
            </Form>

            {/* Divider */}
            <Divider className="!border-slate-200 dark:!border-slate-800 !text-slate-500 dark:!text-slate-400 text-xs my-5">
              Hoặc tiếp tục với
            </Divider>

            {/* Google Auth Button */}
            <Button
              type="button"
              variant="secondary"
              size="md"
              rounded="xl"
              fullWidth
              isLoading={loading}
              disabled={loading}
              leftIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              className="!bg-slate-50 dark:!bg-slate-950/80 !border-slate-200 dark:!border-slate-800 !text-slate-700 dark:!text-slate-200 hover:!bg-slate-100 dark:hover:!bg-slate-800/80 hover:!border-slate-300 dark:hover:!border-cyan-500/40"
            >
              Tiếp tục với Google
            </Button>
            {/* Footer Link */}
            <div className="mt-5 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                onClick={(e) => {
                  if (loading) e.preventDefault();
                }}
                className={`text-sky-600 hover:text-sky-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold transition-colors ${loading ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
