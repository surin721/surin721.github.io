# surinathukorala.me

Personal portfolio of Surin Athukorala, built with Next.js, MDX and Tailwind CSS
(based on [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)).

## Development

```bash
pnpm install
pnpm dev
```

Edit the home page in `app/page.mdx`. Add posts as `app/n/<slug>/page.mdx`.

To replace the photo placeholder, add an image to `public/` (e.g. `public/profile.jpg`)
and pass `image="/profile.jpg"` to `<Hero>` in `app/page.mdx`.

## Deployment

Pushes to `main` build a static export (`out/`) and deploy it to GitHub Pages via
`.github/workflows/deploy.yml`, served at [surinathukorala.me](https://surinathukorala.me).
