"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/common";
import {
  ArrowRightIcon,
  SparklesIcon,
  CpuChipIcon,
  BoltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Minimalist Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Quant AI Robot Mascot Showcase with Floating Feature Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full flex justify-center relative max-w-md"
          >
            <div className="relative group w-full flex justify-center items-center">
              {/* Subtle Ambient Glow Effect Behind Mascot */}
              <div className="absolute inset-4 bg-gradient-to-tr from-sky-400/20 via-sky-300/10 to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />

              {/* Main Mascot Image with Floating Motion */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Image
                  src="/images/mascot-quant-robot.png"
                  alt="TradeVerse Quant AI Robot Mascot"
                  width={400}
                  height={400}
                  className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain drop-shadow-none"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Heading, Mascot Badge, Subtitle & Primary CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
              Hệ Sinh Thái Tri Thức <br className="hidden sm:inline" />
              <span className="text-sky-500 font-extrabold block mt-1">Trading &amp; Quantitative Trading</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          >
            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Nơi kết nối cộng đồng Trader &amp; Nhà giao dịch định lượng. Cung cấp bài viết kỹ thuật chuyên sâu, chia sẻ giải pháp nhằm nâng cấp và tự động hóa hệ thống giao dịch thực chiến.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          >
            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full gap-2 border-none">
                  <span>Khám phá ngay</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full gap-2 border-zinc-200 hover:border-sky-300 hover:text-sky-600">
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




