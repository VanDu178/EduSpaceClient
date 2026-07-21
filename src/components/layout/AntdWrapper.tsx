"use client";

import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "@/contexts";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AntdWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 12,
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          fontSizeHeading1: 32,
          fontSizeHeading2: 24,
          fontSizeHeading3: 18,
          fontSizeHeading4: 16,
          fontSizeHeading5: 14,
          fontSizeSM: 12,
          fontSizeLG: 16,
          colorBgContainer: theme === "dark" ? "#18181b" : "#ffffff",
          colorBgElevated: theme === "dark" ? "#1f1f23" : "#ffffff",
          colorText: theme === "dark" ? "#f4f4f5" : "#0f172a",
          colorTextDescription: theme === "dark" ? "#a1a1aa" : "#64748b",
          colorBorder: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(226, 232, 240, 0.9)",
        },
      }}
    >
      <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#131315] text-slate-900 dark:text-[#f4f4f5] transition-colors duration-300">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ConfigProvider>
  );
}
