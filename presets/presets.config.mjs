// Each preset is a set of Arco tokens, written as the CSS variables Arco already reads at runtime.
// Nothing here needs a rebuild of the library: load arco.css, then a preset's CSS, then set
// <body data-arco-preset="name"> (and arco-theme="dark" for dark mode, as Arco does).
//
// primary   a hex colour, run through Arco's own palette generator (@arco-design/color),
//           or { light: [10 hex], dark: [10 hex] } for a neutral primary the generator cannot make
// gray      10 steps, light (1 = lightest) and dark (1 = darkest), as Arco's gray-1..10
// bg        Arco's bg-1..5: page, container, nested container, deeper, popup
// radius    Arco's border-radius-small / medium / large (buttons, inputs and tags use small)
// shape     the finish the polish layer reads: card and popup radius, button radius, shadows, ring,
//           and smoothing (0-1): how far corners.js (Monoco) turns surface corners into squircles;
//           0 leaves plain CSS radius

export const presets = {
  zinc: {
    label: 'Zinc',
    note: 'Neutral and crisp: a near-black primary, zinc greys, outlined fields, thin shadows.',
    font: "'Geist', 'Inter', system-ui, sans-serif",
    primary: {
      light: ['#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#3f3f46', '#18181b', '#27272a', '#09090b', '#09090b', '#09090b'],
      dark: ['#27272a', '#3f3f46', '#52525b', '#71717a', '#d4d4d8', '#fafafa', '#e4e4e7', '#ffffff', '#ffffff', '#ffffff'],
    },
    onPrimary: { light: '#fafafa', dark: '#18181b' },
    gray: {
      light: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#09090b'],
      dark: ['#09090b', '#18181b', '#27272a', '#3f3f46', '#52525b', '#71717a', '#a1a1aa', '#d4d4d8', '#e4e4e7', '#fafafa'],
    },
    bg: {
      light: ['#ffffff', '#ffffff', '#fafafa', '#f4f4f5', '#ffffff'],
      dark: ['#09090b', '#0c0c0e', '#18181b', '#1f1f23', '#111113'],
    },
    radius: ['6px', '8px', '10px'],
    shape: { card: '10px', popup: '8px', button: '6px', shadow: 'soft', ring: 0.18, smoothing: 0.6 },
  },

  indigo: {
    label: 'Indigo',
    note: 'Product-tool calm: indigo on slate, tight corners, a dark mode on near-black.',
    font: "'Inter', system-ui, sans-serif",
    primary: '#5e6ad2',
    gray: {
      light: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'],
      dark: ['#0b0c0f', '#16181d', '#23262d', '#30343d', '#474c57', '#6b7280', '#9ca3af', '#cbd2dc', '#e2e6ec', '#f6f7f9'],
    },
    bg: {
      light: ['#ffffff', '#ffffff', '#f8fafc', '#f1f5f9', '#ffffff'],
      dark: ['#0b0c0f', '#111317', '#16181d', '#1c1f25', '#16181d'],
    },
    radius: ['4px', '6px', '8px'],
    shape: { card: '8px', popup: '6px', button: '4px', shadow: 'soft', ring: 0.22, smoothing: 0.6 },
  },

  ember: {
    label: 'Ember',
    note: 'Warm and friendly: orange on stone, a cream page, squircle cards.',
    font: "'DM Sans', system-ui, sans-serif",
    primary: '#ea580c',
    gray: {
      light: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917'],
      dark: ['#0f0d0c', '#1c1917', '#292524', '#3a3532', '#57534e', '#78716c', '#a8a29e', '#d6d3d1', '#e7e5e4', '#fafaf9'],
    },
    bg: {
      light: ['#fffbf7', '#ffffff', '#faf7f4', '#f5f1ed', '#ffffff'],
      dark: ['#0f0d0c', '#171412', '#1f1b18', '#29241f', '#1f1b18'],
    },
    radius: ['6px', '8px', '12px'],
    shape: { card: '12px', popup: '10px', button: '6px', shadow: 'warm', ring: 0.2, smoothing: 0.8 },
  },

  // Vaadin's Lumo theme, from vaadin-lumo-styles 25.3 (src/props/color.css, style.css,
  // typography.css): its blue, its contrast ramp (hsla shades composited over the base colour),
  // filled fields with a 2px focus ring, primary-coloured text on default buttons, 4px / 8px
  // radius and its own shadows. Arco's controls keep their 32px height and 14px text; Lumo's are
  // 36px and 16px.
  lumo: {
    label: 'Lumo',
    note: "Vaadin's Lumo: blue on a blue-grey contrast ramp, filled fields, small corners.",
    font: "-apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif",
    primary: '#006af5', // hsl(214, 100%, 48%)
    primaryDark: '#0c6ce9', // hsl(214, 90%, 48%)
    link: { light: '#005fdb', dark: '#90bdf9' }, // --lumo-primary-text-color
    palettes: {
      red: { light: '#e21d12', dark: '#e0241a' }, // --lumo-error-color
      green: '#158443', // --lumo-success-color
    },
    // --lumo-contrast-5pct ... 90pct over the base colour, as solid colours.
    gray: {
      light: ['#f3f5f7', '#e8ebef', '#dbdfe5', '#c4cad3', '#a9b1bc', '#8993a1', '#778190', '#616d7c', '#414d5e', '#263445'],
      dark: ['#2c3d52', '#36485f', '#44576f', '#53667f', '#64778f', '#7688a0', '#8899b0', '#a0b0c5', '#bcc8d9', '#d7e0ec'],
    },
    bg: {
      light: ['#ffffff', '#ffffff', '#f3f5f7', '#e8ebef', '#ffffff'],
      dark: ['#233348', '#233348', '#2c3d52', '#36485f', '#2c3d52'], // --lumo-base-color hsl(214, 35%, 21%)
    },
    fields: 'filled',
    secondaryButton: {
      bg: { light: '#f3f5f7', dark: '#2c3d52' }, // --lumo-contrast-5pct
      hover: { light: '#e8ebef', dark: '#36485f' },
      active: { light: '#dbdfe5', dark: '#44576f' },
      text: { light: '#005fdb', dark: '#90bdf9' }, // --lumo-primary-text-color
    },
    primaryWeight: 600,
    radius: ['4px', '4px', '8px'], // --lumo-border-radius-s / -m (0.25em) / -l (0.5em)
    shape: { card: '8px', popup: '4px', button: '4px', shadow: 'lumo', ring: 0.6, ringWidth: 2, smoothing: 0.6 },
  },

  violet: {
    label: 'Violet',
    note: 'Soft and playful: violet on a mauve grey, the smoothest squircles.',
    font: "'Plus Jakarta Sans', system-ui, sans-serif",
    primary: '#7c3aed',
    gray: {
      light: ['#faf9fb', '#f3f1f5', '#e8e5ec', '#d9d5df', '#aaa5b4', '#7c7787', '#5d5866', '#45414d', '#2b2830', '#18161c'],
      dark: ['#121016', '#1c1a21', '#2a2730', '#3a3641', '#524d5a', '#736d7c', '#a29cab', '#cfcad6', '#e6e3ea', '#f8f7fa'],
    },
    bg: {
      light: ['#fcfbfe', '#ffffff', '#f8f6fb', '#f3f0f7', '#ffffff'],
      dark: ['#121016', '#18161d', '#201d26', '#29252f', '#201d26'],
    },
    radius: ['8px', '10px', '14px'],
    shape: { card: '14px', popup: '12px', button: '8px', shadow: 'lifted', ring: 0.22, smoothing: 1 },
  },
};
