import { Ticket } from '../services/ticketSupportService';
import { TICKET_STATUS_MAP, TicketStatusKey } from '../constants';

export interface BadgeStyle {
  label: string;
  className: string;
}

export interface StatusDotConfig {
  label: string;
  dotClass: string;
  textClass: string;
  bgClass: string;
  badgeClass?: string;
}

export const getStatusConfig = (status: Ticket['status']): StatusDotConfig => {
  const config = TICKET_STATUS_MAP[status as TicketStatusKey];
  if (config) {
    return config;
  }
  return {
    label: status,
    dotClass: 'bg-slate-400',
    textClass: 'text-slate-600',
    bgClass: 'bg-slate-100 border-slate-200',
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
  };
};

export const getStatusBadge = (status: Ticket['status']): BadgeStyle => {
  const config = TICKET_STATUS_MAP[status as TicketStatusKey];
  if (config) {
    return {
      label: config.label,
      className: config.badgeClass,
    };
  }
  return { label: status, className: 'bg-slate-100 text-slate-600 border-slate-200' };
};

export const getPriorityBadge = (priority?: Ticket['priority']): BadgeStyle => {
  switch (priority) {
    case 'URGENT':
      return { label: 'Khẩn cấp', className: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold' };
    case 'HIGH':
      return { label: 'Cao', className: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'MEDIUM':
      return { label: 'Trung bình', className: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'LOW':
      return { label: 'Thấp', className: 'bg-slate-50 text-slate-600 border-slate-200' };
    default:
      return { label: priority || 'Bình thường', className: 'bg-slate-50 text-slate-600 border-slate-200' };
  }
};

export const getCategoryLabel = (category: Ticket['category']): string => {
  switch (category) {
    case 'PAYMENT':
      return 'Thanh toán & Gói';
    case 'ACCOUNT':
      return 'Tài khoản & Bảo mật';
    case 'TECHNICAL':
      return 'Kỹ thuật & Lỗi hệ thống';
    case 'OTHER':
      return 'Khác';
    default:
      return category;
  }
};
