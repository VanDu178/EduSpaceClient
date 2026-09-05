'use client';

import React from 'react';
import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Image } from 'antd';
import toast from 'react-hot-toast';
import { Ticket } from '../types';
import { getStatusConfig } from '../utils';
import { formatDate } from '@/core/utils';

export interface CommentFile {
  file: File;
  url: string;
}

export interface ViewDetailProps {
  ticket: Ticket;
  commentText: string;
  setCommentText: (value: string) => void;
  commentFiles: CommentFile[];
  setCommentFiles: React.Dispatch<React.SetStateAction<CommentFile[]>>;
  onRemoveCommentFile: (index: number) => void;
  onAddComment: (e: React.FormEvent) => void;
  isSubmittingComment: boolean;
  onBack?: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 3;

export function ViewDetail({
  ticket,
  commentText,
  setCommentText,
  commentFiles,
  setCommentFiles,
  onRemoveCommentFile,
  onAddComment,
  isSubmittingComment,
  onBack,
}: ViewDetailProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    e.target.value = '';

    const remainingSlots = MAX_IMAGES - commentFiles.length;
    if (remainingSlots <= 0) {
      toast.error('Bạn đã đính kèm tối đa 3 hình ảnh.');
      return;
    }

    if (fileArray.length > remainingSlots) {
      toast.error(`Chỉ được chọn thêm tối đa ${remainingSlots} hình ảnh.`);
    }

    const filesToProcess = fileArray.slice(0, remainingSlots);
    const validFiles: File[] = [];

    for (const file of filesToProcess) {
      const isImageMime = file.type ? file.type.toLowerCase().startsWith('image/') : false;
      const isImageExt = /\.(jpe?g|png|webp|gif|bmp|heic|svg|jfif)$/i.test(file.name);

      if (!isImageMime && !isImageExt) {
        toast.error(`File "${file.name}" không phải định dạng ảnh hợp lệ.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" vượt quá dung lượng 5MB.`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const newFiles: CommentFile[] = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setCommentFiles((prev) => [...prev, ...newFiles]);
    toast.success(`Đã thêm ${newFiles.length} ảnh đính kèm.`);
  };

  const isMaxReached = commentFiles.length >= MAX_IMAGES;
  const statusConfig = getStatusConfig(ticket.status);

  return (
    <div className="space-y-5">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1.5 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {ticket.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center space-x-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusConfig.bgClass} ${statusConfig.textClass}`}>
              <span className={`w-2 h-2 rounded-full ${statusConfig.dotClass}`} />
              <span>{statusConfig.label}</span>
            </span>

            <span className="text-xs text-slate-500 flex items-center space-x-1">
              <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Khởi tạo lúc: {formatDate(ticket.createdAt, true)}</span>
            </span>
          </div>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 bg-sky-50/60 hover:bg-sky-100/80 border border-sky-200/80 px-3.5 py-2 rounded-xl transition cursor-pointer shrink-0 self-start sm:self-center"
          >
            <ArrowLeftIcon className="w-4 h-4 text-sky-600" />
            <span>Quay lại danh sách Ticket</span>
          </button>
        )}
      </div>

      {/* Nội dung yêu cầu */}
      <div className="py-2 space-y-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Nội dung yêu cầu
        </span>
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-wrap border-l-4 border-sky-500 bg-sky-50/40 p-4 rounded-r-2xl">
          {ticket.description}
        </div>
      </div>

      {/* Lịch sử phản hồi & Form trả lời */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 flex items-center space-x-2">
            <span>Lịch sử trao đổi & phản hồi</span>
          </h3>
        </div>

        {/* Scrollable Comments Timeline List Container */}
        <div className="max-h-[480px] overflow-y-auto pr-1 border-y border-slate-100 py-4">
          {(!ticket.comments || ticket.comments.length === 0) ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Chưa có phản hồi nào cho Yêu cầu này. Đội ngũ CSKH TradeVerse sẽ sớm phản hồi bạn.
            </div>
          ) : (
            <div className="relative pl-1 sm:pl-2 space-y-5 before:absolute before:left-4 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200/80">
              {ticket.comments.map((comment) => {
                const isAdmin = comment.sender?.role?.toLowerCase() === 'admin';

                return (
                  <div key={comment.id} className="relative flex items-start space-x-3 sm:space-x-4">
                    {/* Timeline Node Icon (Avatar) */}
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${isAdmin
                        ? 'bg-slate-100 border-slate-300 text-slate-500'
                        : 'bg-sky-50 border-sky-500 text-sky-600'
                        }`}
                    >
                      {isAdmin ? (
                        <Image
                          src="/images/logo.png"
                          alt="Admin"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          preview={false}
                        />
                      ) : (
                        <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>

                    {/* Comment Content Card */}
                    <div
                      className={`flex-1 min-w-0 p-4 rounded-2xl border ${isAdmin
                        ? 'bg-white border-slate-200/90 border-l-4 border-l-slate-400'
                        : 'bg-sky-50/40 border-sky-200/90 border-l-4 border-l-sky-500'
                        }`}
                    >
                      {/* Header Card: Sender Name, Role Badge, Timestamp */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="text-sm font-semibold text-slate-900 truncate">
                            {isAdmin ? 'Chuyên viên CSKH TradeVerse' : 'Bạn'}
                          </span>
                        </div>

                        <span className="text-xs text-slate-400 flex items-center space-x-1">
                          <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(comment.createdAt, true)}</span>
                        </span>
                      </div>

                      {/* Content Body */}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-800 font-normal">
                        {comment.content}
                      </p>

                      {/* Attachments */}
                      {Array.isArray(comment.attachments) && comment.attachments.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200/50">
                          <p className="text-[11px] font-medium text-slate-500 mb-2 flex items-center space-x-1">
                            <PaperClipIcon className="w-3.5 h-3.5" />
                            <span>Ảnh đính kèm ({comment.attachments.length}):</span>
                          </p>
                          <Image.PreviewGroup>
                            <div className="flex flex-wrap gap-2">
                              {comment.attachments.map((imgUrl, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className="w-18 h-18 border border-slate-200 rounded-xl overflow-hidden bg-white"
                                >
                                  <Image
                                    src={imgUrl}
                                    alt={`attachment-${imgIdx}`}
                                    width="100%"
                                    height="100%"
                                    className="w-full h-full object-cover"
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                              ))}
                            </div>
                          </Image.PreviewGroup>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* New Reply Form */}
        {ticket.status !== 'CLOSED' ? (
          <form onSubmit={onAddComment} className="space-y-2">
            {/* Selected Image Thumbnails */}
            {commentFiles.length > 0 && (
              <Image.PreviewGroup>
                <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
                  {commentFiles.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative border border-slate-200 rounded-xl overflow-hidden w-16 h-16 bg-slate-100 group"
                    >
                      <Image
                        src={item.url}
                        alt={`attachment-${idx}`}
                        width="100%"
                        height="100%"
                        className="w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        disabled={isSubmittingComment}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemoveCommentFile(idx);
                        }}
                        className="absolute top-1 right-1 z-10 bg-slate-900/70 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer transition disabled:pointer-events-none"
                        title="Xóa ảnh"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {commentFiles.length < 3 && (
                    <label
                      htmlFor="detail-image-upload-input"
                      className="w-16 h-16 border-2 border-dashed border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-sky-600 cursor-pointer transition"
                    >
                      <PhotoIcon className="w-5 h-5" />
                      <span className="text-[10px] font-medium mt-0.5">+Thêm</span>
                    </label>
                  )}
                </div>
              </Image.PreviewGroup>
            )}

            {/* Integrated Chat Input Bar */}
            <div className="flex items-end gap-2 bg-slate-100/80 hover:bg-slate-100 border border-slate-200 focus-within:border-sky-500 focus-within:bg-white rounded-2xl p-2 transition">
              <input
                id="detail-image-upload-input"
                type="file"
                onChange={handleFileSelect}
                accept="image/*, .png, .jpg, .jpeg, .webp, .gif"
                multiple
                className="hidden"
                disabled={isSubmittingComment || isMaxReached}
              />

              {/* Upload Image Icon Button */}
              <label
                htmlFor="detail-image-upload-input"
                title={isMaxReached ? 'Đã đạt tối đa 3 ảnh' : 'Đính kèm hình ảnh (Tối đa 3 ảnh, 5MB/ảnh)'}
                className={`flex items-center justify-center w-9 h-9 rounded-full text-sky-600 hover:bg-sky-100/70 cursor-pointer transition shrink-0 ${isSubmittingComment || isMaxReached ? 'pointer-events-none opacity-40 cursor-not-allowed' : ''
                  }`}
              >
                <PhotoIcon className="w-5 h-5" />
              </label>

              {/* Textarea Input */}
              <textarea
                rows={1}
                placeholder="Nhập phản hồi..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isSubmittingComment && (commentText.trim() || commentFiles.length > 0)) {
                      onAddComment(e);
                    }
                  }
                }}
                disabled={isSubmittingComment}
                className="w-full bg-transparent border-0 p-1 text-sm text-slate-800 focus:outline-none transition resize-none disabled:opacity-50 disabled:cursor-not-allowed max-h-32 min-h-[36px] py-1.5"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmittingComment || (!commentText.trim() && commentFiles.length === 0)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition shrink-0 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed border border-sky-500"
                title="Gửi phản hồi"
              >
                {isSubmittingComment ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <PaperAirplaneIcon className="w-4 h-4 -translate-y-[0.5px] translate-x-[0.5px]" />
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl text-center text-xs text-slate-600 font-medium">
            Ticket này đã đóng. Không thể gửi thêm phản hồi mới.
          </div>
        )}
      </div>
    </div >
  );
}

export default ViewDetail;
