# Arco presets

Seven looks for Arco, applied at runtime on top of the stock stylesheet. No rebuild of the library:
Arco already reads its colours, greys, backgrounds and radius from CSS variables, so a preset is a set
of those variables plus a small polish layer.

| Preset | Primary | Greys | Radius (small / medium / large), card | Squircle smoothing | Feel |
| --- | --- | --- | --- | --- | --- |
| `zinc` | near-black (near-white in dark) | zinc | 6 / 8 / 10, card 10 | 0.6 | neutral, crisp, shadcn-like |
| `indigo` | `#5e6ad2` | slate | 4 / 6 / 8, card 8 | 0.6 | calm product tool |
| `ember` | `#ea580c` | stone, cream page | 6 / 8 / 12, card 12 | 0.8 | warm, friendly |
| `lumo` | `#006af5` (Vaadin Lumo) | Lumo's contrast ramp | 4 / 4 / 8, card 8 | 0.6 | Vaadin's Lumo: filled fields, primary-text default buttons |
| `atlassian` | `#1868db` (ADS) | ADS neutral scale | 4 / 6 / 8, card 8 | 0.6 | after atlassian.design: Inter, bold tight headings, outlined buttons, pale-blue selection |
| `material` | `#6750a4` (M3 baseline) | M3 neutral / neutral-variant tones | 4 / 8 / 12, card 12 | 0.8 | Material 3: tonal buttons, Roboto, tinted surfaces, corners kept small |
| `violet` | `#7c3aed` | mauve | 8 / 10 / 14, card 14 | 1 | soft, playful |

Radius stays small: no pills, nothing past 14px. Every control (button, field, select, picker,
input group) takes one radius, `--preset-radius-control`, so a field and the button beside it
always match. No edge bars on rounded shapes. An input with
text addons (`addBefore` / `addAfter`, InputNumber's buttons) is one control: one squircle outline,
square joins inside, a divider before each addon. Surfaces with a larger radius (cards, dialogs,
popups, alerts, the FAQ) are drawn as squircles with [Monoco](https://somonoco.com) by `corners.js`,
so a 12px corner reads as smooth rather than round. Controls keep a plain small radius: a clip-path
would cut their focus ring.

`atlassian` follows @atlaskit/tokens 20.14 (the brand-refresh palette), @atlaskit/button 25.8 and
@atlaskit/textfield 11.0: brand blue, the neutral scale, surfaces and elevations; default buttons
transparent with a 1px border and subtle text; white fields with the strong `border.input` and a
2px `border.focused` on focus; in dark mode a light-blue primary with dark text. The rest takes
its cue from atlassian.design: bold, tight headings (700, -0.02em); the selected item in a vertical
menu or anchor on `background.selected` with blue text, its corners a squircle; section
messages on 8px corners. Atlassian Sans is not a public web font, so it uses Inter, the closest
public face. Other presets can use the same knobs: `type`, `selected`, `shape.alert`.

`material` follows @material/web 2.5 (tokens v0.192: md-sys-color, md-ref-palette, md-sys-shape,
md-ref-typeface, and the elevation recipe): the baseline scheme on tinted surfaces, Roboto with
regular-weight headlines, tonal default buttons (`secondary-container`), outlined buttons and fields
on the `outline` colour with a 2px primary focus, the navigation indicator for selection, and M3's
key + ambient shadows. It also moves like M3 (`interaction: 'material'`, from @material/web's ripple and focus-ring
sources): a state layer at 8% of the content colour on hover; a press ripple that grows from the
pointer over 450ms with the standard easing, holds 12% for at least 225ms and fades over 375ms
(`ripple.js`, Web Animations on `::after`, no added elements); a 3px focus ring in the secondary
colour that grows to 8px and settles; no colour change on hover or press; body and label
letter-spacing from the typescale. Two departures, on purpose: buttons use corner-small (8px), not corner-full
pills, and dialogs and popups stop at 12px / 8px (squircles) instead of 28px. In dark mode, error
uses error60 so it stays readable on the dark surface.

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
import { startRipple } from 'path/to/presets/ripple.js';   // Material press ripple
useEffect(() => { const a = startCorners(); const b = startRipple(); return () => { a(); b(); }; }, []); // app root, after hydration
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
