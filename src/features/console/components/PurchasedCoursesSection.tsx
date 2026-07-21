"use client";

import Link from "next/link";
import { Button, Progress } from "antd";
import {
  AcademicCapIcon,
  PlayCircleIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { PurchasedCourse } from "../types";

interface PurchasedCoursesSectionProps {
  courses: PurchasedCourse[];
}

export function PurchasedCoursesSection({ courses }: PurchasedCoursesSectionProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AcademicCapIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Khóa học đã mua ({courses.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Theo dõi tiến độ học tập và tiếp tục các bài học bài bản về Trading & Quantitative Finance.
          </p>
        </div>
        <Link href="/courses">
          <Button
            type="default"
            icon={<ArrowRightIcon className="w-4 h-4" />}
            className="!rounded-lg text-xs font-semibold h-9 flex items-center border border-slate-200 dark:border-white/10"
          >
            Khám phá thêm khóa học
          </Button>
        </Link>
      </div>

      {/* Courses List */}
      {courses.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
          <AcademicCapIcon className="w-10 h-10 mx-auto text-slate-300 dark:text-zinc-600 mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Bạn chưa đăng ký khóa học nào
          </p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
            Đăng ký các khóa học thực chiến để nâng cao kiến thức tài chính & thuật toán.
          </p>
          <Link href="/courses" className="inline-block mt-4">
            <Button type="primary" className="!rounded-lg h-9 text-xs font-semibold border-none">
              Xem danh mục khóa học
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Course Header Banner */}
                <div className="relative h-40 bg-slate-800 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md">
                    {course.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-blue-300 font-medium">Giảng viên: {course.instructor}</p>
                    <h3 className="text-base font-bold line-clamp-1">{course.title}</h3>
                  </div>
                </div>

                {/* Course Details & Progress */}
                <div className="p-5">
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1.5">
                      <span>Tiến độ học tập</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        {course.completedLessons}/{course.totalLessons} bài ({course.progress}%)
                      </span>
                    </div>
                    <Progress
                      percent={course.progress}
                      showInfo={false}
                      strokeColor={{ "0%": "#3b82f6", "100%": "#2563eb" }}
                      trailColor="rgba(148, 163, 184, 0.2)"
                    />
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-3 rounded-lg text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <BookOpenIcon className="w-4 h-4 text-blue-500" />
                        Bài học tiếp theo:
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 dark:text-zinc-500">
                        <ClockIcon className="w-3.5 h-3.5" />
                        {course.lastAccessed}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white line-clamp-1 pl-5">
                      {course.nextLessonTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400 dark:text-zinc-500">
                  Đã mua: {course.purchasedDate}
                </span>
                <Link href={`/courses/${course.slug}`}>
                  <Button
                    type="primary"
                    icon={<PlayCircleIcon className="w-4 h-4" />}
                    className="!rounded-lg text-xs font-semibold h-9 flex items-center gap-1.5 border-none"
                  >
                    Tiếp tục học
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
