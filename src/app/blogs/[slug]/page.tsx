import { Metadata } from 'next';
import { BlogDetailPage, getBlogBySlugApi, extractPlainText } from '@/modules/blogs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlugApi(slug);
    const title = `${blog.title} - TradeVerse Blog`;
    const description =
      extractPlainText(blog.summary) ||
      extractPlainText(blog.content)?.slice(0, 160) ||
      'Khám phá bài viết chi tiết, hướng dẫn và phân tích chuyên sâu từ TradeVerse.';
    const image = blog.bannerUrl || blog.thumbnailUrl;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: blog.publishedAt || blog.createdAt,
        modifiedTime: blog.updatedAt,
        images: image ? [{ url: image }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch {
    return {
      title: 'Chi Tiết Bài Viết - TradeVerse Blog',
      description: 'Khám phá bài viết chi tiết, hướng dẫn và phân tích chuyên sâu từ TradeVerse.',
    };
  }
}

export default function BlogDetailRoute() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-12">
      <BlogDetailPage />
    </main>
  );
}
