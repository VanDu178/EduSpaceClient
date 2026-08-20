"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common";

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Minimalist Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Mascot Image */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500 pointer-events-none" />
              <Image
                src="/images/mascot .svg"
                alt="EduSpace Mascot"
                width={380}
                height={380}
                className="relative w-full max-w-xs sm:max-w-sm h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Heading, Subtitle & Primary CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
              Hệ Sinh Thái Tri Thức <br className="hidden sm:inline" />
              <span className="text-[#0EA5E9] font-extrabold block mt-1">Trading & Quantitative Trading</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Nơi kết nối cộng đồng Trader & Nhà giao dịch định lượng. Cung cấp bài viết kỹ thuật chuyên sâu, chia sẻ giải pháp nhằm nâng cấp và tự động hóa hệ thống giao dịch thực chiến.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full gap-2">
                  <span>Khám phá ngay</span>
                </Button>
              </Link>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <span>Tham gia Telegram</span>
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

