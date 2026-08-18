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
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: User info */}
        <div className="flex items-center gap-4">
          <Avatar
            size={72}
            icon={<UserIcon className="w-9 h-9 text-blue-600" />}
            className="bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
                {userName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                <CheckBadgeIcon className="w-3.5 h-3.5" /> Pro Member
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{email}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Hội viên EduSpace Trading & Quant Hub
            </p>
          </div>
        </div>

        {/* Right: Quick stats bar */}
        <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
              <BookmarkIcon className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium">Đã lưu</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {savedCount}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
              <AcademicCapIcon className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium">Khóa học</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {coursesCount}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
              <WrenchScrewdriverIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium">Dịch vụ</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {servicesCount}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 mb-1">
              <CreditCardIcon className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium">Giao dịch</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {transactionsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
