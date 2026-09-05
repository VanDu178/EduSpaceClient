import { TicketStatusKey, TicketStatusConfig } from './types';

export type { TicketStatusKey, TicketStatusConfig };

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

export const TICKET_CATEGORY_OPTIONS = [
  { value: 'TECHNICAL', label: 'Kỹ thuật & lỗi hệ thống' },
  { value: 'PAYMENT', label: 'Thanh toán & gói dịch vụ' },
  { value: 'ACCOUNT', label: 'Tài khoản & bảo mật' },
  { value: 'OTHER', label: 'Khác' },
];

export const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'Tất cả Danh mục' },
  ...TICKET_CATEGORY_OPTIONS,
];

/**
 * TẬP TRUNG HÓA TẤT CẢ TÊN SOCKET EVENT CHO TICKET SUPPORT (FE CLIENT)
 */
export const TICKET_SOCKET_EVENTS = {
  COMMENT_ADDED: 'ticket:comment_added',
  STATUS_CHANGED: 'ticket:status_changed',
  CREATED: 'ticket:created',
  UPDATED: 'ticket:updated',
  JOIN_TICKET: 'join_ticket',
  LEAVE_TICKET: 'leave_ticket',
} as const;

export const DEFAULT_TICKET_PARAMS = {
  search: '',
  status: 'ALL',
  category: 'ALL',
} as const;

export const DEFAULT_PARAMS = DEFAULT_TICKET_PARAMS;
