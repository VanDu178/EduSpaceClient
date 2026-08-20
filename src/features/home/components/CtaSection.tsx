"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/common";

export function CtaSection() {
  return (
    <section id="cta" className="w-full bg-white pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main CTA Content */}
          <div className="relative p-6 sm:p-10 text-center z-10">
            {/* Center Content */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
                Chinh Phục Thị Trường Trading <br className="hidden sm:inline" />
                <span className="text-[#0EA5E9] font-extrabold block mt-1"> Cùng Chúng Tôi</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
                Cùng thảo luận kiến thức, kinh nghiệm & các khóa học chuyên sâu về trading
              </p>

              {/* 3 Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-6 font-bold border-[#06B6D4] text-[#06B6D4] hover:bg-cyan-50 rounded-full uppercase text-xs sm:text-sm"
                  >
                    Xem Khóa Học
                  </Button>
                </Link>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto px-8 font-bold bg-[#06B6D4] hover:bg-[#0891b2] text-white border-transparent rounded-full uppercase text-xs sm:text-sm"
                  >
                    Tham Gia Cộng Đồng
                  </Button>
                </a>

                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-6 font-bold border-[#06B6D4] text-[#06B6D4] hover:bg-cyan-50 rounded-full uppercase text-xs sm:text-sm"
                  >
                    Bài Viết Chia Sẻ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

