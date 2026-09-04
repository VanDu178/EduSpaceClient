import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket, useSocketEvent } from '@/core/config/socket/SocketContext';
import { TICKET_QUERY_KEYS } from './index';

export function useTicketRealtime(ticketId?: number) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  // Join/Leave socket room cho Ticket detail cụ thể
  useEffect(() => {
    if (!socket || !ticketId) return;

    socket.emit('join_ticket', { ticketId });

    return () => {
      socket.emit('leave_ticket', { ticketId });
    };
  }, [socket, ticketId]);

  // Realtime comment mới
  useSocketEvent<any>('ticket:comment_added', (data) => {
    const targetId = data?.ticketId || ticketId;
    if (targetId) {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ticketDetail(targetId) });
    }
    queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.tickets() });
  });

  // Realtime status đổi
  useSocketEvent<any>('ticket:status_changed', (data) => {
    const targetId = data?.id || ticketId;
    if (targetId) {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ticketDetail(targetId) });
    }
    queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.tickets() });
  });

  // Realtime ticket mới được tạo
  useSocketEvent<any>('ticket:created', () => {
    queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.all });
  });

  // Realtime ticket được cập nhật tổng thể
  useSocketEvent<any>('ticket:updated', () => {
    queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.all });
  });
}
