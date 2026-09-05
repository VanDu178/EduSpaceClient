import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketSupportService } from '../services';

export const TICKET_QUERY_KEYS = {
  all: ['ticketSupport'] as const,
  tickets: (params?: any) => [...TICKET_QUERY_KEYS.all, 'tickets', params] as const,
  ticketDetail: (id?: number) => [...TICKET_QUERY_KEYS.all, 'ticketDetail', id] as const,
};

/**
 * Hook lấy danh sách Tickets hỗ trợ của người dùng
 */
export function useTicketsQuery(
  params?: { status?: string; category?: string; search?: string; limit?: number },
  enabled = true
) {
  return useInfiniteQuery({
    queryKey: TICKET_QUERY_KEYS.tickets(params),
    queryFn: ({ pageParam }) =>
      ticketSupportService.getTickets({
        ...params,
        cursor: pageParam as number | undefined
      }),
    enabled,
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage?.pagination?.nextCursor ?? undefined,
    staleTime: 1000 * 60,
  });
}

/**
 * Hook xem chi tiết Ticket theo ID
 */
export function useTicketDetailQuery(id?: number, enabled = true) {
  return useQuery({
    queryKey: TICKET_QUERY_KEYS.ticketDetail(id),
    queryFn: () => ticketSupportService.getTicketById(id!),
    enabled: Boolean(id) && enabled,
  });
}

/**
 * Hook tạo mới Ticket hỗ trợ
 */
export function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; description: string; category?: string; priority?: string; attachments?: string[] }) =>
      ticketSupportService.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.tickets() });
    },
  });
}

/**
 * Hook phản hồi / bình luận vào Ticket
 */
export function useAddTicketCommentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { content: string; attachments?: string[] } }) =>
      ticketSupportService.addTicketComment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ticketDetail(variables.id) });
    },
  });
}

export * from './useTicketRealtime';

