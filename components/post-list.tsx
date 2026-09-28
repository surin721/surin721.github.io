import Link from 'next/link';
import { formatDate, getPosts, type Post } from '@/lib/posts';

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <p className="text-sm text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <p className="font-medium text-gray-900 group-hover:text-blue-600">
              {post.title}
            </p>
            {post.summary && (
              <p className="mt-1 text-gray-600 leading-snug">{post.summary}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Home page section; renders nothing until the first post is published.
export async function LatestPosts({ limit = 3 }: { limit?: number }) {
  const posts = await getPosts();
  if (posts.length === 0) return null;

  return (
    <section>
      <h2
        id="blog"
        className="text-gray-900 font-semibold mt-10 mb-3 scroll-mt-8"
      >
        Blog
      </h2>
      <PostList posts={posts.slice(0, limit)} />
      {posts.length > limit && (
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm text-blue-600 hover:underline"
        >
          All articles →
        </Link>
      )}
    </section>
  );
}
