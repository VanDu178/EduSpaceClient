import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/modules/auth/stores/useAuthStore';
import { getQueryClient } from '@/components/providers/ReactQueryProvider';
import { ERROR_CACHE_INVALIDATE_MAP } from '@/core/config/errorCacheMap';

interface FailedRequestItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}


// Khởi tạo instance Axios dùng chung
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Bắt buộc để tự động gửi HttpOnly cookie (refresh token) lên server
});

// Biến lưu trạng thái đang refresh token để tránh gọi trùng lặp nhiều lần (chỉ dùng ở Client)
let isRefreshing = false;
let failedQueue: FailedRequestItem[] = [];

// Hàm đẩy các request bị hoãn vào hàng đợi chờ refresh xong
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Tự động đính kèm Access Token từ Zustand Store & kích hoạt Lazy Check bị động
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Kiểm tra xem có đang chạy ở môi trường Client (trình duyệt) hay không
    if (typeof window !== 'undefined') {
      const token = useAuthStore.getState().accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Kích hoạt Bị động (Lazy Check) dữ liệu user từ xa nếu không phải các API auth cơ bản
      const isAuthRoute =
        config.url?.includes('/auth/login') ||
        config.url?.includes('/auth/refresh') ||
        config.url?.includes('/auth/logout') ||
        config.url?.includes('/auth/me');

      if (token && !isAuthRoute) {
        // Tự động kiểm tra bị động trong background không làm block request chính
        useAuthStore.getState().fetchMeLazy().catch(() => {
          // Bỏ qua lỗi background check
        });
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Biến lưu trữ Single-Flight Refresh Promise dùng chung toàn bộ ứng dụng Client
let refreshPromise: Promise<{ accessToken: string; user: any }> | null = null;

/**
 * Thực thi làm mới Access Token duy nhất (Single-Flight Deduplication).
 * Tất cả các cuộc gọi refresh (từ AuthProvider hoặc từ Axios Interceptors)
 * đều sử dụng chung một Promise duy nhất để tránh gửi trùng request HTTP.
 */
export const executeSharedRefreshToken = async (): Promise<{ accessToken: string; user: any }> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const { accessToken, user } = response.data.data;

      // Cập nhật Access Token & User mới vào Zustand RAM store
      useAuthStore.getState().setAccessToken(accessToken);
      if (user) {
        useAuthStore.getState().setUser(user);
      }

      // Cập nhật Authorization header mặc định của api instance
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return { accessToken, user };
    } catch (error: any) {
      // Dọn dẹp triệt để Header & giải phóng Zombie Session trong Zustand RAM store
      delete api.defaults.headers.common['Authorization'];
      useAuthStore.getState().setAuth(null, null);

      const status = error?.response?.status;
      // Nếu không phải lỗi 4xx (ví dụ lỗi mạng ERR_NETWORK hoặc Server 5xx): bật cờ lỗi mạng
      if (!status || status < 400 || status >= 500) {
        useAuthStore.getState().setNetworkError(true);
      }
      // Lưu ý: Lỗi 4xx (người dùng chưa đăng nhập / cookie hết hạn) được xử lý bởi AuthGuard cho các route protected.
      // Không gọi window.location.href cứng ở đây để giữ khách ở lại xem nội dung trên các trang public.

      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// Response Interceptor: Tự động bắt lỗi 401 để refresh token và gọi lại request cũ
api.interceptors.response.use(
  (response) => {
    // Reset trạng thái lỗi mạng nếu request thành công
    if (typeof window !== 'undefined' && useAuthStore.getState().isNetworkError) {
      useAuthStore.getState().setNetworkError(false);
    }
    return response;
  },
  async (error) => {
    // Nếu request bị hủy
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Tự động Invalidate Query Cache nếu mã lỗi nằm trong ERROR_CACHE_INVALIDATE_MAP
    if (typeof window !== 'undefined' && error.response?.data?.errorCode) {
      const errorCode = error.response.data.errorCode;
      const cacheRule = ERROR_CACHE_INVALIDATE_MAP[errorCode];
      if (cacheRule && cacheRule.queryKeys) {
        try {
          const queryClient = getQueryClient();
          cacheRule.queryKeys.forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
          });
        } catch {
          // Bỏ qua lỗi nếu queryClient không khả dụng
        }
      }
    }

    const originalRequest = error.config;

    // Nếu là lỗi mạng / rớt kết nối / 5xx (không phải lỗi 401)
    if (!error.response || error.code === 'ERR_NETWORK' || error.response.status >= 500) {
      if (typeof window !== 'undefined') {
        useAuthStore.getState().setNetworkError(true);
      }
      return Promise.reject(error);
    }

    // Nếu không có originalRequest hoặc lỗi không phải 401 Unauthorized
    // Hoặc đây là request login/refresh/logout thì trả về lỗi luôn không retry
    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/logout')
    ) {
      return Promise.reject(error);
    }

    // Nếu đang chạy ở môi trường Server (Next.js SSR/RSC)
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    // Nếu đang trong quá trình refresh token, hoãn request lại và đưa vào hàng đợi
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { accessToken } = await executeSharedRefreshToken();

      // Xử lý hàng đợi
      processQueue(null, accessToken);

      // Thực thi lại request ban đầu với token mới
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError: any) {
      processQueue(refreshError, null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
