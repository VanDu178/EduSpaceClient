'use client';

import React from 'react';
import { AuthGuard } from '@/features/auth';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout chung cho Route Group (protected).
 * Tự động bảo vệ tất cả các trang con nằm trong nhóm này, yêu cầu người dùng phải đăng nhập.
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
