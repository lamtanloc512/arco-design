import path from 'node:path';
import Module from 'node:module';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The playground runs the fork's own source (../components), not the npm build, so a fix made
// in components/ shows up here and in the SSR check at once.
const fork = path.resolve(__dirname, '../components');
const npmArco = path.resolve(__dirname, 'node_modules/@arco-design/web-react');

// The fork's components import their dependencies (dayjs, lodash, ...) by bare name and their
// icons from ../../icon/react-icon, which the fork only has after its icon generation step.
// Resolve both from here: deps from the playground's node_modules, icons from the published
// package of the same version (same icons, same IconContext).
function forkSource(): Plugin {
  const here = path.resolve(__dirname, 'src/main.tsx');
  return {
    name: 'arco-fork-source',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !importer.startsWith(fork)) return null;
      const icon = source.match(/(?:\.\.\/)+icon\/react-icon(\/.*)?$/);
      if (icon) return this.resolve(`${npmArco}/icon/react-icon${icon[1] ?? ''}`, here, { ...options, skipSelf: true });
      if (source.startsWith('.') || source.startsWith('/') || source.startsWith('\0')) return null;
      return this.resolve(source, here, { ...options, skipSelf: true });
    },
  };
}

// The fork's Less loads Less plugins (theme/color/palette.js) that require @arco-design/color,
// which lives in this folder's node_modules, not next to components/. Let Node find it from here.
process.env.NODE_PATH = [path.resolve(__dirname, 'node_modules'), process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
(Module as unknown as { _initPaths(): void })._initPaths();

// SINGLE=1 inlines everything into one dist/client/index.html, for sharing the page as one file.
export default defineConfig({
  plugins: [forkSource(), react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  resolve: {
    alias: [
      { find: /^@arco-design\/web-react$/, replacement: path.join(fork, 'index.tsx') },
      { find: /^@arco-design\/web-react\/es\/locale\/(.*)$/, replacement: path.join(fork, 'locale/$1') },
      { find: /^@arco-design\/web-react\/icon$/, replacement: path.join(npmArco, 'icon/index.es.js') },
    ],
  },
  css: { preprocessorOptions: { less: { javascriptEnabled: true } } },
  // Bundle everything into the server build, so the SSR check runs the same code as the browser.
  ssr: { noExternal: true },
  build: { outDir: process.env.SSR_BUILD ? 'dist/server' : 'dist/client' },
});
