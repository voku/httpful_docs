import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function normalizeBasePath(basePath: string): string {
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const fallbackBasePath = process.env.GITHUB_ACTIONS === 'true' && repositoryName
    ? `/${repositoryName}/`
    : '/';

  return {
    base: normalizeBasePath(env.VITE_BASE_PATH || fallbackBasePath),
    plugins: [react(), tailwindcss()],
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
