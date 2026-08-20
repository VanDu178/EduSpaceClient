import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full relative mt-auto transition-colors duration-300">
      {/* 1. Organic Ocean Wave SVG Transition */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          className="relative block w-full h-12 sm:h-20 lg:h-24 text-[#ddf3fe]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M0,0 C150,90 350,-30 500,50 C650,120 900,10 1200,50 L1200,120 L0,120 Z"
            className="fill-sky-100/70"
          />
          <path
            d="M0,25 C200,95 450,15 700,75 C950,135 1100,35 1200,65 L1200,120 L0,120 Z"
            className="fill-[#ddf3fe]"
          />
        </svg>
      </div>

      {/* 2. Main Footer Body with #ddf3fe background */}
      <div className="w-full bg-[#ddf3fe] text-slate-700 pt-4 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 4-Column Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-sky-200/80">
            {/* Column 1: DỊCH VỤ */}
            <div className="space-y-3">
              <h4 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wider uppercase">
                Dịch Vụ
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Phân tích kỹ thuật
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Giao dịch Forex & Crypto
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Quantitative Bot & Signal
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Phân tích On-Chain
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: KHO TÀI LIỆU */}
            <div className="space-y-3">
              <h4 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wider uppercase">
                Kho Tài Liệu
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Blog kiến thức
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Giao dịch trading
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Chiến lược chuyên sâu
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Ebook & Thuật toán
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: VỀ CHÚNG TÔI */}
            <div className="space-y-3">
              <h4 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wider uppercase">
                Về Chúng Tôi
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Giới thiệu EduSpace
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Tầm nhìn & Sứ mệnh
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Điều khoản dịch vụ
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Học liệu miễn phí
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: LIÊN HỆ */}
            <div className="space-y-3">
              <h4 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wider uppercase">
                Liên Hệ
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Tuyển dụng & Hợp tác
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Trading học viên
                  </Link>
                </li>
                <li>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                    Kênh Telegram
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@eduspace.vn" className="hover:text-slate-900 transition-colors">
                    Contact liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Contact & Social */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              © {new Date().getFullYear()} EDUSPACE VIETNAM. Tất cả quyền lợi được bảo lưu.
            </div>

            <div className="flex items-center gap-4">
              <span>Contact info: +84 930 455 789</span>

              {/* Social Circles */}
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-[11px] hover:opacity-90 transition-opacity"
                  title="Facebook"
                >
                  f
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-[11px] hover:opacity-90 transition-opacity"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-[11px] hover:opacity-90 transition-opacity"
                  title="Telegram"
                >
                  ✈
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
