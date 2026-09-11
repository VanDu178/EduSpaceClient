'use client';

import React from 'react';
import { AuthGuard } from '@/modules/auth';
import { ConsoleSkeleton } from '@/modules/account';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return <AuthGuard fallback={<ConsoleSkeleton />}>{children}</AuthGuard>;
}
