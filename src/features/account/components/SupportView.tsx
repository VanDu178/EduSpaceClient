'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  useTicketsQuery,
  useTicketDetailQuery,
  useAddTicketCommentMutation,
  useTicketRealtime,
  FormCreate,
  ViewList,
  ViewDetail,
  Ticket,
  TicketQueryParams,
} from '@/features/ticketSupport';
import { useUploadMultipleMutation } from '@/features/upload';

export interface CommentFile {
  file: File;
  url: string;
}

export function SupportView() {
  const [params, setParams] = useState<TicketQueryParams>({});
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  // Realtime Socket listener cho Ticket list & detail
  useTicketRealtime(selectedTicketId || undefined);
  const {
    data: ticketsRes,
    isLoading: isLoadingTickets,
    refetch: refetchTickets,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useTicketsQuery(params);

  const rawTickets: Ticket[] = ticketsRes?.pages.flatMap((page) => page?.data || []) || [];
  const ticketsMap = new Map<number, Ticket>();
  rawTickets.forEach((t) => ticketsMap.set(t.id, t));
  const tickets = Array.from(ticketsMap.values());
  const totalCount = ticketsRes?.pages?.[0]?.pagination?.total ?? tickets.length;

  const { isPending: isSubmittingCommentMutation, mutateAsync: addTicketCommentMutation } = useAddTicketCommentMutation();
  const { mutateAsync: uploadImages, isPending: isUploadingImages } = useUploadMultipleMutation('support-tickets');

  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states for Ticket Comment
  const [commentText, setCommentText] = useState('');
  const [commentFiles, setCommentFiles] = useState<CommentFile[]>([]);

  // Fetch detail if ticket is selected
  const { data: ticketDetailRes, isLoading: isLoadingDetail, refetch: refetchDetail } = useTicketDetailQuery(
    selectedTicketId || undefined,
    Boolean(selectedTicketId)
  );

  const selectedTicket: Ticket | null = ticketDetailRes?.data || null;

  const isSubmittingComment = isSubmittingCommentMutation || isUploadingImages;

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() && commentFiles.length === 0) return;
    if (isSubmittingComment || !selectedTicketId) return;

    try {
      // 1. Upload ảnh đính kèm lên Supabase Storage trước
      let uploadedUrls: string[] = [];
      if (commentFiles.length > 0) {
        const rawFiles = commentFiles.map((item) => item.file);
        uploadedUrls = await uploadImages(rawFiles);
      }

      // 2. Gửi comment kèm danh sách Public URL ảnh từ Supabase Storage
      await addTicketCommentMutation({
        id: selectedTicketId,
        data: {
          content: commentText.trim(),
          attachments: uploadedUrls.length > 0 ? uploadedUrls : undefined,
        },
      });

      toast.success('Đã gửi phản hồi thành công!');
      setCommentText('');
      // Dọn dẹp URL tĩnh của trình duyệt
      commentFiles.forEach((item) => URL.revokeObjectURL(item.url));
      setCommentFiles([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Lỗi gửi phản hồi');
    }
  };

  const handleRemoveCommentFile = (index: number) => {
    setCommentFiles((prev) => {
      const target = prev[index];
      if (target?.url) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((_, i) => i !== index);
    });
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
            <ViewDetail
              ticket={selectedTicket}
              commentText={commentText}
              setCommentText={setCommentText}
              commentFiles={commentFiles}
              setCommentFiles={setCommentFiles}
              onRemoveCommentFile={handleRemoveCommentFile}
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
          <ViewList
            tickets={tickets}
            isLoading={isLoadingTickets}
            onOpenCreateModal={() => setShowCreateModal(true)}
            onSelectTicket={(id) => setSelectedTicketId(id)}
            params={params}
            onParamsChange={setParams}
            totalCount={totalCount}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onFetchNextPage={fetchNextPage}
          />

          {/* Create Modal Form */}
          {showCreateModal && (
            <FormCreate
              onClose={() => setShowCreateModal(false)}
              onSuccess={() => refetchTickets()}
            />
          )}
        </div>
      )}
    </div>
  );
}



