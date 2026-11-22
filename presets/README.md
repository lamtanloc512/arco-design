# Arco presets

Six looks for Arco, applied at runtime on top of the stock stylesheet. No rebuild of the library:
Arco already reads its colours, greys, backgrounds and radius from CSS variables, so a preset is a set
of those variables plus a small polish layer.

| Preset | Primary | Greys | Radius (small / medium / large), card | Squircle smoothing | Feel |
| --- | --- | --- | --- | --- | --- |
| `zinc` | near-black (near-white in dark) | zinc | 6 / 8 / 10, card 10 | 0.6 | neutral, crisp, shadcn-like |
| `indigo` | `#5e6ad2` | slate | 4 / 6 / 8, card 8 | 0.6 | calm product tool |
| `ember` | `#ea580c` | stone, cream page | 6 / 8 / 12, card 12 | 0.8 | warm, friendly |
| `lumo` | `#006af5` (Vaadin Lumo) | Lumo's contrast ramp | 4 / 4 / 8, card 8 | 0.6 | Vaadin's Lumo: filled fields, primary-text default buttons |
| `atlassian` | `#1868db` (ADS) | ADS neutral scale | 4 / 6 / 8, card 8 | 0.6 | after atlassian.design: Inter, bold tight headings, outlined buttons, pale-blue selection |
| `violet` | `#7c3aed` | mauve | 8 / 10 / 14, card 14 | 1 | soft, playful |

Radius stays small: no pills, nothing past 14px. Surfaces with a larger radius (cards, dialogs,
popups, alerts, the FAQ) are drawn as squircles with [Monoco](https://somonoco.com) by `corners.js`,
so a 12px corner reads as smooth rather than round. Controls keep a plain small radius: a clip-path
would cut their focus ring.

`atlassian` follows @atlaskit/tokens 20.14 (the brand-refresh palette), @atlaskit/button 25.8 and
@atlaskit/textfield 11.0: brand blue, the neutral scale, surfaces and elevations; default buttons
transparent with a 1px border and subtle text; white fields with the strong `border.input` and a
2px `border.focused` on focus; in dark mode a light-blue primary with dark text. The rest takes
its cue from atlassian.design: bold, tight headings (700, -0.02em); the selected item in a vertical
menu or anchor on `background.selected` with blue text and a 2px blue bar at its edge; section
messages on 8px corners. Atlassian Sans is not a public web font, so it uses Inter, the closest
public face. Other presets can use the same knobs: `type`, `selected`, `shape.alert`.

`lumo` follows vaadin-lumo-styles 25.3 (`src/props/*.css`): its colours, its contrast ramp
composited over the base colour, radius, shadows and font stack. Its fields are filled
(`fields: 'filled'`) with a 2px focus ring, and default buttons have Lumo's 5% fill and
primary-coloured text. What it cannot change: Arco's controls stay 32px high with 14px text,
where Lumo's are 36px and 16px.

## Use

```ts
import '@arco-design/web-react/dist/css/arco.css';
import 'path/to/presets/css/all.css'; // every preset + the polish layer
import { startCorners } from 'path/to/presets/corners.js'; // squircle surfaces with Monoco
useEffect(() => startCorners(), []);   // in the app root; after hydration when server-rendered
```

```js
document.body.setAttribute('data-arco-preset', 'zinc');
document.body.setAttribute('arco-theme', 'dark'); // Arco's own dark switch; remove for light
```

For one preset only, load `css/<name>.css` and `polish.css` instead of `all.css`.
Without `data-arco-preset` on `body`, the page is plain Arco. Add `data-corners` to an element of
your own to give it squircle corners too. Monoco paints the border as the element's background
image, so put any background gradient on a pseudo-element; the playground's CTA shows how.

## What a preset changes

- **Tokens** (`css/<name>.css`): `--primary-1..10` (and `--arcoblue-*`, which some components read
  directly), `--gray-1..10`, `--color-bg-1..5`, dark-mode text and border colours, and
  `--border-radius-small/medium/large`. Chromatic primaries go through Arco's own palette generator
  (`@arco-design/color`). In dark mode, step 6 stays the brand colour so white text on it stays
  readable.
- **Polish** (`polish.css`): the things Arco compiles into its sheet instead of reading from a variable.
  Fields are outlined with a focus ring (or filled, per preset, through `--preset-field-*`). Cards and popups get their own radius
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
