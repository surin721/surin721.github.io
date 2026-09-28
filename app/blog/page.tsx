import type { Metadata } from 'next';
import { PostList } from '@/components/post-list';
import { getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles by Surin Athukorala on software engineering and work.',
  alternates: { canonical: '/blog' }
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="pt-10 md:pt-16 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Blog</h1>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-gray-600">No articles yet.</p>
      )}
    </section>
  );
}
