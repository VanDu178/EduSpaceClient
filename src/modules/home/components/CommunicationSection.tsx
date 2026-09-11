"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/common";
import {
  AcademicCapIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { TELEGRAM_MESSAGES } from "../constants";

export function CommunicationSection() {
  const [displayedMessages, setDisplayedMessages] = useState(() =>
    TELEGRAM_MESSAGES.slice(0, 3).map((msg, idx) => ({ ...msg, uniqueId: `init-${idx}` }))
  );
  const [msgIndex, setMsgIndex] = useState(3);
  const [typedText, setTypedText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [activeAuthor, setActiveAuthor] = useState("");

  // Realtime animated counter stats
  const [onlineCount, setOnlineCount] = useState(95);
  const [memberCount, setMemberCount] = useState(1482);

  // Dynamic counter fluctuation effect
  useEffect(() => {
    const counterTimer = setInterval(() => {
      setOnlineCount(Math.floor(Math.random() * 8) + 93); // 93-100 online
      if (Math.random() > 0.6) {
        setMemberCount((prev) => prev + 1);
      }
    }, 4000);
    return () => clearInterval(counterTimer);
  }, []);

  // Character-by-character simulated typing and message sending loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const targetMsg = TELEGRAM_MESSAGES[msgIndex % TELEGRAM_MESSAGES.length];
    const fullText = targetMsg.text;

    let charIdx = 0;
    setTypedText("");
    setActiveAuthor(targetMsg.author);

    const typeNextChar = () => {
      if (charIdx < fullText.length) {
        charIdx++;
        setTypedText(fullText.slice(0, charIdx));
        const delay = Math.floor(Math.random() * 30) + 35;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        timeoutId = setTimeout(() => {
          setIsSending(true);
          timeoutId = setTimeout(() => {
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            const newMsg = {
              ...targetMsg,
              time: timeStr,
              uniqueId: `${targetMsg.id}-${Date.now()}`,
            };

            setDisplayedMessages((prev) => [...prev.slice(-2), newMsg]);
            setTypedText("");
            setActiveAuthor("");
            setIsSending(false);
            setMsgIndex((prev) => prev + 1);
          }, 300);
        }, 600);
      }
    };

    timeoutId = setTimeout(typeNextChar, 1200);

    return () => clearTimeout(timeoutId);
  }, [msgIndex]);

  return (
    <section id="knowledge" className="w-full bg-primary-light py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text & Content */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-[1.2]">
              Nâng Cấp Kiến Thức Và Tư Duy Giao Dịch Hệ Thống
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Trang bị kiến thức chuyên sâu và tư duy giao dịch hệ thống bài bản, giúp bạn tiếp cận thị trường một cách kỷ luật, nhất quán và hiệu quả hơn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 text-left pt-1">
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>100+ Bài viết, tài liệu, video được chia sẻ miễn phí</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Cùng nhau thảo luận, trao đổi kiến thức kinh nghiệm về thị trường</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Các khóa học chuyên sâu được chia sẻ trực tiếp bởi người có kinh nghiệm thực tế</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <Link href="/login">
                <Button variant="primary" size="md" leftIcon={<AcademicCapIcon className="w-4 h-4" />}>
                  Khóa học chuyên sâu
                </Button>
              </Link>
              <Link href="/blogs">
                <Button variant="outline" size="md" leftIcon={<DocumentTextIcon className="w-4 h-4" />}>
                  Kho bài viết
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="md" leftIcon={<ChatBubbleLeftRightIcon className="w-4 h-4" />}>
                  Kênh chat
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Illustration Box (Interactive Simulated Telegram Chat Window) */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden group">
              {/* Telegram App Header with Realtime Animated Counter */}
              <div className="bg-[#0088cc] text-white p-3.5 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-white shrink-0">
                    <PaperAirplaneIcon className="w-5 h-5 -rotate-45 -translate-y-0.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm flex items-center gap-1.5 leading-tight text-white">
                      <span>TradeVerse Community Chat</span>
                      <span className="w-4 h-4 rounded-full bg-white/25 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                    </h4>
                    <p className="text-[11px] text-sky-100 flex items-center gap-2 mt-0.5">
                      <span>{memberCount.toLocaleString()} thành viên</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-200 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="transition-all duration-300">{onlineCount} online</span>
                      </span>
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-semibold transition-all hover:scale-105"
                >
                  Tham gia
                </a>
              </div>

              {/* Typing indicator alert sub-header */}
              {activeAuthor && (
                <div className="bg-sky-50 px-4 py-1 border-b border-sky-100 text-[11px] text-sky-700 flex items-center gap-2 animate-fadeIn">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                  <span>
                    <strong className="font-semibold text-zinc-900">{activeAuthor}</strong> đang soạn tin nhắn...
                  </span>
                </div>
              )}

              {/* Telegram Messages Body with Staggered Slide-in Animation */}
              <div className="bg-[#f4f6f8] p-4 min-h-[250px] max-h-[270px] overflow-hidden relative border-y border-zinc-200/80">
                {/* Fade overlays top & bottom */}
                <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-b from-[#f4f6f8] to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-[#f4f6f8] to-transparent pointer-events-none z-10" />

                <div className="space-y-3 flex flex-col justify-end min-h-[220px]">
                  {displayedMessages.map((msg) => (
                    <div
                      key={msg.uniqueId}
                      className="flex items-start gap-2.5 animate-slide-up-fade transition-all duration-300 transform"
                    >
                      <div className={`w-7 h-7 rounded-full ${msg.bg} text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5`}>
                        {msg.avatar}
                      </div>
                      <div className="flex-1 max-w-[88%] bg-white border border-zinc-200 rounded-2xl rounded-tl-sm p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sky-600 flex items-center gap-1.5 text-[11px]">
                            {msg.author}
                            {msg.role === "MOD" && (
                              <span className="px-1.5 py-0.2 rounded bg-sky-100 text-sky-700 text-[9px] font-mono border border-sky-200/80">
                                ADMIN
                              </span>
                            )}
                            {msg.role === "VIP" && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-mono border border-amber-200/80">
                                VIP
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                            <span>{msg.time}</span>
                            <span className="text-sky-500 font-bold">✓✓</span>
                          </span>
                        </div>
                        <p className="text-zinc-800 leading-relaxed font-sans">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telegram Input Bar with Character-by-Character Typing Cursor */}
              <div className="bg-white p-3 border-t border-zinc-200 flex items-center gap-3">
                <div className="flex-1 bg-zinc-100 border border-zinc-200/80 rounded-full px-4 py-2 text-xs text-zinc-800 flex items-center justify-between min-h-[36px]">
                  {typedText ? (
                    <span className="flex items-center text-zinc-900">
                      <span>{typedText}</span>
                      <span className="inline-block w-1.5 h-3.5 bg-sky-500 animate-blink ml-0.5 align-middle rounded-sm" />
                    </span>
                  ) : (
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span>Nhập tin nhắn thảo luận...</span>
                      <span className="inline-block w-1.5 h-3.5 bg-zinc-400 animate-blink ml-0.5 align-middle rounded-sm" />
                    </span>
                  )}
                  <span className="text-zinc-400 text-xs shrink-0">💬</span>
                </div>
                <button
                  type="button"
                  aria-label="Send message"
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isSending
                    ? "bg-sky-500 text-white scale-110 ring-2 ring-sky-300/50"
                    : "bg-[#0088cc] hover:bg-sky-600 text-white hover:scale-105"
                    }`}
                >
                  <PaperAirplaneIcon className="w-4 h-4 -rotate-45 -translate-y-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
