'use client';

import React from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Image } from 'antd';
import { Ticket } from '../services/ticketSupportService';

interface ViewDetailProps {
  selectedTicket: Ticket;
  onBack: () => void;
  commentText: string;
  setCommentText: (value: string) => void;
  commentAttachments: string[];
  setCommentAttachments: React.Dispatch<React.SetStateAction<string[]>>;
  onRemoveCommentAttachment: (index: number) => void;
  onAddComment: (e: React.FormEvent) => void;
  isSubmittingComment: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 3;

const readAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Lỗi chuyển đổi ảnh'));
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export function ViewDetail({
  selectedTicket,
  onBack,
  commentText,
  setCommentText,
  commentAttachments,
  setCommentAttachments,
  onRemoveCommentAttachment,
  onAddComment,
  isSubmittingComment,
}: ViewDetailProps) {
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    e.target.value = '';

    const remainingSlots = MAX_IMAGES - commentAttachments.length;
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

    try {
      const dataUrls = await Promise.all(validFiles.map((file) => readAsDataURL(file)));
      if (dataUrls.length > 0) {
        setCommentAttachments((prev) => [...prev, ...dataUrls]);
        toast.success(`Đã thêm ${dataUrls.length} ảnh đính kèm thành công.`);
      }
    } catch (err) {
      console.error('Error reading image files:', err);
      toast.error('Có lỗi xảy ra khi đọc file ảnh.');
    }
  };

  const isMaxReached = commentAttachments.length >= MAX_IMAGES;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <button
        onClick={onBack}
        className="text-xs text-sky-600 hover:underline mb-2 self-start flex items-center space-x-1 cursor-pointer font-medium"
      >
        <span>&larr; Quay lại danh sách</span>
      </button>
      <div className="bg-white border border-slate-200 p-3 rounded-xl mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-mono text-sky-700 font-semibold">#{selectedTicket.code}</span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
            {selectedTicket.status}
          </span>
        </div>
        <h4 className="text-sm font-bold text-slate-900">{selectedTicket.title}</h4>
        <p className="text-xs text-slate-700 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200 whitespace-pre-wrap">
          {selectedTicket.description}
        </p>
      </div>

      {/* Ticket Comments History */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-2">
        <h5 className="text-xs font-semibold text-slate-500">Lịch sử phản hồi:</h5>
        {selectedTicket.comments?.map((c) => (
          <div
            key={c.id}
            className={`p-2.5 rounded-xl text-xs ${c.sender?.role === 'admin'
              ? 'bg-purple-50 border border-purple-200 text-purple-900'
              : 'bg-white border border-slate-200 text-slate-800'
              }`}
          >
            <div className="flex items-center justify-between font-medium text-[11px] mb-1">
              <span className={c.sender?.role === 'admin' ? 'text-purple-700 font-bold' : 'text-sky-700 font-semibold'}>
                {c.sender?.name || c.sender?.email} {c.sender?.role === 'admin' && '(Admin)'}
              </span>
              <span className="text-slate-400">
                {new Date(c.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="whitespace-pre-wrap">{c.content}</p>

            {/* Render attachments if any using AntD Image */}
            {Array.isArray(c.attachments) && c.attachments.length > 0 && (
              <Image.PreviewGroup>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {c.attachments.map((imgUrl: string, imgIdx: number) => (
                    <div
                      key={imgIdx}
                      className="border border-slate-200 rounded-lg overflow-hidden w-14 h-14 bg-slate-100"
                    >
                      <Image
                        src={imgUrl}
                        alt="attachment"
                        width="100%"
                        height="100%"
                        className="w-full h-full object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </Image.PreviewGroup>
            )}
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      {selectedTicket.status !== 'CLOSED' && (
        <form onSubmit={onAddComment} className="flex flex-col space-y-2 pt-2 border-t border-slate-200">
          {/* File Input */}
          <input
            id="comment-image-upload-input"
            type="file"
            onChange={handleFileSelect}
            accept="image/*, .png, .jpg, .jpeg, .webp, .gif"
            multiple
            className="hidden"
            disabled={isSubmittingComment || isMaxReached}
          />

          {/* Upload Button & File Info */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="comment-image-upload-input"
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] rounded-lg font-medium cursor-pointer transition ${
                isSubmittingComment || isMaxReached ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <PhotoIcon className="w-4 h-4 text-sky-600" />
              <span>Đính kèm ảnh</span>
              <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded-md">
                {commentAttachments.length}/3
              </span>
            </label>

            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              {['PNG', 'JPG', 'WEBP', 'GIF'].map((ext) => (
                <span
                  key={ext}
                  className="bg-white border border-slate-200 text-slate-700 font-semibold px-1 py-0.2 rounded text-[10px]"
                >
                  {ext}
                </span>
              ))}
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">Tối đa 5MB/ảnh</span>
            </div>
          </div>

          {/* Attached Thumbnails using AntD Image */}
          {commentAttachments.length > 0 && (
            <Image.PreviewGroup>
              <div className="flex flex-wrap gap-1.5 my-1">
                {commentAttachments.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative border border-slate-200 rounded-lg overflow-hidden w-12 h-12 bg-slate-100 group"
                  >
                    <Image
                      src={url}
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
                        onRemoveCommentAttachment(idx);
                      }}
                      className="absolute top-0 right-0 z-10 bg-red-500 hover:bg-red-600 text-white rounded-bl p-0.5 cursor-pointer transition disabled:pointer-events-none"
                      title="Xóa ảnh này"
                    >
                      <XMarkIcon className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Image.PreviewGroup>
          )}

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Nhập câu phản hồi..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isSubmittingComment}
              className="flex-1 bg-white border border-slate-200 text-xs text-slate-800 px-3 py-2 rounded-lg"
            />
            <button
              type="submit"
              disabled={isSubmittingComment || (!commentText.trim() && commentAttachments.length === 0)}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs px-3 py-2 rounded-lg font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            >
              Gửi
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
