'use client';

import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ChevronRightIcon,
  ClockIcon,
  TagIcon,
  XMarkIcon,
  InboxIcon
} from '@heroicons/react/24/outline';
import { Ticket } from '../services/ticketSupportService';
import { getStatusConfig, getCategoryLabel } from '../utils';
import { STATUS_OPTIONS, CATEGORY_OPTIONS } from '../constants';
import { useDebounce } from '@/core/hooks';
import { Select } from 'antd';

export interface TicketFilters {
  search?: string;
  status?: string;
  category?: string;
}

interface SupportTicketListProps {
  tickets: Ticket[];
  isLoading: boolean;
  onOpenCreateModal: () => void;
  onSelectTicket?: (ticketId: number) => void;
  filters?: TicketFilters;
  onFilterChange?: (newFilters: TicketFilters) => void;
  totalCount?: number;
}

export function SupportTicketList({
  tickets,
  isLoading,
  onOpenCreateModal,
  onSelectTicket,
  filters,
  onFilterChange,
  totalCount,
}: SupportTicketListProps) {
  const [filterState, setFilterState] = useState({
    search: filters?.search || '',
    status: filters?.status || 'ALL',
    category: filters?.category || 'ALL',
  });

  const debouncedSearch = useDebounce(filterState.search, 350);

  // Truyền params bộ lọc lên component cha khi state thay đổi
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        search: debouncedSearch.trim() || undefined,
        status: filterState.status === 'ALL' ? undefined : filterState.status,
        category: filterState.category === 'ALL' ? undefined : filterState.category,
      });
    }
  }, [debouncedSearch, filterState.status, filterState.category, onFilterChange]);

  const hasActiveFilters = Boolean(
    filterState.search.trim() ||
    (filterState.status && filterState.status !== 'ALL') ||
    (filterState.category && filterState.category !== 'ALL')
  );

  const handleFilterChange = (key: keyof typeof filterState, value: string) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };


  return (
    <div className="space-y-5">
      {/* Title Header & Create Action (Clean Flat Header, no outer box) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Danh sách yêu cầu hỗ trợ của bạn
            </h2>
          </div>
        </div>

        <button
          onClick={onOpenCreateModal}
          disabled={isLoading}
          className="inline-flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition cursor-pointer border border-sky-500 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Yêu cầu mới</span>
        </button>
      </div>

      {/* Dynamic Filters Bar - Direct flat flex row without box wrapper */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-4 border-b border-slate-200/50">
        {/* Left: Filter Icon & Select Controls & Reset Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1.5 text-slate-500 font-medium text-xs sm:text-sm mr-1">
            <FunnelIcon className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="hidden sm:inline">Lọc:</span>
          </div>

          {/* Status Filter */}
          <Select
            value={filterState.status}
            onChange={(value) => handleFilterChange('status', value)}
            options={STATUS_OPTIONS}
            disabled={isLoading}
            className="w-44 text-xs sm:text-sm font-medium"
          />

          {/* Category Filter */}
          <Select
            value={filterState.category}
            onChange={(value) => handleFilterChange('category', value)}
            options={CATEGORY_OPTIONS}
            disabled={isLoading}
            className="w-48 text-xs sm:text-sm font-medium"
          />
        </div>

        {/* Right: Search Input (at the end) */}
        <div className="relative flex-1 max-w-md min-w-[240px]">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã ticket, tiêu đề hoặc nội dung..."
            value={filterState.search}
            disabled={isLoading}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none transition disabled:opacity-50 disabled:bg-slate-50"
          />
          {filterState.search && (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Xóa tìm kiếm"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Ticket List View / Empty State Container */}
      <div className="overflow-hidden bg-white">
        {isLoading ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-600">Đang cập nhật danh sách Yêu cầu hỗ trợ...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-16 px-6 text-center max-w-md mx-auto">
            {hasActiveFilters ? (
              /* State 1: Filter Results Empty */
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Không tìm thấy Ticket nào</h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Không có yêu cầu hỗ trợ nào phù hợp với các tiêu chí tìm kiếm hoặc bộ lọc được chọn.
                </p>
              </div>
            ) : (
              /* State 2: Completely Empty Tickets */
              <div>
                <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4">
                  <InboxIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Chưa có yêu cầu hỗ trợ nào</h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Bạn hiện chưa gửi yêu cầu hỗ trợ nào. Khi gặp sự cố kỹ thuật hoặc thắc mắc về tài khoản/thanh toán, hãy tạo ticket để Chuyên viên CSKH TradeVerse hỗ trợ bạn ngay.
                </p>
                <div className="mt-6">
                  <button
                    onClick={onOpenCreateModal}
                    className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-sky-500 transition cursor-pointer"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Tạo yêu cầu đầu tiên</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tickets.map((t) => {
              const statusConfig = getStatusConfig(t.status);
              return (
                <div
                  key={t.id}
                  onClick={() => onSelectTicket?.(t.id)}
                  className="block p-4 sm:p-5 hover:bg-slate-50/80 transition group cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition truncate">
                        {t.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 mt-1">
                        {t.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-slate-500">
                        {/* Soft Status Indicator Pill */}
                        <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.bgClass} ${statusConfig.textClass}`}>
                          <span className={`w-2 h-2 rounded-full ${statusConfig.dotClass}`} />
                          <span>{statusConfig.label}</span>
                        </span>

                        <span className="flex items-center space-x-1">
                          <TagIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{getCategoryLabel(t.category)}</span>
                        </span>

                        <span className="flex items-center space-x-1">
                          <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Tạo ngày: {new Date(t.createdAt).toLocaleDateString('vi-VN')}</span>
                        </span>

                        {t.comments && t.comments.length > 0 && (
                          <span className="text-slate-500 font-medium">
                            • {t.comments.length} phản hồi
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Icon CTA */}
                    <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                      <span className="text-xs font-semibold text-sky-600 group-hover:underline hidden sm:inline">
                        Chi tiết
                      </span>
                      <div className="p-2 text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 rounded-xl transition">
                        <ChevronRightIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportTicketList;
