
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/modules/auth';
import { useTicketsQuery, useTicketRealtime } from '@/modules/ticketSupport';
import { NAVIGATION_GROUPS } from '../constants';

interface ConsoleSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export function ConsoleSidebar({ activeTab, onSelectTab }: ConsoleSidebarProps) {
  const { logout } = useAuthStore();
  const router = useRouter();

  // Kích hoạt lắng nghe Socket realtime cho Ticket ở cấp Sidebar để cập nhật badge tức thì
  useTicketRealtime();

  // Query tickets để đếm số lượng ticket cần user phản hồi hoặc có phản hồi mới từ Admin
  const { data: ticketsRes } = useTicketsQuery(undefined, true);
  const allTickets = ticketsRes?.pages?.flatMap((p: any) => p.data || []) || [];
  const unreadOrPendingCount = allTickets.filter(
    (t: any) => (t.creatorUnreadCount && t.creatorUnreadCount > 0) || t.status === 'PENDING_USER'
  ).length;

  const handleItemClick = (item: { key: string; label: string; icon: any; href?: string }) => {
    if (item.href) {
      router.push(item.href);
    } else {
      onSelectTab(item.key);
    }
  };

  return (
    <aside className="w-full md:w-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Navigation Items */}
        <nav className="space-y-5">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.groupTitle} className="space-y-1.5">
              <h3 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {group.groupTitle}
              </h3>
              <div className="space-y-1">
                {group.items.map((item: any) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  const showBadge = item.key === 'support' && unreadOrPendingCount > 0;

                  return (
                    <button
                      key={item.key}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-sky-600 text-white font-semibold'
                          : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-5 h-5 shrink-0 ${
                            isActive ? 'text-white' : 'text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {/* Unread admin response or pending user ticket badge */}
                      {showBadge && (
                        <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                          {unreadOrPendingCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Action Footer */}
      <div className="pt-4 border-t border-slate-200 mt-6">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-rose-500 shrink-0" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

