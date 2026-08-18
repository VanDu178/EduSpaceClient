import type { Metadata } from "next";
import { geistSans, geistMono } from "@/config/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppThemeProvider } from "@/components/providers";
import { Wrapper } from "@/components/layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "EduSpace - Nền tảng Học tập & Chia sẻ Tri thức",
  description: "Nền tảng edtech hiện đại cho lập trình viên và người học.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <AppThemeProvider>
            <Wrapper>{children}</Wrapper>
          </AppThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
