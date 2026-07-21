import React from "react";
import Link from "next/link";
import {
  UserGroupIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { CourseItem } from "../types";

export interface CourseCardProps {
  course: CourseItem;
  className?: string;
}

export function CourseCard({ course, className = "" }: CourseCardProps) {
  return (
    <div
      className={`glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all duration-300 ${className}`}
    >
      <div>
        {/* Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-zinc-900">
          <img
            src={course.banner}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold ${
                course.difficulty === "Cơ bản"
                  ? "bg-emerald-600 dark:bg-emerald-500/90 text-white"
                  : "bg-purple-600/90 text-white"
              }`}
            >
              {course.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <UserGroupIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {course.students.toLocaleString("vi-VN")} học viên
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
              <StarIcon className="w-4 h-4 fill-amber-400" />
              {course.rating}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
              {course.hours}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {course.title}
          </h3>

          {/* 3 Bullet points Roadmap */}
          <div className="space-y-2 py-2 border-t border-slate-200 dark:border-white/5">
            <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Lộ trình học nổi bật:
            </div>
            {course.roadmap.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                <CheckCircleIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Pricing & Enroll CTA */}
      <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-200 dark:border-white/10 mt-4">
        <div>
          <div className="text-xs text-slate-400 dark:text-zinc-500 line-through">
            {course.originalPrice.toLocaleString("vi-VN")}₫
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {course.discountedPrice.toLocaleString("vi-VN")}₫
          </div>
        </div>

        <Link href={`/courses`}>
          <Button
            variant="primary"
            size="md"
            className="font-semibold text-sm"
          >
            Đăng ký học
          </Button>
        </Link>
      </div>
    </div>
  );
}
