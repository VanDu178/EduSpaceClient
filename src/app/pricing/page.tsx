import { Metadata } from 'next';
import { MembershipPlanList } from '@/features/membership';

export const metadata: Metadata = {
  title: 'Gói Hội Viên & Bảng Giá | TradeVerse',
  description: 'Nâng tầm tư duy và hiệu suất giao dịch với các gói hội viên TradeVerse. Mở khóa toàn bộ bài viết trả phí, phân tích chuyên sâu và bộ công cụ Quant độc quyền.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <MembershipPlanList />
    </main>
  );
}
