'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  useTicketsQuery,
  useTicketDetailQuery,
  useCreateTicketMutation,
  useAddTicketCommentMutation,
  useTicketRealtime,
  FormCreate,
  SupportTicketList,
  SupportTicketDetail,
  Ticket,
  TicketFilters
} from '@/features/ticketSupport';

export function SupportView() {
  const [filters, setFilters] = useState<TicketFilters>({});
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  // Realtime Socket listener cho Ticket list & detail
  useTicketRealtime(selectedTicketId || undefined);
  const { data: ticketsRes, isLoading: isLoadingTickets, refetch: refetchTickets } = useTicketsQuery(filters);
  const { isPending: isSubmittingTicket, mutateAsync: createTicketMutation } = useCreateTicketMutation();
  const { isPending: isSubmittingComment, mutateAsync: addTicketCommentMutation } = useAddTicketCommentMutation();

  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states for Create Ticket
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState<Ticket['category']>('TECHNICAL');
  const [newTicketAttachments, setNewTicketAttachments] = useState<string[]>([]);

  // Form states for Ticket Comment
  const [commentText, setCommentText] = useState('');
  const [commentAttachments, setCommentAttachments] = useState<string[]>([]);

  // Fetch detail if ticket is selected
  const { data: ticketDetailRes, isLoading: isLoadingDetail, refetch: refetchDetail } = useTicketDetailQuery(
    selectedTicketId || undefined,
    Boolean(selectedTicketId)
  );

  const tickets: Ticket[] = ticketsRes?.data || [];
  const selectedTicket: Ticket | null = ticketDetailRes?.data || null;

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim() || !newTicketDesc.trim()) {
      toast.error('Vui lòng nhập đầy đủ tiêu đề và nội dung mô tả');
      return;
    }

    try {
      await createTicketMutation({
        title: newTicketTitle,
        description: newTicketDesc,
        category: newTicketCategory,
        attachments: newTicketAttachments.length > 0 ? newTicketAttachments : undefined,
      });

      toast.success('Tạo Yêu cầu hỗ trợ (Ticket) thành công!');
      setShowCreateModal(false);
      setNewTicketTitle('');
      setNewTicketDesc('');
      setNewTicketCategory('TECHNICAL');
      setNewTicketAttachments([]);
      refetchTickets();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Không thể tạo Ticket');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() && commentAttachments.length === 0) return;
    if (isSubmittingComment || !selectedTicketId) return;

    try {
      await addTicketCommentMutation({
        id: selectedTicketId,
        data: {
          content: commentText.trim(),
          attachments: commentAttachments.length > 0 ? commentAttachments : undefined,
        },
      });

      toast.success('Đã gửi phản hồi thành công!');
      setCommentText('');
      setCommentAttachments([]);
      refetchDetail();
      refetchTickets();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Lỗi gửi phản hồi');
    }
  };

  const handleRemoveCreateAttachment = (index: number) => {
    setNewTicketAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveCommentAttachment = (index: number) => {
    setCommentAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-6">
      {/* If looking at ticket detail inside console */}
      {selectedTicketId ? (
        isLoadingDetail ? (
          <div className="py-16 text-center text-slate-500">
            <div className="inline-block w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium">Đang tải chi tiết Ticket...</p>
          </div>
        ) : selectedTicket ? (
          <div>
            <SupportTicketDetail
              ticket={selectedTicket}
              commentText={commentText}
              setCommentText={setCommentText}
              commentAttachments={commentAttachments}
              setCommentAttachments={setCommentAttachments}
              onRemoveCommentAttachment={handleRemoveCommentAttachment}
              onAddComment={handleAddComment}
              isSubmittingComment={isSubmittingComment}
              onBack={() => setSelectedTicketId(null)}
            />
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm">Không tìm thấy thông tin Ticket này.</p>
            <button
              onClick={() => setSelectedTicketId(null)}
              className="mt-3 text-xs text-sky-600 underline font-medium cursor-pointer"
            >
              Quay lại danh sách
            </button>
          </div>
        )
      ) : (
        /* If looking at ticket list inside console */
        <div>
          <SupportTicketList
            tickets={tickets}
            isLoading={isLoadingTickets}
            onOpenCreateModal={() => setShowCreateModal(true)}
            onSelectTicket={(id) => setSelectedTicketId(id)}
            filters={filters}
            onFilterChange={setFilters}
            totalCount={ticketsRes?.pagination?.total ?? tickets.length}
          />

          {/* Create Modal Form */}
          {showCreateModal && (
            <FormCreate
              onClose={() => setShowCreateModal(false)}
              onSubmit={handleCreateTicket}
              newTicketTitle={newTicketTitle}
              setNewTicketTitle={setNewTicketTitle}
              newTicketCategory={newTicketCategory}
              setNewTicketCategory={setNewTicketCategory}
              newTicketDesc={newTicketDesc}
              setNewTicketDesc={setNewTicketDesc}
              newTicketAttachments={newTicketAttachments}
              setNewTicketAttachments={setNewTicketAttachments}
              onRemoveAttachment={handleRemoveCreateAttachment}
              isSubmittingTicket={isSubmittingTicket}
            />
          )}
        </div>
      )}
    </div>
  );
}



