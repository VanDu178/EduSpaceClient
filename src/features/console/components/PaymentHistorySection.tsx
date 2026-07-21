"use client";

import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { PaymentTransaction } from "../types";

interface PaymentHistorySectionProps {
  transactions: PaymentTransaction[];
}

export function PaymentHistorySection({ transactions }: PaymentHistorySectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const columns: ColumnsType<PaymentTransaction> = [
    {
      title: "Mã giao dịch",
      dataIndex: "transactionCode",
      key: "transactionCode",
      render: (code: string) => (
        <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-1 rounded border border-blue-200 dark:border-blue-500/30">
          {code}
        </span>
      ),
    },
    {
      title: "Nội dung thanh toán",
      dataIndex: "itemName",
      key: "itemName",
      render: (text: string, record: PaymentTransaction) => (
        <div>
          <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">{text}</p>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500">Loại: {record.itemType}</span>
        </div>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: "Phương thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method: string) => (
        <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
          {method}
        </span>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date: string) => (
        <span className="text-xs text-slate-500 dark:text-zinc-400">
          {date}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: PaymentTransaction["status"]) => {
        if (status === "success") {
          return (
            <Tag color="success" className="!inline-flex !items-center !gap-1 !text-xs !rounded-full !px-2.5 !py-0.5">
              <CheckCircleIcon className="w-3.5 h-3.5" /> Thành công
            </Tag>
          );
        }
        if (status === "pending") {
          return (
            <Tag color="warning" className="!inline-flex !items-center !gap-1 !text-xs !rounded-full !px-2.5 !py-0.5">
              <ClockIcon className="w-3.5 h-3.5" /> Đang xử lý
            </Tag>
          );
        }
        return (
          <Tag color="error" className="!inline-flex !items-center !gap-1 !text-xs !rounded-full !px-2.5 !py-0.5">
            <ExclamationCircleIcon className="w-3.5 h-3.5" /> Thất bại
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCardIcon className="w-6 h-6 text-emerald-500" />
            Lịch sử thanh toán ({transactions.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Tra cứu tất cả hóa đơn thanh toán khóa học, dịch vụ tư vấn và đăng ký tài khoản.
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={transactions.map((t) => ({ ...t, key: t.id }))}
          pagination={{ pageSize: 5, hideOnSinglePage: true }}
          className="ant-custom-table"
        />
      </div>
    </div>
  );
}
