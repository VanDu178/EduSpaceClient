export type BlogCategoryName =
  | 'Tất cả'
  | 'Tư duy'
  | 'Phương pháp'
  | 'Quant';

export type BlogIllustrationType =
  | 'tuduy'
  | 'phuongphap'
  | 'quant';

export interface BlogAuthor {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: BlogCategoryName;
  tags: string[];
  coverColor: string;
  illustrationType: BlogIllustrationType;
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  slug: string;
}
