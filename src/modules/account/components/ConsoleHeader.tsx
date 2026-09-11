import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { TAB_TITLE_MAP } from '../constants';

interface ConsoleHeaderProps {
  activeTab: string;
}

export function ConsoleHeader({ activeTab }: ConsoleHeaderProps) {
  const currentTitle = TAB_TITLE_MAP[activeTab];

  return (
    <div className="pb-4 mb-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="space-y-1.5">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
          <span className="text-slate-600">Tài khoản</span>
          <ChevronRightIcon className="w-3 h-3 text-slate-400" />
          <span className="text-sky-600 font-semibold">{currentTitle}</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {currentTitle}
        </h1>
      </div>
    </div>
  );
}
