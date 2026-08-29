"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import { PageSkeleton } from "@/components/common/PageSkeleton";

interface GuestGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Route Guard cho các trang public dành riêng cho khách chưa đăng nhập (như /login, /register).
 * Nếu người dùng đã đăng nhập, tự động chuyển hướng về trang redirectUrl hoặc trang chủ '/'.
 */
function GuestGuardContent({ children, fallback }: GuestGuardProps) {
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
    return <>{fallback ?? <PageSkeleton />}</>;
  }

  return <>{children}</>;
}

export function GuestGuard({ children, fallback }: GuestGuardProps) {
  return (
    <Suspense fallback={fallback ?? <PageSkeleton />}>
      <GuestGuardContent fallback={fallback}>{children}</GuestGuardContent>
    </Suspense>
  );
}

