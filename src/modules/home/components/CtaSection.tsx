"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common";

export function CtaSection() {
  return (
    <section id="cta" className="w-full bg-white pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-zinc-200/60">
      <div className="max-w-6xl mx-auto relative">
        {/* Left Side Mascot Visual Cluster (Quant AI Robot) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 lg:left-2 xl:left-6 pointer-events-none opacity-90 max-w-[120px] xl:max-w-[150px] z-10 hidden lg:block"
        >
          <div className="relative group">
            <Image
              src="/images/mascot-quant-robot.png"
              alt="TradeVerse Quant AI Robot Mascot"
              width={150}
              height={150}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Right Side Mascot Visual Cluster (TradeVerse Logo Mascot) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 right-0 lg:right-2 xl:right-6 pointer-events-none opacity-90 max-w-[120px] xl:max-w-[150px] z-10 hidden lg:block"
        >
          <div className="relative group">
            <Image
              src="/images/logo.png"
              alt="TradeVerse Logo Mascot"
              width={150}
              height={150}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Main CTA Content (100% Restored Original Content) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative p-6 sm:p-10 text-center z-20">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
                Chinh Phục Thị Trường Trading <br className="hidden sm:inline" />
                <span className="text-[#0EA5E9] font-extrabold block mt-1"> Cùng Chúng Tôi</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
                Cùng thảo luận kiến thức, kinh nghiệm &amp; các khóa học chuyên sâu về trading
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






