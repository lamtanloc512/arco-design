// Writes css/<preset>.css (tokens) for every preset in presets.config.mjs, and css/all.css
// (every preset plus the polish layer) for a page that switches between them.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import color from '@arco-design/color';
import { presets } from './presets.config.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'css');
mkdirSync(out, { recursive: true });

const rgb = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
};

const mix = (hex, target, amount) => {
  const a = rgb(hex).split(',').map(Number);
  const b = rgb(target).split(',').map(Number);
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, '0')).join('');
};

// Arco's dark generator lightens the main step until white text on it is hard to read. Keep its
// dark tints for 1-4 (selected rows, light fills), but put the brand colour itself on step 6,
// a slightly darker hover on 5 and a lighter press on 7, as Arco's dark mode expects.
const palette = (primary, dark) => {
  if (typeof primary !== 'string') return primary[dark ? 'dark' : 'light'];
  if (!dark) return color.generate(primary, { list: true });
  const list = color.generate(primary, { list: true, dark: true });
  list[4] = mix(primary, '#000000', 0.12);
  list[5] = primary;
  list[6] = mix(primary, '#ffffff', 0.16);
  return list;
};

const shadows = {
  soft: {
    light: ['0 1px 2px rgba(0,0,0,.05)', '0 4px 12px -2px rgba(0,0,0,.08), 0 2px 4px -2px rgba(0,0,0,.05)', '0 16px 40px -12px rgba(0,0,0,.18), 0 4px 10px -4px rgba(0,0,0,.08)'],
    dark: ['0 1px 2px rgba(0,0,0,.4)', '0 4px 14px -2px rgba(0,0,0,.5)', '0 16px 40px -8px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06)'],
  },
  warm: {
    light: ['0 1px 2px rgba(68,40,20,.06)', '0 6px 18px -4px rgba(68,40,20,.12), 0 2px 4px -2px rgba(68,40,20,.06)', '0 20px 48px -12px rgba(68,40,20,.24), 0 4px 10px -4px rgba(68,40,20,.08)'],
    dark: ['0 1px 2px rgba(0,0,0,.45)', '0 6px 18px -4px rgba(0,0,0,.55)', '0 20px 48px -10px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.06)'],
  },
  // Lumo (vaadin-lumo-styles 25.3): bordered surfaces have no shadow, like its outlined card;
  // a raised one gets --lumo-box-shadow-xs, a popup --lumo-box-shadow-m.
  lumo: {
    light: ['none', '0 1px 4px -1px hsla(214, 45%, 20%, 0.52)', '0 2px 6px -1px hsla(214, 53%, 23%, 0.16), 0 8px 24px -4px hsla(214, 47%, 21%, 0.38)'],
    dark: ['none', '0 1px 4px -1px hsla(214, 20%, 10%, 0.5)', '0 2px 6px -1px hsla(214, 8%, 4%, 0.23), 0 8px 24px -4px hsla(214, 16%, 8%, 0.41)'],
  },
  // Atlassian (@atlaskit/tokens 20.14): elevation.shadow.raised for cards, .overlay for popups.
  ads: {
    light: ['0px 1px 1px #1E1F2140, 0px 0px 1px #1E1F214F', '0px 1px 1px #1E1F2140, 0px 0px 1px #1E1F214F', '0px 8px 12px #1E1F2126, 0px 0px 1px #1E1F214F'],
    dark: ['0px 1px 1px #01040480, 0px 0px 1px #01040480', '0px 1px 1px #01040480, 0px 0px 1px #01040480', '0px 0px 0px 1px #BDBDBD1F, 0px 8px 12px #0104045C, 0px 0px 1px 1px #01040480'],
  },
  // Material 3 (@material/web 2.5, elevation): key shadow at 30% plus ambient at 15%, levels 0 / 1 / 2.
  m3: {
    light: ['none', '0px 1px 2px rgba(0,0,0,.3), 0px 1px 3px 1px rgba(0,0,0,.15)', '0px 1px 2px rgba(0,0,0,.3), 0px 2px 6px 2px rgba(0,0,0,.15)'],
    dark: ['none', '0px 1px 2px rgba(0,0,0,.3), 0px 1px 3px 1px rgba(0,0,0,.15)', '0px 1px 2px rgba(0,0,0,.3), 0px 2px 6px 2px rgba(0,0,0,.15)'],
  },
  // Geist (vercel.com/geist): --ds-shadow-xs for raised controls and cards, -medium on hover,
  // -xl for menus and dialogs (their 1px border comes from the element's own border).
  geist: {
    light: ['0px 1px 2px #0000000a', '0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a', '0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f'],
    dark: ['0px 1px 2px #00000029', '0px 2px 2px #00000052, 0px 8px 8px -8px #00000029', '0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f'],
  },
  lifted: {
    light: ['0 1px 3px rgba(60,30,120,.07)', '0 10px 30px -10px rgba(60,30,120,.18), 0 2px 6px -2px rgba(60,30,120,.06)', '0 24px 60px -16px rgba(60,30,120,.3), 0 6px 14px -6px rgba(60,30,120,.1)'],
    dark: ['0 1px 3px rgba(0,0,0,.45)', '0 10px 30px -10px rgba(0,0,0,.6)', '0 24px 60px -14px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.06)'],
  },
};

