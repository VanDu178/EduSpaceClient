import {
  UserIcon,
  SparklesIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export const TAB_TITLE_MAP: Record<string, string> = {
  subscription: 'Gói dịch vụ của tôi',
  profile: 'Hồ sơ cá nhân',
  transactions: 'Hóa đơn',
};

export const NAVIGATION_GROUPS = [
  {
    groupTitle: 'TÀI KHOẢN CÁ NHÂN',
    items: [
      {
        key: 'profile',
        label: 'Hồ sơ cá nhân',
        icon: UserIcon,
      },
    ],
  },
  {
    groupTitle: 'DỊCH VỤ & THANH TOÁN',
    items: [
      {
        key: 'subscription',
        label: 'Gói dịch vụ của tôi',
        icon: SparklesIcon,
      },
      {
        key: 'transactions',
        label: 'Hóa đơn',
        icon: CurrencyDollarIcon,
      },
    ],
  },
];
