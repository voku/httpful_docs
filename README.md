# Httpful docs site

This repository contains the Vite-powered documentation landing page for [voku/httpful](https://github.com/voku/httpful).

## Production URL

- GitHub Pages: https://voku.github.io/httpful_docs/

## Local development

### Prerequisites

- Node.js 22+
- npm 10+

### Install

```bash
npm ci
```

### Start the dev server

```bash
npm run dev
```

### Type-check the project

```bash
npm run lint
```

### Build the production bundle

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

## Deployment

The site is deployed automatically with GitHub Actions from `.github/workflows/deploy.yml`.

- Push to `main` to trigger a production deployment
- Use **Actions → Deploy GitHub Pages** to run a manual deployment
- The workflow installs dependencies with `npm ci`, builds with Vite, uploads `dist/`, and deploys to GitHub Pages

### Optional environment override

If you need to deploy the site under a different subpath, create a local `.env` file from `.env.example` and set `VITE_BASE_PATH`.

## Key files

- `src/App.tsx` — landing page content and documentation sections
- `src/index.css` — theme tokens and shared styling
- `index.html` — favicon, SEO metadata, and Open Graph tags
- `vite.config.ts` — Vite config and GitHub Pages base path handling
- `public/favicon.svg` — site favicon
- `public/social-preview.svg` — social sharing preview asset
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment workflow

## Key Files Detector helper prompt

```text
You are reviewing the Httpful docs site. Identify the smallest set of files needed to make a requested change. Prioritize files that directly control page content, metadata, styling, and deployment. For each file, explain why it matters and whether the change is content-only, styling-only, metadata-only, or deployment-related.
```
