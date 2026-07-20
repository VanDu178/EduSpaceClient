export const siteConfig = {
  name: "EduSpace",
  description: "Nền tảng quản lý và kết nối giáo dục toàn diện",
  url: "http://localhost:3000", // Sau này có thể dùng biến môi trường env
  ogImage: "https://eduspace.vn/og.jpg", // Hình ảnh xem trước khi share link
  links: {
    facebook: "https://facebook.com/eduspace",
  },
};

export type SiteConfig = typeof siteConfig;
