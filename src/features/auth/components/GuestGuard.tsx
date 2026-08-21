"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useAuthStore } from "../stores/useAuthStore";

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * Route Guard cho các trang public dành riêng cho khách chưa đăng nhập (như /login, /register).
 * Nếu người dùng đã đăng nhập, tự động chuyển hướng về trang chủ '/'.
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const { user, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/");
    }
  }, [isInitialized, user, router]);

  if (!isInitialized || user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