function block(name, p, mode) {
  const dark = mode === 'dark';
  const lines = [];
  const v = (k, val) => lines.push(`  --${k}: ${val};`);

  palette(dark && p.primaryDark ? p.primaryDark : p.primary, dark).forEach((hex, i) => {
    v(`primary-${i + 1}`, rgb(hex));
    if (!p.link) v(`arcoblue-${i + 1}`, rgb(hex)); // components that read arcoblue directly (link, some icons)
  });
  // A preset with its own text colour for links (Lumo's --lumo-primary-text-color) puts it on
  // arcoblue, which Arco's Link reads, and on text buttons.
  if (p.link) palette(p.link[mode], dark).forEach((hex, i) => v(`arcoblue-${i + 1}`, rgb(hex)));
  v('preset-text-button', p.link ? 'rgb(var(--arcoblue-6))' : 'rgb(var(--primary-6))');
  // Status palettes (red = danger, green = success, ...), when a preset brings its own.
  for (const [hue, def] of Object.entries(p.palettes ?? {})) {
    const base = typeof def === 'string' ? def : def[mode];
    palette(base, dark).forEach((hex, i) => v(`${hue}-${i + 1}`, rgb(hex)));
  }
  p.gray[mode].forEach((hex, i) => v(`gray-${i + 1}`, rgb(hex)));
  p.bg[mode].forEach((hex, i) => v(`color-bg-${i + 1}`, hex));
  v('color-bg-popup', 'var(--color-bg-5)');
  v('color-border', `rgb(var(--gray-${dark ? 3 : 3}))`);

  if (dark) {
    const g = p.gray.dark;
    v('color-text-1', g[9]);
    v('color-text-2', g[7]);
    v('color-text-3', g[6]);
    v('color-text-4', g[4]);
    v('color-border-1', g[1]);
    v('color-border-2', g[2]);
    v('color-border-3', g[3]);
    v('color-border-4', g[5]);
    v('color-menu-dark-bg', p.bg.dark[1]);
    v('color-menu-light-bg', p.bg.dark[1]);
    v('color-tooltip-bg', g[2]);
  } else {
    v('color-menu-light-bg', p.bg.light[1]);
    v('color-tooltip-bg', `rgb(var(--gray-10))`);
  }

  const [s, m, l] = p.radius;
  v('border-radius-small', s);
  v('border-radius-medium', m);
  v('border-radius-large', l);

  const sh = shadows[p.shape.shadow][mode];
  v('preset-font', p.font);
  v('preset-radius-card', p.shape.card);
  v('preset-radius-popup', p.shape.popup);
  v('preset-radius-button', p.shape.button);
  // One radius for every control that sits in a row with others (buttons, fields, selects,
  // pickers, input groups), so a field and the button beside it always match.
  v('preset-radius-control', p.shape.control ?? p.shape.button);
  v('preset-shadow-sm', sh[0]);
  v('preset-shadow-md', sh[1]);
  v('preset-shadow-lg', sh[2]);
  v(
    'preset-ring',
    typeof p.shape.ring === 'object'
      ? p.shape.ring[mode]
      : `0 0 0 ${p.shape.ringWidth ?? 3}px rgba(var(--primary-6), ${dark ? p.shape.ring + 0.1 : p.shape.ring})`
  );
  v('preset-corner-smoothing', String(p.shape.smoothing ?? 0));
  // Native CSS corner-shape for every rounded control and surface (polish.css, behind
  // @supports); 'round' leaves corners as they are. corners.js steps aside where it applies.
  v('preset-corner-shape', p.shape.cornerShape ?? 'round');
  v('preset-on-primary', p.onPrimary ? p.onPrimary[mode] : '#ffffff');

  // Fields: outlined on the surface (the default), or filled with no border (fields: 'filled').
  const filled = p.fields === 'filled';
  v('preset-field-bg', filled ? 'var(--color-fill-2)' : 'var(--color-bg-2)');
  v('preset-field-border', filled ? 'transparent' : 'var(--color-border-2)');
  v('preset-field-shadow', filled ? 'none' : 'var(--preset-shadow-sm)');
  v('preset-field-hover-bg', filled ? 'var(--color-fill-3)' : 'var(--color-bg-2)');
  v('preset-field-hover-border', filled ? 'transparent' : 'var(--color-border-3)');
  v('preset-field-focus-bg', filled ? 'var(--color-fill-2)' : 'var(--color-bg-2)');
  v('preset-field-focus-border', filled ? 'transparent' : 'rgb(var(--primary-6))');
  v('preset-field-disabled-bg', 'var(--color-fill-2)'); // Arco's own; filled presets go lighter
  // A preset can set any of these itself: { bg, border, shadow, hoverBg, hoverBorder, focusBg, focusBorder, disabledBg }.
  for (const [k, val] of Object.entries(p.fieldTokens ?? {})) {
    v(`preset-field-${k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}`, typeof val === 'object' ? val[mode] : val);
  }

  // Default (secondary) buttons and weights.
  const sec = p.secondaryButton;
  if (sec) {
    v('color-secondary', sec.bg[mode]);
    v('color-secondary-hover', sec.hover[mode]);
    v('color-secondary-active', sec.active[mode]);
  }
  v('preset-secondary-text', sec ? sec.text[mode] : 'var(--color-text-2)');
  v('preset-secondary-border', sec?.border ? sec.border[mode] : 'transparent');
  const outline = p.outlineButton;
  v('preset-outline-border', outline ? outline.border[mode] : 'var(--color-border-2)');
  v('preset-outline-text', outline ? outline.text[mode] : 'var(--color-text-1)');
  v('preset-outline-hover-border', outline ? outline.border[mode] : 'var(--color-border-3)');
  v('preset-primary-weight', String(p.primaryWeight ?? 500));

  // Headings, the selected item in menus and anchors, alert corners.
  const t = p.type ?? {};
  v('preset-heading-weight', String(t.headingWeight ?? 600));
  v('preset-heading-tracking', t.headingTracking ?? '-0.015em');
  const picked = p.selected;
  v('preset-selected-bg', picked ? picked.bg[mode] : 'var(--color-fill-2)');
  v('preset-selected-text', picked ? picked.text[mode] : 'inherit');
  v('preset-radius-alert', p.shape.alert ?? 'var(--border-radius-medium)');
  // Smaller pieces, where a design system names its own shape (Material: checkbox 2px, chips 8px,
  // tooltips 4px). Without one they keep what they had.
  v('preset-radius-tag', p.shape.tag ?? 'calc(var(--border-radius-small) * 0.75 + 2px)');
  v('preset-radius-tooltip', p.shape.tooltip ?? 'var(--border-radius-medium)');
  v('preset-radius-checkbox', p.shape.checkbox ?? 'var(--border-radius-small)');

  // Interaction model: Material's state layers, ripple and focus ring (interaction-material.css,
  // ripple.js), or none (the polish layer's own hover colours and ring).
  v('preset-ripple', p.interaction === 'material' ? '1' : '0');
  if (p.focusColor) v('preset-focus-color', p.focusColor[mode]);

  // Light mode comes first and dark second; the dark selector is more specific, so it wins
  // over this preset's light block and over Arco's own body[arco-theme='dark'].
  const sel = dark
    ? `body[data-arco-preset='${name}'][arco-theme='dark']`
    : `body[data-arco-preset='${name}']`;
  return `${sel} {\n${lines.join('\n')}\n}\n`;
}

