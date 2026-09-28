# surin721.github.io

Personal portfolio of Surin Athukorala, built with Next.js, MDX and Tailwind CSS
(based on [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)).

## Development

```bash
pnpm install
pnpm dev
```

Edit the home page in `app/page.mdx`.

## Writing a blog post

Articles are plain Markdown files in `content/blog/`:

1. Copy `content/blog/_template.md` to `content/blog/<slug>.md` — the file name
   becomes the URL (`/blog/<slug>`).
2. Fill in the header (`title` and `date` are required, `summary` is optional).
   Keep `draft: true` while writing; drafts only show in `pnpm dev`.
3. Write the article in Markdown. Put images in `public/blog/` and reference them
   as `![Alt text](/blog/image.png)`.
4. Remove `draft: true`, commit and push — the site redeploys automatically.

Files starting with `_` are never published. The Blog link and home-page section
appear automatically once the first article is published.

To replace the photo placeholder, add an image to `public/` (e.g. `public/profile.jpg`)
and pass `image="/profile.jpg"` to `<Hero>` in `app/page.mdx`.

## Deployment

Pushes to `main` build a static export (`out/`) and deploy it to GitHub Pages via
`.github/workflows/deploy.yml`, served at [surin721.github.io](https://surin721.github.io).
