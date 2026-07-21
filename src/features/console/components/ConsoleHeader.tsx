"use client";

import { Avatar } from "antd";
import {
  UserIcon,
  BookmarkIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

interface ConsoleHeaderProps {
  userName?: string;
  email?: string;
  savedCount: number;
  coursesCount: number;
  servicesCount: number;
  transactionsCount: number;
}

export function ConsoleHeader({
  userName = "Phạm Văn Trí",
  email = "vantri.quant@eduspace.vn",
  savedCount,
  coursesCount,
  servicesCount,
  transactionsCount,
}: ConsoleHeaderProps) {
  return (
    <div className="w-full bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: User info */}
        <div className="flex items-center gap-4">
          <Avatar
            size={72}
            icon={<UserIcon className="w-9 h-9 text-blue-600 dark:text-blue-400" />}
            className="bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {userName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                <CheckBadgeIcon className="w-3.5 h-3.5" /> Pro Member
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">{email}</p>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
              Hội viên EduSpace Trading & Quant Hub
            </p>
          </div>
        </div>

        {/* Right: Quick stats bar */}
        <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 pt-4 md:pt-0 md:pl-6">
          <div className="bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-zinc-400 mb-1">
              <BookmarkIcon className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium">Đã lưu</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {savedCount}
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-zinc-400 mb-1">
              <AcademicCapIcon className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium">Khóa học</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {coursesCount}
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-zinc-400 mb-1">
              <WrenchScrewdriverIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium">Dịch vụ</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {servicesCount}
            </span>
          </div>

          <div className="bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-zinc-400 mb-1">
              <CreditCardIcon className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium">Giao dịch</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {transactionsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
