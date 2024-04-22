/// <reference types="vite-plugin-svgr/client" />

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

// https://vitejs.dev/config/

// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr({ include: '**/*.svg?react' }),
      ViteEjsPlugin((viteConfig) => ({
        // viteConfig is the current Vite resolved config
        env: viteConfig.env,
      })),
    ],
    resolve: {
      alias: {
        shared: path.resolve(__dirname, '..', 'shared', 'src'),
      },
    },
    server: {
      port: +(env.CLIENT_DEV_SERVER_PORT ?? 3000),
      // https://vitejs.dev/config/#server-proxy
      proxy: {
        '/api': {
          target: env.SERVER_URL ?? 'http://localhost:8080',
        },
      },
    },
    define: {
      'process.env.NODE_ENV': `"${env.NODE_ENV}"`,
    },
  };
});
