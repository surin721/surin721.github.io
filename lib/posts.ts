import { promises as fs } from 'fs';
import path from 'path';
import { cache } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { useMDXComponents } from '@/mdx-components';

// Blog posts are plain Markdown files in content/blog/<slug>.md.
// Files starting with "_" (e.g. _template.md) are ignored.
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

type Frontmatter = {
  title?: string;
  date?: string | Date;
  summary?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary?: string;
  content: React.ReactElement;
};

async function loadPost(file: string): Promise<Post | null> {
  const source = await fs.readFile(path.join(POSTS_DIR, file), 'utf8');
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    components: useMDXComponents(),
    options: {
      parseFrontmatter: true,
      mdxOptions: { format: 'md', remarkPlugins: [remarkGfm] }
    }
  });

  const { title, date, summary, draft } = frontmatter;
  if (!title || !date) {
    throw new Error(
      `content/blog/${file}: "title" and "date" are required in the header`
    );
  }
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(
      `content/blog/${file}: "date" must look like 2026-09-28, got "${date}"`
    );
  }
  // Drafts show up in `pnpm dev` but are never published.
  if (draft && process.env.NODE_ENV === 'production') {
    return null;
  }

  return {
    slug: file.replace(/\.md$/, ''),
    title,
    date: parsed.toISOString().slice(0, 10),
    summary,
    content
  };
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const files = await fs.readdir(POSTS_DIR).catch(() => []);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
      .map(loadPost)
  );
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
