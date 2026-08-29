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

export interface SubscriptionDates {
  startDateStr: string;
  expiryDateStr: string;
  daysCount: number;
}

/**
 * Calculates subscription start date, expiry date, and duration count based on billing cycle.
 */
export function calculateSubscriptionDates(cycle: string): SubscriptionDates {
  const now = new Date();

  const startDateStr = formatDate(now);
  const expiryDate = new Date(now);
  if (cycle === 'yearly') {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  } else {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  }
  const expiryDateStr = formatDate(expiryDate);
  const daysCount = cycle === 'yearly' ? 365 : 30;

  return {
    startDateStr,
    expiryDateStr,
    daysCount,
  };
}

