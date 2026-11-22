# Arco presets

Four looks for Arco, applied at runtime on top of the stock stylesheet. No rebuild of the library:
Arco already reads its colours, greys, backgrounds and radius from CSS variables, so a preset is a set
of those variables plus a small polish layer.

| Preset | Primary | Greys | Radius (small / medium / large) | Feel |
| --- | --- | --- | --- | --- |
| `zinc` | near-black (near-white in dark) | zinc | 6 / 8 / 12 | neutral, crisp, shadcn-like |
| `indigo` | `#5e6ad2` | slate | 6 / 8 / 10 | calm product tool |
| `ember` | `#ea580c` | stone, cream page | 10 / 12 / 16 | warm, friendly |
| `violet` | `#7c3aed` | mauve | 12 / 16 / 20, pill buttons | soft, playful |

## Use

```ts
import '@arco-design/web-react/dist/css/arco.css';
import 'path/to/presets/css/all.css'; // every preset + the polish layer
```

```js
document.body.setAttribute('data-arco-preset', 'zinc');
document.body.setAttribute('arco-theme', 'dark'); // Arco's own dark switch; remove for light
```

For one preset only, load `css/<name>.css` and `polish.css` instead of `all.css`.
Without `data-arco-preset` on `body`, the page is plain Arco.

## What a preset changes

- **Tokens** (`css/<name>.css`): `--primary-1..10` (and `--arcoblue-*`, which some components read
  directly), `--gray-1..10`, `--color-bg-1..5`, dark-mode text and border colours, and
  `--border-radius-small/medium/large`. Chromatic primaries go through Arco's own palette generator
  (`@arco-design/color`). In dark mode, step 6 stays the brand colour so white text on it stays
  readable.
- **Polish** (`polish.css`): the things Arco compiles into its sheet instead of reading from a variable.
  Fields are outlined with a focus ring instead of filled grey. Cards and popups get their own radius
  and layered shadows. Buttons are weight 500 with a per-preset radius, and headings are weight 600.
  Words break between words instead of anywhere. Everything is scoped to `body[data-arco-preset]` and
  reads only `--preset-*` and Arco variables.

## Edit or add a preset

Edit `presets.config.mjs`, then:

```bash
npm install
npm run build   # writes css/<name>.css, css/all.css and css/presets.json
```

## See them

`../playground` is a page of marketing and app sections (hero, features, pricing, dashboard table,
forms, login, overlays, FAQ) built only from Arco components, with a preset and dark-mode switch:

```bash
cd ../playground && npm install && npm run dev
```

`?preset=ember&mode=dark` in the URL opens a given preset. `SINGLE=1 npm run build` writes the whole
page as one `dist/index.html`.
