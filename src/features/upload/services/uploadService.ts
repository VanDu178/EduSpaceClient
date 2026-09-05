import api from '@/core/services/api';
import { UploadSingleResponse, UploadMultipleResponseItem } from '../types';

export const uploadService = {
  /**
   * Upload 1 file đơn lẻ lên Supabase Storage
   * @param file File cần upload
   * @param folder Thư mục lưu trữ (mặc định: 'uploads')
   * @returns Public URL chuỗi của file vừa upload
   */
  uploadSingleFile: async (file: File, folder = 'uploads'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data: UploadSingleResponse = res.data?.data;
    return data?.url || data?.path || '';
  },

  /**
   * Upload nhiều file đồng thời lên Supabase Storage
   * @param files Danh sách file cần upload
   * @param folder Thư mục lưu trữ (mặc định: 'uploads')
   * @returns Mảng danh sách các Public URL
   */
  uploadMultipleFiles: async (files: File[], folder = 'uploads'): Promise<string[]> => {
    if (!files || files.length === 0) return [];

    if (files.length === 1) {
      const singleUrl = await uploadService.uploadSingleFile(files[0], folder);
      return singleUrl ? [singleUrl] : [];
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('folder', folder);

    const res = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const dataList: UploadMultipleResponseItem[] = res.data?.data || [];
    return dataList.map((item) => item.url || item.path).filter(Boolean);
  },

  /**
   * Xóa file khỏi Supabase Storage
   * @param urlOrPath Đường dẫn hoặc Public URL của file
   */
  deleteFile: async (urlOrPath: string): Promise<boolean> => {
    const res = await api.delete('/upload', {
      data: { url: urlOrPath },
    });
    return Boolean(res.data?.success);
  },
};

export default uploadService;
