export const PAYMENT_TRANSACTION_STATUS_MAP = {
  PENDING: 'pending',
  PARTIALLY_PAID: 'partially_paid',
  COMPLETED: 'completed',
  OVERPAID: 'overpaid',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;
