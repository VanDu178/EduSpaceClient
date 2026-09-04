/**
 * Quản lý tập trung toàn bộ đường dẫn (URL / Route) trên hệ thống TradeVerse FE Client
 */
export const APP_ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  LOGIN: '/login',
  REGISTER: '/register',
  BLOGS: '/blogs',
  VIDEOS: '/videos',
  TOOLS: '/tools',
  SUPPORT: '/support',
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
