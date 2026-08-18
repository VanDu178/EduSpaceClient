"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Form, Input, Card, message } from "antd";
import { LockClosedIcon, CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      message.success("Đặt lại mật khẩu thành công!");
    }, 1200);
  };

  return (
    <Card
      className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6"
      variant="borderless"
    >
      {completed ? (
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
            <CheckCircleIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
            Đặt lại Mật khẩu thành công!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Mật khẩu của bạn đã được cập nhật thành công. Bạn có thể sử dụng mật khẩu mới để đăng nhập.
          </p>
          <Link href="/login" className="block">
            <Button type="button" variant="primary" size="md" fullWidth>
              Đăng nhập ngay
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-1">
              Đặt lại <span className="gradient-text">Mật khẩu</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Nhập mật khẩu mới của bạn bên dưới
            </p>
          </div>

          {/* Form */}
          <Form
            name="reset_password_form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập Mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockClosedIcon className="w-5 h-5 text-slate-400 mr-2" />}
                placeholder="Mật khẩu mới"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận Mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockClosedIcon className="w-5 h-5 text-slate-400 mr-2" />}
                placeholder="Xác nhận mật khẩu mới"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={loading}
            >
              Cập nhật Mật khẩu
            </Button>
          </Form>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Quay lại Đăng nhập
            </Link>
          </div>
        </>
      )}
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 transition-colors duration-300">
      <div className="w-full max-w-md">
        <Suspense fallback={
          <div className="p-8 text-center text-slate-500">
            Đang tải...
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
