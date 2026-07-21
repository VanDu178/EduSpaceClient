import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-[#0d0d0f] border-t border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 pt-12 px-4 sm:px-6 lg:px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pb-10 border-b border-slate-200 dark:border-white/10">
        {/* Column 1: Branding & Mission */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              Edu<span className="gradient-text">Space</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 max-w-sm">
            Nền tảng chia sẻ tri thức, bài viết phân tích, video bài giảng và khóa học chuyên sâu về Trading, Quantitative Finance & Algorithmic Trading dành cho cộng đồng nhà đầu tư và nhà phát triển Việt Nam.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-slate-900 dark:text-white font-semibold text-base mb-1.5">Chuyên mục chính</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/posts" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Bài viết Trading & Quant
              </Link>
            </li>
            <li>
              <Link href="/#videos" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Video bài giảng & Phân tích
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Khóa học Trade
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Dịch vụ tư vấn và hỗ trợ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Risk Disclaimer */}
        <div className="flex flex-col gap-3">
          <h4 className="text-slate-900 dark:text-white font-semibold text-base mb-1.5">Cảnh báo rủi ro</h4>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
            Tất cả nội dung bài viết, video và khóa học tại EduSpace được cung cấp chỉ nhằm mục đích giáo dục, nghiên cứu và chia sẻ thông tin. EduSpace không đưa ra bất kỳ lời khuyên đầu tư tài chính nào.
          </p>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
            Giao dịch tài chính & Quantitative Trading luôn ẩn chứa rủi ro thua lỗ vốn. Hãy tìm hiểu kĩ và chịu trách nhiệm 100% cho mọi quyết định giao dịch của bạn.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Social & Copyright */}
      <div className="max-w-7xl mx-auto py-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500 dark:text-zinc-500">
        <div>
          © {new Date().getFullYear()} EduSpace. Tất cả các quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

