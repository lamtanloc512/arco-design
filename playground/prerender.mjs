// Server-side render: runs the server build's render() and writes the HTML into the client
// build's index.html, so the page arrives drawn and the client hydrates it.
//
//   node prerender.mjs [--preset zinc] [--mode light] [--view components]
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const here = path.dirname(new URL(import.meta.url).pathname);
const file = path.join(here, 'dist/client/index.html');
const { render } = await import(pathToFileURL(path.join(here, 'dist/server/entry-server.js')).href);

const { html, state, bodyAttributes } = render({
  preset: arg('preset', 'zinc'),
  dark: arg('mode', 'light') === 'dark',
  view: arg('view', 'components'),
});

const attrs = Object.entries(bodyAttributes).map(([k, v]) => ` ${k}="${v}"`).join('');
const stateScript = `<script>window.__PAGE_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')}</script>`;
const page = readFileSync(file, 'utf8')
  .replace(/<body[^>]*>/, `<body${attrs}>`)
  .replace('<div id="root"></div>', `<div id="root">${html}</div>${stateScript}`);
writeFileSync(file, page);
console.log(`prerendered ${state.view} (${state.preset}, ${state.dark ? 'dark' : 'light'}): ${(html.length / 1024).toFixed(0)} kB of HTML`);
