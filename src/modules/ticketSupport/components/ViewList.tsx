'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ChevronRightIcon,
  ClockIcon,
  TagIcon,
  XMarkIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { Ticket, TicketQueryParams } from '../types';
import { getStatusConfig, getCategoryLabel } from '../utils';
import { STATUS_OPTIONS, CATEGORY_OPTIONS, DEFAULT_TICKET_PARAMS } from '../constants';
import { useDebounce } from '@/core/hooks';
import { formatDate } from '@/core/utils';
import { Select } from 'antd';

export interface ViewListProps {
  tickets: Ticket[];
  isLoading: boolean;
  onOpenCreateModal: () => void;
  onSelectTicket?: (ticketId: number) => void;
  params?: TicketQueryParams;
  onParamsChange?: (newParams: TicketQueryParams) => void;
  totalCount?: number;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onFetchNextPage?: () => void;
}

export function ViewList({
  tickets,
  isLoading,
  onOpenCreateModal,
  onSelectTicket,
  params: externalParams,
  onParamsChange,
  totalCount,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
}: ViewListProps) {
  const [params, setParams] = useState<TicketQueryParams>({
    ...DEFAULT_TICKET_PARAMS,
    ...externalParams,
  });

  const debouncedSearch = useDebounce(params.search, 350);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage || !onFetchNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onFetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onFetchNextPage]);

  // Truyền params bộ lọc lên component cha khi state thay đổi
  useEffect(() => {
    if (onParamsChange) {
      onParamsChange({
        search: debouncedSearch?.trim() || undefined,
        status: params.status === DEFAULT_TICKET_PARAMS.status ? undefined : params.status,
        category: params.category === DEFAULT_TICKET_PARAMS.category ? undefined : params.category,
      });
    }
  }, [debouncedSearch, params.status, params.category, onParamsChange]);

  const hasActiveFilters = Boolean(
    params.search?.trim() ||
    (params.status && params.status !== DEFAULT_TICKET_PARAMS.status) ||
    (params.category && params.category !== DEFAULT_TICKET_PARAMS.category)
  );

  const handleParamChange = (key: keyof typeof params, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-5">
      {/* Title Header & Create Action */}
      <div className="flex items-center justify-between gap-3 pb-2">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Yêu cầu của bạn
        </h2>

        <button
          onClick={onOpenCreateModal}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Yêu cầu mới</span>
        </button>
      </div>

      {/* Dynamic Filters Bar */}
      <div className="space-y-2.5 pb-4 border-b border-slate-200/60">
        {/* 2-Column Select Filters (Row 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <Select
            value={params.status}
            onChange={(value) => handleParamChange('status', value)}
            options={STATUS_OPTIONS}
            disabled={isLoading}
            className="w-full text-xs sm:text-sm font-medium"
          />

          <Select
            value={params.category}
            onChange={(value) => handleParamChange('category', value)}
            options={CATEGORY_OPTIONS}
            disabled={isLoading}
            className="w-full text-xs sm:text-sm font-medium"
          />
        </div>

        {/* Search Input (Row 2) */}
        <div className="relative w-full">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
            value={params.search || ''}
            disabled={isLoading}
            onChange={(e) => handleParamChange('search', e.target.value)}
            className="w-full pl-9 pr-9 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none transition disabled:opacity-50"
          />
          {params.search && (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleParamChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer disabled:opacity-50"
              title="Xóa tìm kiếm"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Ticket List View / Empty State Container */}
      <div>
        {isLoading ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-600">Đang cập nhật danh sách yêu cầu hỗ trợ...</p>
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
                  Bạn hiện chưa gửi yêu cầu hỗ trợ nào. Khi gặp sự cố kỹ thuật hoặc thắc mắc về tài khoản/thanh toán, hãy tạo yêu cầu hỗ trợ để chuyên viên CSKH TradeVerse hỗ trợ bạn ngay.
                </p>
                <div className="mt-6">
                  <button
                    onClick={onOpenCreateModal}
                    className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Tạo yêu cầu đầu tiên</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => {
              const statusConfig = getStatusConfig(t.status);
              const unreadCount = t.creatorUnreadCount || 0;
              const hasUnread = unreadCount > 0;

              return (
                <div
                  key={t.id}
                  onClick={() => onSelectTicket?.(t.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all group cursor-pointer space-y-3 ${hasUnread
                    ? 'bg-sky-50/40 border-sky-300 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:border-sky-300 hover:bg-slate-50/50'
                    }`}
                >
                  {/* Card Header: Title & Chevron */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                      <h3 className={`text-sm sm:text-base font-semibold text-slate-900 group-hover:text-sky-600 transition truncate ${hasUnread ? 'font-bold text-sky-950' : ''}`}>
                        {t.title}
                      </h3>
                      {hasUnread && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 animate-pulse shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span>{unreadCount > 1 ? `${unreadCount} phản hồi mới` : 'Phản hồi mới'}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      <span className={`text-xs font-semibold hidden sm:inline ${hasUnread ? 'text-rose-600' : 'text-sky-600'}`}>
                        {hasUnread ? 'Xem phản hồi' : 'Chi tiết'}
                      </span>
                      <ChevronRightIcon className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>

                  {/* Card Footer Meta Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusConfig.bgClass} ${statusConfig.textClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass}`} />
                        <span>{statusConfig.label}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                        <TagIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{getCategoryLabel(t.category)}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>{formatDate(t.createdAt)}</span>
                      </span>

                      {t.comments && t.comments.length > 0 && (
                        <span className="font-medium text-slate-500">
                          • {t.comments.length} phản hồi
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sentinel element cho Infinite Scroll */}
        {hasNextPage && (
          <div ref={loadMoreRef} className="py-4 text-center border-t border-slate-100">
            {isFetchingNextPage ? (
              <div className="inline-flex items-center space-x-2 text-xs font-medium text-sky-600">
                <div className="w-3.5 h-3.5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                <span>Đang tải thêm yêu cầu...</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400">Cuộn xuống để xem thêm yêu cầu</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewList;
