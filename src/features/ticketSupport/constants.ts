export type TicketStatusKey = 'OPEN' | 'IN_PROGRESS' | 'PENDING_USER' | 'RESOLVED' | 'CLOSED';

export interface TicketStatusConfig {
  code: TicketStatusKey;
  label: string;
  dotClass: string;
  textClass: string;
  bgClass: string;
  badgeClass: string;
}

export const TICKET_STATUS_MAP: Record<TicketStatusKey, TicketStatusConfig> = {
  OPEN: {
    code: 'OPEN',
    label: 'Đã gửi yêu cầu',
    dotClass: 'bg-amber-500',
    textClass: 'text-amber-700',
    bgClass: 'bg-amber-50/80 border-amber-200/60',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  IN_PROGRESS: {
    code: 'IN_PROGRESS',
    label: 'Đang được xử lý',
    dotClass: 'bg-sky-500 animate-pulse',
    textClass: 'text-sky-700',
    bgClass: 'bg-sky-50/80 border-sky-200/60',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  PENDING_USER: {
    code: 'PENDING_USER',
    label: 'Chờ bạn phản hồi',
    dotClass: 'bg-purple-500',
    textClass: 'text-purple-700',
    bgClass: 'bg-purple-50/80 border-purple-200/60',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  RESOLVED: {
    code: 'RESOLVED',
    label: 'Đã giải quyết',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50/80 border-emerald-200/60',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  CLOSED: {
    code: 'CLOSED',
    label: 'Đã đóng',
    dotClass: 'bg-slate-400',
    textClass: 'text-slate-600',
    bgClass: 'bg-slate-100/80 border-slate-200/60',
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
  },
};

export const STATUS_OPTIONS = [
  { value: 'ALL', label: 'Tất cả Trạng thái' },
  ...Object.values(TICKET_STATUS_MAP).map((status) => ({
    value: status.code,
    label: status.label,
  })),
];

export const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'Tất cả Danh mục' },
  { value: 'TECHNICAL', label: 'Kỹ thuật & Lỗi hệ thống' },
  { value: 'PAYMENT', label: 'Thanh toán & Gói' },
  { value: 'ACCOUNT', label: 'Tài khoản & Bảo mật' },
  { value: 'OTHER', label: 'Khác' },
];