const header = (name) =>
  `/* Arco preset: ${name}. Generated by presets/build.mjs from presets.config.mjs; edit those, not this. */\n`;

const all = [];
for (const [name, p] of Object.entries(presets)) {
  let css = header(name) + block(name, p, 'light') + '\n' + block(name, p, 'dark');
  if (p.interaction) {
    const template = readFileSync(join(here, `interaction-${p.interaction}.css`), 'utf8');
    css += '\n' + template.replaceAll('__P__', `body[data-arco-preset='${name}']`);
  }
  writeFileSync(join(out, `${name}.css`), css);
  all.push(css);
}
const polish = readFileSync(join(here, 'polish.css'), 'utf8');

// The fork's default look: Modern, baked into its Less. Arco's own tokens (colours, greys, ink
// primary, radius) are set in components/style/theme; this file adds Modern's --preset-* values
// and the polish layer, on body by default. The selector weighs the same as a preset's
// (body[data-arco-preset]) and comes first, so a preset still wins; <body data-arco-classic> opts out.
{
  const modern = presets.modern;
  const pick = (mode) =>
    block('modern', modern, mode)
      .split('\n')
      .filter((l) => l.trim().startsWith('--preset-'))
      .join('\n');
  const base = "@{arco-theme-tag}:not([data-arco-classic])";
  const less = [
    '// Modern: the fork\'s default finish. Generated by presets/build.mjs from presets.config.mjs',
    '// (modern) and presets/polish.css; edit those and run `npm --prefix presets run build`.',
    `${base} {`,
    pick('light'),
    '}',
    `${base}[arco-theme='dark'] {`,
    pick('dark'),
    '}',
    '',
    polish.replaceAll('body[data-arco-preset]', base),
  ].join('\n');
  writeFileSync(join(here, '../components/style/theme/modern.less'), less);
}
writeFileSync(join(out, 'all.css'), all.join('\n') + '\n' + polish);
writeFileSync(
  join(out, 'presets.json'),
  JSON.stringify(
    Object.fromEntries(Object.entries(presets).map(([k, p]) => [k, { label: p.label, note: p.note }])),
    null,
    2
  ) + '\n'
);
console.log(`wrote ${Object.keys(presets).length} presets to ${out}`);
