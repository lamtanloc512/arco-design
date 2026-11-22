// SSR check for the fork's components. Fails (exit 1) on anything that breaks server rendering
// or hydration:
//
//   1. builds the client and server with React's development build, so React reports every
//      server/client difference instead of patching it silently;
//   2. for each case below, renders the page on the server (renderToString) and collects
//      warnings printed while rendering;
//   3. loads that HTML in Chromium, lets React hydrate it, and collects console errors and
//      warnings, including hydration mismatches;
//   4. opens every overlay (pickers, selects, dialogs, messages) on the hydrated page, since a
//      popup's code only runs on the client.
//
//   npm run ssr:check   (needs Playwright with Chromium: npm i -D playwright && npx playwright install chromium)
import { execSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Resolved with require so a global Playwright (NODE_PATH) works as well as a local one.
const { chromium } = createRequire(import.meta.url)('playwright');

const here = path.dirname(new URL(import.meta.url).pathname);
const client = path.join(here, 'dist/client');
const cases = [
  ['components', 'zinc', 'light'],
  ['components', 'ember', 'dark'],
  ['components', 'arco', 'light'],
  ['components', 'lumo', 'dark'],
  ['components', 'atlassian', 'light'],
  ['blocks', 'atlassian', 'dark'],
  ['components', 'material', 'dark'],
  ['blocks', 'material', 'light'],
  ['blocks', 'zinc', 'light'],
  ['blocks', 'violet', 'dark'],
];
const sh = (cmd, env = {}) => execSync(cmd, { cwd: here, env: { ...process.env, ...env }, stdio: 'pipe' }).toString();

console.log('building (development React)...');
sh('npm --prefix ../presets run build');
sh('rm -rf dist');
sh('npx vite build --mode development --minify false', { NODE_ENV: 'development' });
sh('npx vite build --ssr src/entry-server.tsx', { SSR_BUILD: '1' });
const template = readFileSync(path.join(client, 'index.html'), 'utf8');

const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html' };
let page = '';
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const file = path.join(client, url.pathname);
  if (url.pathname !== '/' && existsSync(file)) {
    res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  } else {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(page);
  }
}).listen(0);
const base = `http://localhost:${server.address().port}`;

// The server build bundles React's development build: render in a child process so its
// console warnings can be collected.
function serverRender(view, preset, mode) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--input-type=module', '-e', `
      const { render } = await import(${JSON.stringify(path.join(here, 'dist/server/entry-server.js'))});
      const out = render({ view: ${JSON.stringify(view)}, preset: ${JSON.stringify(preset)}, dark: ${mode === 'dark'} });
      process.stdout.write(JSON.stringify(out));
    `]);
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('close', (code) => (code ? reject(new Error(err)) : resolve({ ...JSON.parse(out), warnings: err.split(/\n(?=Warning|Error)/).filter((w) => w.trim()) })));
  });
}

const overlays = [
  ['Select', '#c-select-autocomplete-cascader .arco-select'],
  ['Cascader', '#c-select-autocomplete-cascader .arco-cascader'],
  ['TreeSelect', '#c-select-autocomplete-cascader .arco-tree-select'],
  ['DatePicker', '#c-date-and-time .arco-picker', 0],
  ['RangePicker', '#c-date-and-time .arco-picker', 1],
  ['TimePicker', '#c-date-and-time .arco-picker', 3],
  ['ColorPicker', '#c-slider-and-colorpicker .arco-color-picker'],
  ['Dropdown', 'role=button[name="Actions"]'],
  ['Popover', 'role=button[name="Popover"]'],
  ['Popconfirm', 'role=button[name="Popconfirm"]'],
  ['Trigger', 'role=button[name="Click for Trigger"]'],
  ['Modal', '#c-modal-drawer-message-notification >> role=button[name="Modal"]'],
  ['Confirm', 'role=button[name="Confirm"]'],
  ['Drawer', 'role=button[name="Drawer"]'],
  ['Message', '#c-modal-drawer-message-notification >> role=button[name="Message"]'],
  ['Notification', '#c-modal-drawer-message-notification >> role=button[name="Notification"]'],
  ['Table sorter', '#c-table .arco-table-sorter'],
];

const browser = await chromium.launch();
let failures = 0;
for (const [view, preset, mode] of cases) {
  const label = `${view} / ${preset} / ${mode}`;
  const { html, state, bodyAttributes, warnings } = await serverRender(view, preset, mode);
  const attrs = Object.entries(bodyAttributes).map(([k, v]) => ` ${k}="${v}"`).join('');
  page = template
    .replace(/<body[^>]*>/, `<body${attrs}>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div><script>window.__PAGE_STATE__=${JSON.stringify(state)}</script>`);

  const tab = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const problems = warnings.map((w) => `server: ${w.split('\n')[0]}`);
  tab.on('pageerror', (e) => problems.push(`client error: ${e.message}`));
  tab.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`client: ${m.text().split('\n')[0]}`);
  });
  await tab.goto(`${base}/?view=${view}&preset=${preset}&mode=${mode}`, { waitUntil: 'networkidle', timeout: 30000 });
  await tab.waitForTimeout(500);

  if (view === 'components') {
    for (const [name, selector, nth = 0] of overlays) {
      try {
        const target = tab.locator(selector).nth(nth);
        await target.scrollIntoViewIfNeeded({ timeout: 4000 });
        await target.click({ timeout: 4000 });
        await tab.waitForTimeout(300);
      } catch (e) {
        problems.push(`could not open ${name}: ${e.message.split('\n')[0]}`);
      }
      await tab.keyboard.press('Escape');
      await tab.mouse.click(5, 300);
      await tab.waitForTimeout(150);
    }
    if (!(await tab.evaluate(() => document.getElementById('root').childElementCount))) problems.push('the app unmounted');
  }
  await tab.close();

  const unique = [...new Set(problems)];
  console.log(`${unique.length ? 'FAIL' : 'ok  '} ${label} (${(html.length / 1024).toFixed(0)} kB of server HTML)`);
  for (const p of unique) console.log(`     ${p.slice(0, 300)}`);
  failures += unique.length;
}
await browser.close();
server.close();
process.exit(failures ? 1 : 0);
