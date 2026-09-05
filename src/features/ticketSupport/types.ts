export type TicketStatusKey = 'OPEN' | 'IN_PROGRESS' | 'PENDING_USER' | 'RESOLVED' | 'CLOSED';
export type TicketCategoryKey = 'PAYMENT' | 'ACCOUNT' | 'TECHNICAL' | 'OTHER';
export type TicketPriorityKey = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TicketStatusConfig {
  code: TicketStatusKey;
  label: string;
  dotClass: string;
  textClass: string;
  bgClass: string;
  badgeClass: string;
}

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

export interface TicketComment {
  id: number;
  ticketId: number;
  senderId: number;
  content: string;
  attachments?: string[] | null;
  createdAt: string;
  sender?: {
    id: number;
    name?: string | null;
    email: string;
    avatarUrl?: string | null;
    role: string;
  };
}

export interface Ticket {
  id: number;
  code: string;
  title: string;
  description: string;
  category: TicketCategoryKey;
  priority: TicketPriorityKey;
  status: TicketStatusKey;
  creatorId: number;
  assigneeId?: number | null;
  sourceConversationId?: number | null;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: number;
    name?: string | null;
    email: string;
    avatarUrl?: string | null;
  };
  assignee?: {
    id: number;
    name?: string | null;
    email: string;
    avatarUrl?: string | null;
  } | null;
  comments?: TicketComment[];
  sourceConversation?: any;
}

export interface TicketQueryParams {
  search?: string;
  status?: string;
  category?: string;
}

export type TicketFilters = TicketQueryParams;
export type TicketParams = TicketQueryParams;
