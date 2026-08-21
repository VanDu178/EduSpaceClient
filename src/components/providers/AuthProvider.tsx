"use client";

import { useEffect } from "react";
import { useAuthStore, refreshTokenApi, getMeApi } from "@/features/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const setNetworkError = useAuthStore((state) => state.setNetworkError);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Silent Refresh khôi phục phiên làm việc khi F5 qua HttpOnly Cookie
        const data = await refreshTokenApi();
        if (!isMounted) return;

        if (data.accessToken) {
          let user = data.user;
          if (!user) {
            user = await getMeApi();
          }
          setAuth(user, data.accessToken);
        }
      } catch (error: any) {
        if (!isMounted) return;

        if (!error.response || error.code === 'ERR_NETWORK' || error.response?.status >= 500) {
          // Lỗi mạng/Server chập chờn: Giữ nguyên session, đánh dấu flag lỗi mạng
          setNetworkError(true);
        }
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [setAuth, setInitialized, setNetworkError]);

  return <>{children}</>;
}
