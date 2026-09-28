import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (served at the custom domain root).
  output: 'export',
  images: { unoptimized: true },
  pageExtensions: ['mdx', 'ts', 'tsx'],
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. If you need them, remove
  // the `experimental.mdxRs` flag.
  experimental: {
    mdxRs: { mdxType: 'gfm' }
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
