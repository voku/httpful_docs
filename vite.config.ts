import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type PluginOption} from 'vite';

function normalizeBasePath(basePath?: string): string {
  const trimmedBasePath = basePath?.trim();

  if (!trimmedBasePath || /^\/+$/u.test(trimmedBasePath)) {
    return '/';
  }

  const collapsedPath = trimmedBasePath.replace(/^\/+|\/+$/gu, '');
  return `/${collapsedPath}/`;
}

function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
}

function socialMetadataPlugin(siteUrl: string): PluginOption {
  const socialPreviewUrl = new URL('social-preview.svg', siteUrl).toString();

  return {
    name: 'httpful-social-metadata',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__SOCIAL_PREVIEW_URL__', socialPreviewUrl);
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const [repositoryOwner, repositoryName] = (process.env.GITHUB_REPOSITORY ?? 'voku/httpful_docs').split('/');
  const fallbackBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName
    ? `/${repositoryName}/`
    : '/';
  const fallbackSiteUrl = repositoryOwner && repositoryName
    ? `https://${repositoryOwner}.github.io/${repositoryName}/`
    : 'https://voku.github.io/httpful_docs/';
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL || fallbackSiteUrl);

  return {
    base: normalizeBasePath(env.VITE_BASE_PATH || fallbackBasePath),
    plugins: [react(), tailwindcss(), socialMetadataPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
