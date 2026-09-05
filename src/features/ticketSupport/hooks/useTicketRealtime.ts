import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket, useSocketEvent } from '@/core/config/socket/SocketContext';
import { TICKET_QUERY_KEYS } from './index';
import { TICKET_SOCKET_EVENTS } from '../constants';

const DEBOUNCE_DELAY = 500; // 500ms window để gom nhóm bão sự kiện socket

export function useTicketRealtime(ticketId?: number) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hàm invalidate danh sách ticket có debounce chống bão refetch
  const debouncedInvalidateTickets = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.all });
      debounceTimerRef.current = null;
    }, DEBOUNCE_DELAY);
  }, [queryClient]);

  // Cleanup timer khi component unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Join/Leave socket room cho Ticket detail cụ thể
  useEffect(() => {
    if (!socket || !ticketId) return;

    socket.emit(TICKET_SOCKET_EVENTS.JOIN_TICKET, { ticketId });

    return () => {
      socket.emit(TICKET_SOCKET_EVENTS.LEAVE_TICKET, { ticketId });
    };
  }, [socket, ticketId]);

  // Realtime comment mới
  useSocketEvent<any>(TICKET_SOCKET_EVENTS.COMMENT_ADDED, (data) => {
    const targetId = data?.ticketId || ticketId;
    if (targetId) {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ticketDetail(targetId) });
    }
    debouncedInvalidateTickets();
  });

  // Realtime status đổi
  useSocketEvent<any>(TICKET_SOCKET_EVENTS.STATUS_CHANGED, (data) => {
    const targetId = data?.id || ticketId;
    if (targetId) {
      queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEYS.ticketDetail(targetId) });
    }
    debouncedInvalidateTickets();
  });

  // Realtime ticket mới được tạo
  useSocketEvent<any>(TICKET_SOCKET_EVENTS.CREATED, () => {
    debouncedInvalidateTickets();
  });

  // Realtime ticket được cập nhật tổng thể
  useSocketEvent<any>(TICKET_SOCKET_EVENTS.UPDATED, () => {
    debouncedInvalidateTickets();
  });
}

