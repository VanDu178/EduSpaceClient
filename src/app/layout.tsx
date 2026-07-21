import type { Metadata } from "next";
import { geistSans, geistMono } from "@/config/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/contexts";
import { AntdWrapper } from "@/components/layout";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="dark">
      <body>
        <AntdRegistry>
          <ThemeProvider>
            <AntdWrapper>{children}</AntdWrapper>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
