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

import { SupportChatWidget } from "@/features/chatSupport";
import { SocketProvider } from "@/core/config/socket/SocketContext";
import { NotificationProvider } from "@/core/contexts";
import { Toaster } from "react-hot-toast";

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
                  <SocketProvider>
                    <NotificationProvider>
                      <Wrapper>
                        {children}
                        <SupportChatWidget />
                        <Toaster position="top-right" reverseOrder={false} />
                      </Wrapper>
                    </NotificationProvider>
                  </SocketProvider>
                </AuthProvider>
              </GoogleAuthProvider>
            </AppThemeProvider>
          </ReactQueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

