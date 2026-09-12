'use client';

import React, { useRef, useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { SupportConversation, SupportMessage } from '../services/chatSupportService';
import { uploadService } from '@/modules/upload';
import { TickerNotice } from './TickerNotice';
import toast from 'react-hot-toast';

interface ViewChatProps {
  conversation: SupportConversation | null;
  messages: SupportMessage[];
  inputText: string;
  setInputText: (value: string) => void;
  isSending: boolean;
  isStartingChat: boolean;
  redirectCountdown: number | null;
  autoConvertedTicketCode: string | null;
  onStartChat: (initialMsg?: string) => void;
  onSendMessage: (e?: React.FormEvent, attachments?: string[]) => void;
  onProceedToSupport?: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

interface PendingFileItem {
  file: File;
  previewUrl: string;
}

export function ViewChat({
  conversation,
  messages,
  inputText,
  setInputText,
  isSending,
  isStartingChat,
  redirectCountdown,
  autoConvertedTicketCode,
  onStartChat,
  onSendMessage,
  onProceedToSupport,
  messagesEndRef,
}: ViewChatProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const pendingFilesRef = useRef<PendingFileItem[]>([]);
  React.useEffect(() => {
    pendingFilesRef.current = pendingFiles;
  }, [pendingFiles]);

  // Cleanup Blob Preview URLs on unmount (Không upload rác lên Supabase khi chưa ấn Gửi)
  React.useEffect(() => {
    return () => {
      if (pendingFilesRef.current.length > 0) {
        pendingFilesRef.current.forEach((item) => {
          URL.revokeObjectURL(item.previewUrl);
        });
      }
    };
  }, []);

  const isInputDisabled = isSending || isStartingChat || isUploading || redirectCountdown !== null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    e.target.value = '';

    if (!file.type.toLowerCase().startsWith('image/')) {
      toast.error('Vui lòng chọn định dạng file hình ảnh hợp lệ.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPendingFiles((prev) => [...prev, { file, previewUrl }]);
  };

  const handleRemoveAttachment = (index: number) => {
    const targetItem = pendingFiles[index];
    if (targetItem) {
      URL.revokeObjectURL(targetItem.previewUrl);
    }
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && pendingFiles.length === 0) return;

    let uploadedUrls: string[] = [];
    if (pendingFiles.length > 0) {
      try {
        setIsUploading(true);
        const rawFiles = pendingFiles.map((item) => item.file);
        uploadedUrls = await uploadService.uploadMultipleFiles(rawFiles, 'support-chat');
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi tải ảnh.');
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSendMessage(e, uploadedUrls.length > 0 ? uploadedUrls : undefined);

    // Dọn dẹp Blob Preview URLs sau khi đã gửi thành công
    pendingFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setPendingFiles([]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <TickerNotice
          redirectCountdown={redirectCountdown}
          autoConvertedTicketCode={autoConvertedTicketCode}
          onProceedToSupport={onProceedToSupport}
        />

        {!conversation && redirectCountdown === null && (
          <div className="text-center py-8 px-4 space-y-4">
            <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-sky-600">
              <ChatBubbleLeftRightIcon className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Xin chào! Bạn có thắc mắc hoặc cần hỗ trợ sự cố nạp tiền/chuyển khoản?
            </p>
            <button
              onClick={() => onStartChat()}
              disabled={isStartingChat}
              className={`w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl border border-sky-500 flex items-center justify-center space-x-2 transition ${
                isStartingChat ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {isStartingChat ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin text-white" />
                  <span>Đang kết nối tới admin...</span>
                </>
              ) : (
                <span>Kết nối với Admin CSKH</span>
              )}
            </button>
          </div>
        )}

        {isStartingChat && conversation && (
          <div className="bg-sky-50 border border-sky-200 text-sky-800 text-xs px-3 py-2 rounded-xl flex items-center justify-center space-x-2 animate-pulse font-medium">
            <ArrowPathIcon className="w-4 h-4 animate-spin text-sky-600" />
            <span>Đang kết nối tới nhân viên hỗ trợ...</span>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.senderType === 'USER';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm space-y-2 ${
                  isUser
                    ? 'bg-sky-600 text-white rounded-br-none shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                }`}
              >
                {msg.content && <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>}

                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.attachments.map((attUrl, idx) => (
                      <a
                        key={idx}
                        href={attUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg overflow-hidden border border-slate-200/40 hover:opacity-90 transition"
                      >
                        <img
                          src={attUrl}
                          alt="attachment"
                          className="w-36 h-28 object-cover rounded-lg"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar Light */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex flex-col space-y-2">
        {/* Pending Image Attachments Preview */}
        {pendingFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {pendingFiles.map((item, index) => (
              <div key={index} className="relative group w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <img src={item.previewUrl} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(index)}
                  className="absolute top-0.5 right-0.5 bg-slate-900/70 hover:bg-slate-900 text-white p-0.5 rounded-full cursor-pointer"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isInputDisabled}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isInputDisabled}
            className="p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Gửi hình ảnh"
          >
            {isUploading ? <ArrowPathIcon className="w-5 h-5 animate-spin text-sky-600" /> : <PhotoIcon className="w-5 h-5" />}
          </button>

          <input
            type="text"
            placeholder={
              redirectCountdown !== null
                ? 'Đang chuyển sang tạo Ticket...'
                : isStartingChat
                ? 'Đang kết nối tới admin...'
                : 'Nhập nội dung cần hỗ trợ...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isInputDisabled}
            className={`flex-1 bg-slate-50 border border-slate-200 text-sm text-slate-800 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-sky-500 ${
              isInputDisabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <button
            type="submit"
            disabled={isInputDisabled || (!inputText.trim() && pendingFiles.length === 0)}
            className={`p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition ${
              isInputDisabled || (!inputText.trim() && pendingFiles.length === 0) ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isStartingChat || isSending ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
