# Arco playground

A page of every Arco component and a set of marketing and app blocks, under the runtime presets in
`../presets`. It runs the fork's own source (`../components`), not the npm build, and it is
server-rendered: the HTML comes from `renderToString` and the browser hydrates it.

```bash
npm install
npm run dev        # client-only dev server
npm run build      # client + server build, then the server render into dist/client/index.html
npm run preview    # serve dist/client
npm run ssr:check  # server render + hydration + every overlay, fails on any warning
```

`?view=components|blocks&preset=zinc|indigo|ember|violet|arco&mode=light|dark` picks what the
page shows. `node prerender.mjs --view blocks --preset ember --mode dark` renders another starting
state into the built page.

## How it uses the fork

`vite.config.ts` points `@arco-design/web-react` at `../components/index.tsx`. Two things come from
the published package of the same version (2.66.18) instead:

- icons: the fork's `icon/react-icon` only exists after its icon generation step;
- `arco.css`: the fork's Less is not compiled here.

## Server rendering

| File | Runs on | Does |
| --- | --- | --- |
| `src/entry-server.tsx` | server | `render(state)` returns the HTML and the attributes `<body>` needs |
| `prerender.mjs` | server | writes that HTML, the body attributes and the state into `index.html` |
| `src/main.tsx` | browser | `hydrateRoot` when `#root` has server HTML, `createRoot` otherwise |
| `src/state.ts` | both | the page state; `readClientState` is only called after hydration |

Rules the page keeps, and an app using Arco with SSR should keep too:

- Render nothing that depends on `window`, the URL, the viewer's theme or the clock. Read those in
  an effect, after hydration. Give date components a fixed `defaultValue` or `now` where the page
  allows it.
- Put the preset and theme on `<body>` on the server (`data-arco-preset`, `arco-theme`), so the
  first paint is already styled.
- Start `presets/corners.js` from an effect (`useEffect(() => startCorners(), [])`). Monoco writes
  inline styles, and doing that before hydration is a mismatch.

## What `ssr:check` covers

It builds with React's development build, because only that build reports hydration differences;
the production build patches them silently. For each case (both views, several presets, light
and dark) it collects warnings from the server render. It then hydrates the page in Chromium and
opens every overlay: the pickers, selects, dropdown, popover, popconfirm, trigger, modal,
confirm, drawer, message and notification. Any console warning or page error fails the run.
