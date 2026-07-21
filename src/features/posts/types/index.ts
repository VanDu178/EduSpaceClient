export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content?: string;
  readTime?: string;
  image?: string;
  likes?: number;
}

