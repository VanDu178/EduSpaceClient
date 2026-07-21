"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Card, message } from "antd";
import { EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSentEmail(values.email);
      setSubmitted(true);
      message.success("Yêu cầu đã được gửi thành công!");
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-50 dark:from-[#131315] dark:via-[#1a1a24] dark:to-[#0f0f12] transition-colors duration-300">
      <div className="w-full max-w-md">
        <Card
          className="glass-card rounded-lg border border-slate-200 dark:border-white/10 backdrop-blur-2xl p-4 sm:p-6"
          variant="borderless"
        >
          {submitted ? (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-4">
                <CheckCircleIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
                Kiểm tra Email của bạn
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mb-6">
                Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến địa chỉ email{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-200">{sentEmail}</span>.
              </p>
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={() => setSubmitted(false)}
                >
                  Thử lại với Email khác
                </Button>
                <Link href="/login" className="block">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                  >
                    Quay lại Đăng nhập
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-1">
                  Quên <span className="gradient-text">Mật khẩu?</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                  Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu
                </p>
              </div>

              {/* Form */}
              <Form
                name="forgot_password_form"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                size="large"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập Email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input
                    prefix={<EnvelopeIcon className="w-5 h-5 text-slate-400 dark:text-zinc-400 mr-2" />}
                    placeholder="Địa chỉ Email của bạn"
                    className="bg-slate-50 dark:bg-zinc-900/80 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 !text-sm !rounded-md"
                  />
                </Form.Item>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isLoading={loading}
                >
                  Gửi yêu cầu khôi phục
                </Button>
              </Form>

              {/* Footer Link */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Quay lại Đăng nhập
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
