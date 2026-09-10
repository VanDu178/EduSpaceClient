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
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return input
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    doc.querySelectorAll('script, style').forEach((el) => el.remove());
    return (doc.body.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
  } catch {
    return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}
