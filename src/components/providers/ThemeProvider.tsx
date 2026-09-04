"use client";

import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { Toaster } from "react-hot-toast";

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ConfigProvider
      theme={{
        cssVar: { key: "app" },
        algorithm: antdTheme.defaultAlgorithm,
        token: {
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
        },
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </ConfigProvider>
  );
}
