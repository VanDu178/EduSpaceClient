'use client';

import { ModalCancel } from '@/modules/paymentTransactions';
import { UserTransactionItem } from '../types';

export interface CancelTransactionModalProps {
  cancelModalTx: UserTransactionItem | null;
  onClose: () => void;
  onConfirm: (code: string) => Promise<void>;
  isLoading?: boolean;
}

export function CancelTransactionModal({
  cancelModalTx,
  onClose,
  onConfirm,
  isLoading = false,
}: CancelTransactionModalProps) {
  const cancelTxPaidAmount = Number(
    (cancelModalTx as any)?.paidAmount ||
      Math.max(
        0,
        Number(cancelModalTx?.amount || 0) - Number((cancelModalTx as any)?.remainingAmount || 0)
      )
  );

  return (
    <ModalCancel
      isOpen={Boolean(cancelModalTx)}
      onClose={onClose}
      onConfirm={async () => {
        if (cancelModalTx) {
          await onConfirm(cancelModalTx.code);
          onClose();
        }
      }}
      code={cancelModalTx?.code}
      planName={cancelModalTx?.plan?.name}
      status={cancelModalTx?.status}
      paidAmount={cancelTxPaidAmount}
      isLoading={isLoading}
    />
  );
}
