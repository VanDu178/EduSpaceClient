export const siteConfig = {
  name: "TradeVerse",
  description: "Hệ sinh thái tri thức Trading & Quantitative Trading",
  url: "http://localhost:3000", // Sau này có thể dùng biến môi trường env
  ogImage: "https://tradeverse.vn/og.jpg", // Hình ảnh xem trước khi share link
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  links: {
    facebook: "https://facebook.com/tradeverse",
  },
};

export type SiteConfig = typeof siteConfig;
