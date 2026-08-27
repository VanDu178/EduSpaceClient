import {
  QrCodeIcon,
  CreditCardIcon,
  WalletIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

interface PaymentMethodIconProps {
  iconName?: string | null;
  className?: string;
  alt?: string;
}

export const PaymentMethodIcon = ({
  iconName,
  className = 'w-5 h-5',
  alt = 'Phương thức thanh toán',
}: PaymentMethodIconProps) => {
  if (!iconName) {
    return <CreditCardIcon className={className} />;
  }

  const normalized = iconName.trim();

  switch (normalized) {
    case 'QrCodeIcon':
      return <QrCodeIcon className={className} />;
    case 'CreditCardIcon':
      return <CreditCardIcon className={className} />;
    case 'WalletIcon':
      return <WalletIcon className={className} />;
    default:
      return <AdjustmentsHorizontalIcon className={className} />;
  }
};

export default PaymentMethodIcon;
