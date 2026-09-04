'use client';

import React, { useEffect } from 'react';
import {
  XMarkIcon,
  PhotoIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Image } from 'antd';

interface FormCreateProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newTicketTitle: string;
  setNewTicketTitle: (value: string) => void;
  newTicketCategory: string;
  setNewTicketCategory: (value: any) => void;
  newTicketDesc: string;
  setNewTicketDesc: (value: string) => void;
  newTicketAttachments: string[];
  setNewTicketAttachments: React.Dispatch<React.SetStateAction<string[]>>;
  onRemoveAttachment: (index: number) => void;
  isSubmittingTicket: boolean;
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

export function FormCreate({
  onClose,
  onSubmit,
  newTicketTitle,
  setNewTicketTitle,
  newTicketCategory,
  setNewTicketCategory,
  newTicketDesc,
  setNewTicketDesc,
  newTicketAttachments,
  setNewTicketAttachments,
  onRemoveAttachment,
  isSubmittingTicket,
}: FormCreateProps) {
  // Lắng nghe sự kiện bàn phím phím ESC để đóng Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmittingTicket) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSubmittingTicket]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    e.target.value = '';

    const remainingSlots = MAX_IMAGES - newTicketAttachments.length;
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
        setNewTicketAttachments((prev) => [...prev, ...dataUrls]);
        toast.success(`Đã thêm ${dataUrls.length} ảnh đính kèm thành công.`);
      }
    } catch (err) {
      console.error('Error reading image files:', err);
      toast.error('Có lỗi xảy ra khi đọc file ảnh.');
    }
  };

  const isMaxReached = newTicketAttachments.length >= MAX_IMAGES;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
      onClick={() => {
        if (!isSubmittingTicket) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl flex flex-col max-h-[90vh] sm:max-h-[580px] overflow-hidden"
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between text-xs font-bold text-sky-800 border-b border-slate-100 p-4 pb-3 bg-white shrink-0">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
              <TicketIcon className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900">Tạo Yêu Cầu Hỗ Trợ Mới</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmittingTicket}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            title="Đóng cửa sổ"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Field: Title */}
          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-semibold">
              Tiêu đề sự cố <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              disabled={isSubmittingTicket}
              placeholder="VD: Lỗi chuyển khoản chưa nhận Pro"
              value={newTicketTitle}
              onChange={(e) => setNewTicketTitle(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Field: Category */}
          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-semibold">
              Phân loại sự cố <span className="text-red-500">*</span>
            </label>
            <select
              value={newTicketCategory}
              disabled={isSubmittingTicket}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTicketCategory(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="PAYMENT">Thanh toán / Chuyển khoản</option>
              <option value="ACCOUNT">Tài khoản / Đăng nhập</option>
              <option value="TECHNICAL">Lỗi Kỹ thuật</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>

          {/* Field: Description */}
          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-semibold">
              Mô tả chi tiết <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              disabled={isSubmittingTicket}
              placeholder="Mô tả nội dung chi tiết sự cố gặp phải..."
              value={newTicketDesc}
              onChange={(e) => setNewTicketDesc(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Upload Section */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-800 font-semibold flex items-center space-x-1">
                <span>Hình ảnh minh họa</span>
                <span className="text-[11px] font-mono text-sky-700 font-bold bg-sky-100 px-1.5 py-0.5 rounded-md">
                  {newTicketAttachments.length}/3
                </span>
              </label>
            </div>

            <input
              id="ticket-image-upload-input"
              type="file"
              onChange={handleFileSelect}
              accept="image/*, .png, .jpg, .jpeg, .webp, .gif"
              multiple
              className="hidden"
              disabled={isSubmittingTicket || isMaxReached}
            />

            {!isMaxReached && (
              <label
                htmlFor="ticket-image-upload-input"
                className={`group flex flex-col items-center justify-center space-y-1.5 w-full p-3.5 border-2 border-dashed border-sky-300 hover:border-sky-500 bg-gradient-to-br from-sky-50/70 to-blue-50/40 hover:from-sky-100/80 hover:to-blue-100/60 text-sky-800 rounded-xl cursor-pointer transition duration-200 ${
                  isSubmittingTicket ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center space-x-1.5 font-semibold text-xs text-sky-700">
                  <PhotoIcon className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform duration-200" />
                  <span>Chọn hình ảnh từ thiết bị</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
                  <span className="text-slate-500 font-medium">Hỗ trợ:</span>
                  <div className="flex items-center gap-1">
                    {['PNG', 'JPG', 'JPEG', 'WEBP', 'GIF'].map((ext) => (
                      <span
                        key={ext}
                        className="bg-white/90 border border-sky-200 text-sky-700 font-semibold px-1.5 py-0.2 rounded text-[10px]"
                      >
                        {ext}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">Tối đa 5MB/ảnh</span>
                </div>
              </label>
            )}

            {newTicketAttachments.length > 0 && (
              <Image.PreviewGroup>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {newTicketAttachments.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative group border border-slate-200 rounded-xl overflow-hidden aspect-square w-full bg-slate-100 hover:border-sky-400 transition duration-200"
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
                        disabled={isSubmittingTicket}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemoveAttachment(idx);
                        }}
                        className="absolute top-1 right-1 z-10 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer transition disabled:pointer-events-none"
                        title="Xóa ảnh này"
                      >
                        <XMarkIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </Image.PreviewGroup>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmittingTicket}
            className={`w-full py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition duration-200 ${
              isSubmittingTicket ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmittingTicket ? 'Đang gửi Yêu cầu...' : 'Gửi Yêu Cầu Hỗ Trợ'}
          </button>
        </div>
      </form>
    </div>
  );
}
