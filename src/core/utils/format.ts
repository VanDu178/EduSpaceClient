/**
 /**
 * Centralized formatting utility helper functions
 */

export function formatDate(dateStr?: string | Date | null, showTime: boolean = false): string {
  if (!dateStr) return '--';
  try {
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '--';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (showTime) {
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return `${day}/${month}/${year}`;
  } catch (error) {
    return '--';
  }
}

export function formatCurrency(amount?: number | null): string {
  if (amount === undefined || amount === null) return '0 ₫';
  return `${Number(amount).toLocaleString('vi-VN')} ₫`;
}
