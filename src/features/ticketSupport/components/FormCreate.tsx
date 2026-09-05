'use client';

import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  PhotoIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';
import { Image, Select } from 'antd';
import { TicketCategoryKey } from '../types';
import { useCreateTicketMutation } from '../hooks';
import { useUploadMultipleMutation } from '@/features/upload';
import { TICKET_CATEGORY_OPTIONS } from '../constants';

export interface FormCreateProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 3;

interface PreviewFile {
  file: File;
  url: string;
}

export function FormCreate({ onClose, onSuccess }: FormCreateProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TicketCategoryKey>('TECHNICAL');
  const [description, setDescription] = useState('');
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    description?: string;
    file?: string;
    general?: string;
  }>({});

  const { isPending: isCreatingTicket, mutateAsync: createTicketMutation } = useCreateTicketMutation();
  const { mutateAsync: uploadImages, isPending: isUploadingImages } = useUploadMultipleMutation('support-tickets');
  const isSubmitting = isCreatingTicket || isUploadingImages;

  // Dọn dẹp memory Object URLs khi unmount
  useEffect(() => {
    return () => {
      previewFiles.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, []);

  // Lắng nghe sự kiện bàn phím ESC để đóng Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSubmitting]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    e.target.value = '';

    const remainingSlots = MAX_IMAGES - previewFiles.length;
    if (remainingSlots <= 0) {
      setFormErrors((prev) => ({ ...prev, file: 'Bạn đã đính kèm tối đa 3 hình ảnh.' }));
      return;
    }

    let fileErrorMsg: string | undefined = undefined;
    const filesToProcess = fileArray.slice(0, remainingSlots);
    const newItems: PreviewFile[] = [];

    for (const file of filesToProcess) {
      const isImageMime = file.type ? file.type.toLowerCase().startsWith('image/') : false;
      const isImageExt = /\.(jpe?g|png|webp|gif|bmp|heic|svg|jfif)$/i.test(file.name);

      if (!isImageMime && !isImageExt) {
        fileErrorMsg = `File "${file.name}" không phải định dạng ảnh hợp lệ.`;
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        fileErrorMsg = `File "${file.name}" vượt quá dung lượng 5MB.`;
        continue;
      }

      newItems.push({
        file,
        url: URL.createObjectURL(file),
      });
    }

    if (newItems.length > 0) {
      setPreviewFiles((prev) => [...prev, ...newItems]);
      setFormErrors((prev) => ({ ...prev, file: fileErrorMsg }));
    } else if (fileErrorMsg) {
      setFormErrors((prev) => ({ ...prev, file: fileErrorMsg }));
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setPreviewFiles((prev) => {
      const itemToRemove = prev[index];
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.url);
      }
      return prev.filter((_, i) => i !== index);
    });
    setFormErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { title?: string; description?: string; general?: string } = {};

    if (!title.trim()) {
      errors.title = 'Vui lòng nhập tiêu đề sự cố';
    }

    if (!description.trim()) {
      errors.description = 'Vui lòng nhập nội dung mô tả chi tiết';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      // 1. Upload ảnh lên Supabase CHỈ KHI submit form (tránh rác ảnh khi chưa ấn gửi)
      let uploadedUrls: string[] = [];
      if (previewFiles.length > 0) {
        const rawFiles = previewFiles.map((item) => item.file);
        uploadedUrls = await uploadImages(rawFiles);
      }

      // 2. Tạo Ticket mới với danh sách URL ảnh trên Supabase
      await createTicketMutation({
        title: title.trim(),
        description: description.trim(),
        category,
        attachments: uploadedUrls.length > 0 ? uploadedUrls : undefined,
      });

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err: any) {
      const apiMsg = err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi gửi Yêu cầu hỗ trợ';
      setFormErrors({ general: apiMsg });
    }
  };

  const isMaxReached = previewFiles.length >= MAX_IMAGES;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
      onClick={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl flex flex-col max-h-[90vh] sm:max-h-[600px] overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-bold text-sky-800 border-b border-slate-100 p-4 pb-3 bg-white shrink-0">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
              <TicketIcon className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900">Tạo yêu cầu hỗ trợ mới</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer disabled:pointer-events-none disabled:opacity-50"
            title="Đóng cửa sổ"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* General Error Alert Banner */}
          {formErrors.general && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
              {formErrors.general}
            </div>
          )}

          {/* Field: Title */}
          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-semibold">
              Tiêu đề sự cố <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              placeholder="VD: Lỗi chuyển khoản chưa nhận Pro"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (formErrors.title) {
                  setFormErrors((prev) => ({ ...prev, title: undefined }));
                }
              }}
              className={`w-full bg-slate-50/80 border ${formErrors.title ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20'
                } text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl focus:outline-none focus:bg-white focus:ring-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {formErrors.title && (
              <p className="text-red-500 text-[11px] font-medium mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* Field: Category (Ant Design Select) */}
          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-semibold">
              Phân loại sự cố <span className="text-red-500">*</span>
            </label>
            <Select
              value={category}
              disabled={isSubmitting}
              onChange={(val) => setCategory(val)}
              options={TICKET_CATEGORY_OPTIONS}
              className="w-full text-xs sm:text-sm"
            />
          </div>

          {/* Field: Description */}
          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-semibold">
              Mô tả chi tiết <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              disabled={isSubmitting}
              placeholder="Mô tả nội dung chi tiết sự cố gặp phải..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (formErrors.description) {
                  setFormErrors((prev) => ({ ...prev, description: undefined }));
                }
              }}
              className={`w-full bg-slate-50/80 border ${formErrors.description ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-sky-500 focus:ring-sky-500/20'
                } text-xs sm:text-sm text-slate-800 p-2.5 rounded-xl focus:outline-none focus:bg-white focus:ring-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {formErrors.description && (
              <p className="text-red-500 text-[11px] font-medium mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Upload Section */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-800 font-semibold flex items-center space-x-1">
                <span>Hình ảnh minh họa</span>
                <span className="text-[11px] font-mono text-sky-700 font-bold bg-sky-100 px-1.5 py-0.5 rounded-md">
                  {previewFiles.length}/3
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
              disabled={isSubmitting || isMaxReached}
            />

            {!isMaxReached && (
              <label
                htmlFor="ticket-image-upload-input"
                className={`group flex flex-col items-center justify-center space-y-1.5 w-full p-3.5 border-2 border-dashed border-sky-300 hover:border-sky-500 bg-gradient-to-br from-sky-50/70 to-blue-50/40 hover:from-sky-100/80 hover:to-blue-100/60 text-sky-800 rounded-xl cursor-pointer transition duration-200 ${isSubmitting ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
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

            {formErrors.file && (
              <p className="text-red-500 text-[11px] font-medium mt-1.5">{formErrors.file}</p>
            )}

            {previewFiles.length > 0 && (
              <Image.PreviewGroup>
                <div className="flex flex-wrap gap-2 mt-3">
                  {previewFiles.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative group border border-slate-200 rounded-lg overflow-hidden w-20 h-20 bg-slate-100 hover:border-sky-400 transition duration-200 shrink-0"
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
                        disabled={isSubmitting}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveAttachment(idx);
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
            disabled={isSubmitting}
            className={`w-full py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition duration-200 flex items-center justify-center space-x-2 ${isSubmitting ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang gửi Yêu cầu...</span>
              </>
            ) : (
              <span>Gửi Yêu Cầu Hỗ Trợ</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreate;
