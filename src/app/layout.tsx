import type { Metadata } from "next";
import { varelaRound } from "@/core/config/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppThemeProvider, AuthProvider, ReactQueryProvider } from "@/components/providers";
import { GoogleAuthProvider } from "@/core/contexts";
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
          <ReactQueryProvider>
            <AppThemeProvider>
              <GoogleAuthProvider>
                <AuthProvider>
                  <Wrapper>{children}</Wrapper>
                </AuthProvider>
              </GoogleAuthProvider>
            </AppThemeProvider>
          </ReactQueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

