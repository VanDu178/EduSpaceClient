import { BlogCategoryName, BlogPost } from './types';

export const BLOG_CATEGORIES: BlogCategoryName[] = [
  'Tất cả',
  'Tư duy',
  'Phương pháp',
  'Quant',
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Tư Duy Hệ Thống Trong Xây Dựng Thuật Toán & Giao Dịch Quan Sát',
    description:
      'Khám phá cách rèn luyện tư duy logic toán học, khả năng phân tích hệ thống và tư duy phản biện khi giải quyết các bài toán phức tạp.',
    category: 'Tư duy',
    tags: ['Tư duy', 'Logic'],
    coverColor: '#EFF6FF',
    illustrationType: 'tuduy',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    publishedAt: '18 Tháng 8, 2026',
    readTime: '6 phút đọc',
    slug: 'tu-duy-he-thong-xay-dung-thuat-toan',
  },
  {
    id: '2',
    title: 'Phương Pháp Quản Lý Mô Hình Code Xanh & Kiến Trúc Tối Ưu',
    description:
      'Quy trình từng bước giúp tổ chức code sạch sẽ, tối ưu hóa hiệu năng chương trình và xây dựng luồng làm việc chuẩn mực cho lập trình viên.',
    category: 'Phương pháp',
    tags: ['Phương pháp', 'Best Practices'],
    coverColor: '#FAF5FF',
    illustrationType: 'phuongphap',
    author: {
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
    publishedAt: '15 Tháng 8, 2026',
    readTime: '8 phút đọc',
    slug: 'phuong-phap-quan-ly-mo-hinh-code',
  },
  {
    id: '3',
    title: 'Tổng Quan Về Quant Trading: Từ Mô Hình Toán Đến Thuật Toán Giao Dịch',
    description:
      'Tìm hiểu nền tảng giao dịch định lượng (Quant Trading), các chỉ số thống kê quan trọng và cách áp dụng mô hình toán học trong thị trường tài chính.',
    category: 'Quant',
    tags: ['Quant', 'Finance'],
    coverColor: '#FFFBEB',
    illustrationType: 'quant',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    publishedAt: '12 Tháng 8, 2026',
    readTime: '5 phút đọc',
    slug: 'tong-quan-ve-quant-trading',
  },
  {
    id: '4',
    title: 'Tư Duy Xác Suất & Thống Kê Trong Ra Quyết Định Lập Trình',
    description:
      'Cách áp dụng tư duy xác suất thống kê Bayes để đánh giá rủi ro, dự đoán dữ liệu và tối ưu thuật toán giải quyết vấn đề.',
    category: 'Tư duy',
    tags: ['Tư duy', 'Xác suất'],
    coverColor: '#ECFDF5',
    illustrationType: 'tuduy',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    publishedAt: '10 Tháng 8, 2026',
    readTime: '10 phút đọc',
    slug: 'tu-duy-xac-suat-thong-ke',
  },
  {
    id: '5',
    title: 'Phương Pháp Backtest Mô Hình Quant Chuẩn Xác Tránh Overfitting',
    description:
      'Hướng dẫn phương pháp kiểm thử dữ liệu quá khứ (Backtesting) chuẩn mực, xử lý bias dữ liệu và chống nhiễu mô hình định lượng.',
    category: 'Quant',
    tags: ['Quant', 'Backtest'],
    coverColor: '#FFF1F2',
    illustrationType: 'quant',
    author: {
      name: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    publishedAt: '05 Tháng 8, 2026',
    readTime: '7 phút đọc',
    slug: 'phuong-phap-backtest-quant',
  },
  {
    id: '6',
    title: 'Phương Pháp Học Tập Chủ Động & Kỹ Năng Giải Quyết Bài Toán Khó',
    description:
      'Phương pháp học tập theo nguyên lý thứ nhất (First Principles Thinking), kỹ thuật ghi chép và chia nhỏ bài toán phức tạp.',
    category: 'Phương pháp',
    tags: ['Phương pháp', 'Learning'],
    coverColor: '#F0FDFA',
    illustrationType: 'phuongphap',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    publishedAt: '02 Tháng 8, 2026',
    readTime: '9 phút đọc',
    slug: 'phuong-phap-hoc-tap-chu-dong',
  },
];
