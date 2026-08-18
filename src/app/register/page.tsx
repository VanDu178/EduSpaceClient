"use client";

import { useState } from "react";
import Link from "next/link";
import { Checkbox, Card, Form, Input, message } from "antd";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";

export default function RegisterPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Tạo tài khoản EduSpace thành công!");
    }, 1200);
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
              Tạo tài khoản <span className="gradient-text">EduSpace</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Đăng ký để trải nghiệm đầy đủ tính năng
            </p>
          </div>
          {/* Form */}
          <Form
            form={form}
            name="register_form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input
                prefix={<UserIcon className="w-5 h-5 text-slate-400 mr-2" />}
                placeholder="Họ và tên"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
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
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockClosedIcon className="w-5 h-5 text-slate-400 mr-2" />}
                placeholder="Mật khẩu"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
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
                placeholder="Xác nhận mật khẩu"
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 !text-sm !rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Bạn cần đồng ý với Điều khoản dịch vụ!")),
                },
              ]}
            >
              <Checkbox className="text-slate-600 text-sm">
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </Link>
              </Checkbox>
            </Form.Item>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={loading}
            >
              Đăng ký tài khoản
            </Button>
          </Form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Đăng nhập ngay
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
