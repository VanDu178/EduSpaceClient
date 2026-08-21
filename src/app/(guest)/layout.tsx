"use client";

import { GuestGuard } from "@/features/auth";

interface GuestLayoutProps {
  children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
