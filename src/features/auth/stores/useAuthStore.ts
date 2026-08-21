import { create } from 'zustand';
import { User } from '../types';
import { getMeApi, logoutApi } from '../services/authService';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isInitialized: boolean;
  isNetworkError: boolean;
  lastCheckedAt: number | null;

  setAuth: (user: User | null, accessToken: string | null) => void;
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setNetworkError: (isError: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => Promise<void>;
  fetchMeLazy: (force?: boolean) => Promise<void>;
}

const LAZY_CHECK_INTERVAL_MS = 60 * 1000; // 60 seconds interval for passive lazy check

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isInitialized: false,
  isNetworkError: false,
  lastCheckedAt: null,

  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
      isInitialized: true,
      lastCheckedAt: Date.now(),
      isNetworkError: false,
    }),

  setUser: (user) => set({ user }),

  setAccessToken: (accessToken) => set({ accessToken }),

  setNetworkError: (isNetworkError) => set({ isNetworkError }),

  setInitialized: (isInitialized) => set({ isInitialized }),

  logout: async () => {
    set({
      accessToken: null,
      user: null,
      lastCheckedAt: null,
      isNetworkError: false,
    });
    await logoutApi();
  },

  fetchMeLazy: async (force = false) => {
    const { accessToken, lastCheckedAt, user } = get();
    if (!accessToken) return;

    const now = Date.now();
    if (!force && lastCheckedAt && now - lastCheckedAt < LAZY_CHECK_INTERVAL_MS) {
      return;
    }

    try {
      const freshUser = await getMeApi();
      const userChanged = JSON.stringify(freshUser) !== JSON.stringify(user);

      set({
        lastCheckedAt: now,
        isNetworkError: false,
        ...(userChanged ? { user: freshUser } : {}),
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // Account locked or token revoked by Admin -> trigger logout
        await get().logout();
      } else {
        // Network error or 5xx server error: keep session intact, fail silently
        set({ isNetworkError: true });
      }
    }
  },
}));
