import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, getPost, getPosts } from '@/lib/posts';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // Static export fails on an empty list, so emit a placeholder that renders
  // the 404 page. "_" can never be a real slug (_*.md files are ignored).
  if (posts.length === 0) return [{ slug: '_' }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` }
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="pt-10 md:pt-16 space-y-6">
      <header className="space-y-2">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-blue-600">
          ← All articles
        </Link>
        <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </header>
      <div className="space-y-5">{post.content}</div>
    </article>
  );
}
