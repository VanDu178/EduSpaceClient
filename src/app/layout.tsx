import type { Metadata } from "next";
import { varelaRound } from "@/core/config/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppThemeProvider, AuthProvider } from "@/components/providers";
import { Wrapper } from "@/components/layout";
import { siteConfig } from "@/core/config/site";
import "@/core/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/images/logo.png" },
      { url: "/images/favicon.ico" },
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={varelaRound.variable} suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <AppThemeProvider>
            <AuthProvider>
              <Wrapper>{children}</Wrapper>
            </AuthProvider>
          </AppThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
