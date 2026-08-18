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
      <div className="relative flex items-center w-full rounded-2xl border border-slate-200 bg-white transition-colors focus-within:border-blue-500">
        <div className="pl-4 text-slate-400 pointer-events-none flex items-center justify-center">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 pl-3 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label="Xóa từ khóa tìm kiếm"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
