import api from '@/core/services/api';

export interface Ticket {
  id: number;
  code: string;
  title: string;
  description: string;
  category: 'PAYMENT' | 'ACCOUNT' | 'TECHNICAL' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'PENDING_USER' | 'RESOLVED' | 'CLOSED';
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

export const ticketSupportService = {
  createTicket: async (data: { title: string; description: string; category?: string; priority?: string; attachments?: string[] }) => {
    const res = await api.post('/support/tickets', data);
    return res.data;
  },

  getTickets: async (params?: { status?: string; category?: string; search?: string; page?: number; limit?: number }) => {
    const res = await api.get('/support/tickets', { params });
    return res.data;
  },

  getTicketById: async (id: number) => {
    const res = await api.get(`/support/tickets/${id}`);
    return res.data;
  },

  addTicketComment: async (id: number, data: { content: string; attachments?: string[] }) => {
    const res = await api.post(`/support/tickets/${id}/comments`, data);
    return res.data;
  },
};

export default ticketSupportService;
