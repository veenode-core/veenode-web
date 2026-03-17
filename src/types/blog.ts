export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  coverImage: string;
  featured: boolean;
  tags: string[];
}
