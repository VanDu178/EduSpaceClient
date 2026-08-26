"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spin } from "antd";
import { useAuthStore } from "../stores/useAuthStore";

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * Route Guard cho các trang public dành riêng cho khách chưa đăng nhập (như /login, /register).
 * Nếu người dùng đã đăng nhập, tự động chuyển hướng về trang redirectUrl hoặc trang chủ '/'.
 */
function GuestGuardContent({ children }: GuestGuardProps) {
  const { user, isInitialized } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  useEffect(() => {
    if (isInitialized && user) {
      const destination =
        redirectUrl && redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")
          ? redirectUrl
          : "/";
      router.replace(destination);
    }
  }, [isInitialized, user, router, redirectUrl]);

  if (!isInitialized || user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}

export function GuestGuard({ children }: GuestGuardProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
          <Spin size="large" />
        </div>
      }
    >
      <GuestGuardContent>{children}</GuestGuardContent>
    </Suspense>
  );
}

