"use client";

import Link from "next/link";
import { Button } from "antd";
import {
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { UsedService } from "../types";

interface UsedServicesSectionProps {
  services: UsedService[];
}

export function UsedServicesSection({ services }: UsedServicesSectionProps) {
  const getStatusBadge = (status: UsedService["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
            <ShieldCheckIcon className="w-3.5 h-3.5" /> Đang hoạt động
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
            <CheckCircleIcon className="w-3.5 h-3.5" /> Hoàn thành
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
            <ClockIcon className="w-3.5 h-3.5" /> Chờ xử lý
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <WrenchScrewdriverIcon className="w-6 h-6 text-amber-500" />
            Dịch vụ đã sử dụng ({services.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Quản lý các dịch vụ tư vấn 1-1, kiểm thử thuật toán và các gói cố vấn chuyên sâu đã đăng ký.
          </p>
        </div>
        <Link href="/services">
          <Button
            type="default"
            icon={<ArrowRightIcon className="w-4 h-4" />}
            className="!rounded-lg text-xs font-semibold h-9 flex items-center border border-slate-200 dark:border-white/10"
          >
            Đăng ký dịch vụ mới
          </Button>
        </Link>
      </div>

      {/* Services List */}
      {services.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
          <WrenchScrewdriverIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-zinc-600 mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Bạn chưa đăng ký sử dụng dịch vụ nào
          </p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
            Khám phá dịch vụ tư vấn chiến lược Quant & Mentorship 1-1 từ các chuyên gia.
          </p>
          <Link href="/services" className="inline-block mt-4">
            <Button type="primary" className="!rounded-lg h-9 text-xs font-semibold border-none">
              Xem danh sách dịch vụ
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.serviceName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                    Gói: {item.packageName}
                  </span>
                  {getStatusBadge(item.status)}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                  {item.notes}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <UserCircleIcon className="w-4 h-4 text-indigo-500" />
                    Chuyên gia đồng hành: <strong className="text-slate-700 dark:text-zinc-300 font-medium">{item.mentor}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4 text-slate-400" />
                    Thời hạn: {item.startDate} ~ {item.expiryDate}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-white/10 justify-end">
                <Button
                  type="default"
                  icon={<ChatBubbleLeftEllipsisIcon className="w-4 h-4" />}
                  className="!rounded-lg text-xs font-semibold h-9 flex items-center border border-slate-200 dark:border-white/10"
                >
                  {item.supportChannel}
                </Button>
                <Link href="/services">
                  <Button
                    type="primary"
                    className="!rounded-lg text-xs font-semibold h-9 border-none"
                  >
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
