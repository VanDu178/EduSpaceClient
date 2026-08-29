import { BlogIllustrationType } from '../types';

/**
 * Utility functions for the Blogs feature module
 */

export function getReadTime(content?: string | null, summary?: string | null): string {
  const textLength = (content?.length || 0) + (summary?.length || 0);
  const minutes = Math.max(3, Math.ceil(textLength / 400));
  return `${minutes} phút đọc`;
}

export function getCoverConfig(code?: string): {
  coverColor: string;
  illustrationType: BlogIllustrationType;
} {
  switch (code?.toUpperCase()) {
    case 'TUDUY':
      return { coverColor: '#EFF6FF', illustrationType: 'tuduy' };
    case 'PHUONGPHAP':
      return { coverColor: '#FAF5FF', illustrationType: 'phuongphap' };
    case 'QUANT':
      return { coverColor: '#FFFBEB', illustrationType: 'quant' };
    default:
      return { coverColor: '#F8FAFC', illustrationType: 'tuduy' };
  }
}

export function extractPlainText(input?: string | null): string {
  if (!input) return '';
  return input
    .replace(/<[^>]+>/g, ' ') // Xóa toàn bộ các thẻ HTML, giữ lại nội dung chữ bên trong
    .replace(/&nbsp;/g, ' ')  // Decode ký tự khoảng trắng HTML
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')     // Chuẩn hóa nhiều khoảng trắng thành 1 khoảng trắng
    .trim();
}
