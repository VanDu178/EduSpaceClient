'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRightIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { SupportConversation, SupportMessage, chatSupportService } from '../services/chatSupportService';
import {
  useAdminStatusQuery,
  useStartConversationMutation,
  useSendMessageMutation
} from '../hooks';
import { useSocket, useSocketEvent } from '@/core/config/socket/SocketContext';
import toast from 'react-hot-toast';
import { ViewChat } from './ViewChat';

export const SupportChatWidget = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminOnline, setIsAdminOnline] = useState(false);

  const { socket } = useSocket();

  // Custom Hooks
  const { data: adminStatusRes } = useAdminStatusQuery(isOpen);
  const { isPending: isStartingChat, mutateAsync: startConversationMutation } = useStartConversationMutation();
  const { isPending: isSending, mutateAsync: sendMessageMutation } = useSendMessageMutation();

  // Chat state
  const [conversation, setConversation] = useState<SupportConversation | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [autoConvertedTicketCode, setAutoConvertedTicketCode] = useState<string | null>(null);

  // Countdown redirect state when Admin is offline
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Clear countdown interval on component unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  // Safe redirect when countdown reaches 0 (prevents setState in render warning)
  useEffect(() => {
    if (redirectCountdown === 0) {
      setRedirectCountdown(null);
      setIsOpen(false);
      router.push('/account?tab=support');
    }
  }, [redirectCountdown, router]);

  // Sync admin presence query result
  useEffect(() => {
    if (adminStatusRes?.data) {
      setIsAdminOnline(Boolean(adminStatusRes.data.isOnline));
    }
  }, [adminStatusRes]);

  // Lắng nghe socket event 'admin_presence_updated'
  useSocketEvent<{ isOnline: boolean }>('admin_presence_updated', (data) => {
    setIsAdminOnline(data.isOnline);
  });

  // Lắng nghe socket event 'new_message'
  useSocketEvent<{ conversationId: number; message: SupportMessage }>('new_message', (data) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === data.message.id)) return prev;
      return [...prev, data.message];
    });
  });

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkAdminPresence = async () => {
    try {
      const res = await chatSupportService.getAdminStatus();
      if (res?.data) {
        setIsAdminOnline(Boolean(res.data.isOnline));
      }
    } catch {
      // Ignore if unauthenticated
    }
  };

  const handleProceedToSupport = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setRedirectCountdown(null);
    setIsOpen(false);
    router.push('/account?tab=support');
  };

  const handleStartChat = async (initialMsg?: string) => {
    setAutoConvertedTicketCode(null);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setRedirectCountdown(null);

    try {
      const res = await startConversationMutation(initialMsg);
      const data = res.data;
      const online = Boolean(data.isAgentOnline);
      setIsAdminOnline(online);

      if (online && data.conversation) {
        setConversation(data.conversation);
        setMessages(data.conversation.messages || []);
        if (socket) {
          socket.emit('join_conversation', { conversationId: data.conversation.id });
        }
        toast.success('Đã kết nối trực tiếp với Admin CSKH!');
      } else {
        setRedirectCountdown(5);

        const timer = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev === null) return null;
            if (prev <= 1) {
              clearInterval(timer);
              countdownIntervalRef.current = null;
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        countdownIntervalRef.current = timer;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Chưa thể kết nối chat. Vui lòng đăng nhập.');
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, attachments?: string[]) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && (!attachments || attachments.length === 0)) || isSending || isStartingChat) return;

    const text = inputText.trim();
    setInputText('');

    if (!conversation) {
      await handleStartChat(text);
      return;
    }

    try {
      const res = await sendMessageMutation({
        conversationId: conversation.id,
        content: text,
        attachments
      });

      if (res.data) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === res.data.id)) return prev;
          return [...prev, res.data];
        });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Lỗi gửi tin nhắn');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            checkAdminPresence();
          }}
          className="flex items-center space-x-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4.5 py-3 rounded-full transition-all duration-200 cursor-pointer border border-sky-500"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Hỗ trợ Live Chat</span>
          {isAdminOnline && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
          )}
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[560px] bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden text-slate-800">
          {/* Header Light */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">TradeVerse CSKH</h3>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                  <span className={`w-2 h-2 rounded-full ${isAdminOnline ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <span>{isAdminOnline ? 'Admin Online' : 'Admin Offline'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Link
                href="/account?tab=support"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-1 text-xs text-sky-600 font-semibold hover:text-sky-700 cursor-pointer underline transition"
                title="Đến Trung tâm hỗ trợ"
              >
                <span>Trung tâm hỗ trợ</span>
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pure Realtime Live Chat Body */}
          <ViewChat
            conversation={conversation}
            messages={messages}
            inputText={inputText}
            setInputText={setInputText}
            isSending={isSending}
            isStartingChat={isStartingChat}
            redirectCountdown={redirectCountdown}
            autoConvertedTicketCode={autoConvertedTicketCode}
            onStartChat={handleStartChat}
            onSendMessage={handleSendMessage}
            onProceedToSupport={handleProceedToSupport}
            messagesEndRef={messagesEndRef}
          />
        </div>
      )}
    </div>
  );
};

export default SupportChatWidget;
