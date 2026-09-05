import { useMutation } from '@tanstack/react-query';
import { uploadService } from '../services/uploadService';

export const UPLOAD_QUERY_KEYS = {
  all: ['upload'] as const,
};

/**
 * Hook Mutation upload 1 file đơn lẻ lên Supabase Storage
 * @param defaultFolder Thư mục lưu trữ mặc định
 */
export function useUploadSingleMutation(defaultFolder?: string) {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      uploadService.uploadSingleFile(file, folder || defaultFolder || 'uploads'),
  });
}

/**
 * Hook Mutation upload nhiều file đồng thời lên Supabase Storage
 * @param defaultFolder Thư mục lưu trữ mặc định
 */
export function useUploadMultipleMutation(defaultFolder?: string) {
  return useMutation({
    mutationFn: (files: File[] | { files: File[]; folder?: string }) => {
      if (Array.isArray(files)) {
        return uploadService.uploadMultipleFiles(files, defaultFolder || 'uploads');
      }
      return uploadService.uploadMultipleFiles(files.files, files.folder || defaultFolder || 'uploads');
    },
  });
}

/**
 * Hook Mutation xóa file trên Supabase Storage
 */
export function useDeleteFileMutation() {
  return useMutation({
    mutationFn: (urlOrPath: string) => uploadService.deleteFile(urlOrPath),
  });
}
