import api from '@/core/services/api';
import { Ticket, TicketComment } from '../types';

export type { Ticket, TicketComment };

export const ticketSupportService = {

  createTicket: async (data: { title: string; description: string; category?: string; priority?: string; attachments?: string[] }) => {
    const res = await api.post('/support/tickets', data);
    return res.data;
  },

  getTickets: async (params?: { status?: string; category?: string; search?: string; page?: number; limit?: number; cursor?: number }) => {
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
