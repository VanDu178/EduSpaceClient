'use client';

import React from 'react';
import { AuthGuard } from '@/features/auth';
import { ConsoleSkeleton } from '@/features/account';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return <AuthGuard fallback={<ConsoleSkeleton />}>{children}</AuthGuard>;
}
