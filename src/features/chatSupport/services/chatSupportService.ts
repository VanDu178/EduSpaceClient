import api from '@/core/services/api';

export interface SupportConversation {
  id: number;
  code: string;
  userId: number;
  assignedTo?: number | null;
  status: 'BOT' | 'WAITING_AGENT' | 'AGENT_HANDLING' | 'RESOLVED' | 'CONVERTED_TO_TICKET';
  lastMessage?: string | null;
  lastSender?: 'USER' | 'BOT' | 'AGENT' | 'SYSTEM' | null;
  createdAt: string;
  updatedAt: string;
  messages?: SupportMessage[];
  agent?: {
    id: number;
    name?: string | null;
    email: string;
    avatarUrl?: string | null;
  } | null;
}

export interface SupportMessage {
  id: number;
  conversationId: number;
  senderType: 'USER' | 'BOT' | 'AGENT' | 'SYSTEM';
  senderId?: number | null;
  content: string;
  metadata?: any;
  attachments?: string[] | null;
  isSystemNotice?: boolean;
  createdAt: string;
}

export const chatSupportService = {
  startConversation: async (initialMessage?: string) => {
    const res = await api.post('/support/chat/start', { initialMessage });
    return res.data;
  },

  sendMessage: async (data: { conversationId: number; content: string; attachments?: string[] }) => {
    const res = await api.post('/support/chat/message', data);
    return res.data;
  },

  getConversations: async (status?: string) => {
    const res = await api.get('/support/chat/conversations', { params: { status } });
    return res.data;
  },

  getConversationDetail: async (id: number) => {
    const res = await api.get(`/support/chat/conversations/${id}`);
    return res.data;
  },

  getAdminStatus: async () => {
    const res = await api.get('/support/admin/status');
    return res.data;
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'support-chat');
    const res = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.data;
  },

  deleteImage: async (urlOrPath: string) => {
    const res = await api.delete('/upload', {
      data: { url: urlOrPath }
    });
    return res.data.success;
  }
};

export default chatSupportService;
