"use client";

import React from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      <div className="relative flex items-center w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 transition-colors focus-within:border-blue-500 dark:focus-within:border-blue-500/80">
        <div className="pl-4 text-slate-400 dark:text-zinc-400 pointer-events-none flex items-center justify-center">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 pl-3 pr-10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-white transition-colors p-1"
            aria-label="Xóa từ khóa tìm kiếm"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
