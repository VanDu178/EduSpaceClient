"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spin } from "antd";
import { useAuthStore } from "../stores/useAuthStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Route Guard cho các trang bảo mật yêu cầu người dùng phải đăng nhập.
 * Nếu người dùng chưa đăng nhập, tự động chuyển hướng tới trang '/login' đính kèm redirect URL.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isInitialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialized && !user) {
      const loginUrl =
        pathname && pathname !== "/"
          ? `/login?redirect=${encodeURIComponent(pathname)}`
          : "/login";
      router.replace(loginUrl);
    }
  }, [isInitialized, user, router, pathname]);

  if (!isInitialized || !user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}

