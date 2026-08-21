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

export interface BlogType {
  id: number;
  name: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  blogTypeId: number;
  bannerUrl?: string | null;
  thumbnailUrl?: string | null;
  isPremium: boolean;
  summary?: string | null;
  content?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: number | null;
  status: string;
  blogType?: BlogType;
  creator?: {
    id: number;
    name?: string | null;
    email: string;
  } | null;
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

