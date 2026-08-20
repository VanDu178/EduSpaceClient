"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Checkbox, Divider, Form, Input, Card, message } from "antd";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { GoogleIcon } from "@/icons";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng nhập thành công!");
    }, 1200);
  };

  const handleGoogleLogin = () => {
    message.info("Chức năng đăng nhập bằng Google đang được xử lý...");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 transition-colors duration-300">
      <div className="w-full max-w-md">
        <Card
          className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6"
          variant="borderless"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-1">
              Chào mừng trở lại <span className="text-blue-600">EduSpace</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Đăng nhập tài khoản của bạn để tiếp tục
            </p>
          </div>

          {/* Form */}
          <Form
            name="login_form"
            layout="vertical"
            initialValues={{ remember: true }}
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
                prefix={<EnvelopeIcon className="w-5 h-5 text-slate-400 mr-2" />}
                placeholder="Địa chỉ Email"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockClosedIcon className="w-5 h-5 text-slate-400 mr-2" />}
                placeholder="Mật khẩu"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-5">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-slate-600 text-sm">
                  Ghi nhớ đăng nhập
                </Checkbox>
              </Form.Item>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Quên mật khẩu?
              </Link>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={loading}
            >
              Đăng nhập
            </Button>
          </Form>

          {/* Divider */}
          <Divider className="border-slate-200 text-slate-500 text-xs my-3">
            Hoặc
          </Divider>

          {/* Google Auth Button */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            fullWidth
            leftIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            Tiếp tục với Google
          </Button>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Đăng ký ngay
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
