import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatSupportService } from '../services/chatSupportService';

export const CHAT_QUERY_KEYS = {
  all: ['chatSupport'] as const,
  adminStatus: () => [...CHAT_QUERY_KEYS.all, 'adminStatus'] as const,
  conversations: (status?: string) => [...CHAT_QUERY_KEYS.all, 'conversations', status] as const,
  conversationDetail: (id?: number) => [...CHAT_QUERY_KEYS.all, 'conversationDetail', id] as const,
};

/**
 * Hook kiểm tra trạng thái online/offline của Admin CSKH
 */
export function useAdminStatusQuery(enabled = true) {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.adminStatus(),
    queryFn: () => chatSupportService.getAdminStatus(),
    enabled,
    staleTime: 1000 * 30, // 30s cache
    retry: false,
  });
}

/**
 * Hook khởi tạo cuộc trò chuyện với Admin CSKH
 */
export function useStartConversationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (initialMessage?: string) => chatSupportService.startConversation(initialMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.all });
    },
  });
}

/**
 * Hook gửi tin nhắn trong cuộc trò chuyện CSKH
 */
export function useSendMessageMutation() {
  return useMutation({
    mutationFn: (data: { conversationId: number; content: string; attachments?: string[] }) =>
      chatSupportService.sendMessage(data),
  });
}
