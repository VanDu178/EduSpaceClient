'use client';

import React from 'react';
import { Ticket } from '../services/ticketSupportService';

interface ViewListProps {
  tickets: Ticket[];
  isLoadingTickets: boolean;
  onSelectTicket: (ticketId: number) => void;
}

export function ViewList({
  tickets,
  isLoadingTickets,
  onSelectTicket,
}: ViewListProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
      {isLoadingTickets && (
        <div className="text-center py-6 text-slate-500 text-xs">Đang tải danh sách Ticket...</div>
      )}
      {!isLoadingTickets && tickets.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-xs">Bạn chưa có Ticket hỗ trợ nào.</div>
      )}
      {tickets.map((t) => (
        <div
          key={t.id}
          onClick={() => onSelectTicket(t.id)}
          className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 p-3 rounded-xl cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-sky-700 font-semibold">#{t.code}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                t.status === 'OPEN'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : t.status === 'IN_PROGRESS'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : t.status === 'PENDING_USER'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {t.status === 'PENDING_USER' ? 'Chờ bạn phản hồi' : t.status}
            </span>
          </div>
          <h5 className="text-xs font-semibold text-slate-900 truncate">{t.title}</h5>
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{t.description}</p>
        </div>
      ))}
    </div>
  );
}
