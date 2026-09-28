import { getPosts } from '@/lib/posts';

export const dynamic = 'force-static';

const SITE_URL = 'https://surin721.github.io';

export default async function sitemap() {
  const posts = await getPosts();

  const routes = ['', ...(posts.length > 0 ? ['/blog'] : [])].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date().toISOString()
    })
  );

  const articles = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date
  }));

  return [...routes, ...articles];
}
