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

  // Atlassian Design System. Tokens from @atlaskit/tokens 20.14 (the brand-refresh palette),
  // @atlaskit/button 25.8 and @atlaskit/textfield 11.0: blue #1868DB on its neutral scale,
  // outlined default buttons, white fields with a strong input border and a 2px focus border,
  // 4 / 6 / 8px radius, raised and overlay shadows. The rest after atlassian.design itself: bold,
  // tight headings; the selected item on a pale blue with blue text, its corners a squircle;
  // section messages on 8px corners. Atlassian Sans is not a public web font; Inter is the
  // closest public face.
  atlassian: {
    label: 'Atlassian',
    note: 'After atlassian.design: Atlassian blue, bold tight headings, outlined buttons, pale-blue selection.',
    font: "'Inter', ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
    type: { headingWeight: 700, headingTracking: '-0.02em' },
    selected: {
      bg: { light: '#e9f2fe', dark: '#1c2b42' }, // color.background.selected
      text: { light: '#1868db', dark: '#669df1' }, // color.text.selected
    },
    primary: '#1868db', // color.background.brand.bold
    primaryDark: '#669df1',
    onPrimary: { light: '#ffffff', dark: '#1f1f21' }, // color.text.inverse
    link: { light: '#1868db', dark: '#669df1' }, // color.link
    palettes: {
      red: '#c9372c', // color.background.danger.bold
      green: '#5b7f24', // color.background.success.bold
    },
    gray: {
      // Neutral100 ... Neutral1000
      light: ['#f8f8f8', '#f0f1f2', '#dddee1', '#b7b9be', '#8c8f97', '#7d818a', '#6b6e76', '#505258', '#3b3d42', '#292a2e'],
      // DarkNeutral100 ... 1000, with color.border (12% white) composited at step 3
      dark: ['#1f1f21', '#2b2c2f', '#38393c', '#4b4d51', '#5a5c61', '#63666b', '#7e8188', '#a9abaf', '#bfc1c4', '#cecfd2'],
    },
    bg: {
      // surface, surface.raised, surface.sunken, accent.gray.subtlest, surface.overlay
      light: ['#ffffff', '#ffffff', '#f8f8f8', '#f0f1f2', '#ffffff'],
      dark: ['#1f1f21', '#242528', '#18191a', '#303134', '#2b2c2f'],
    },
    fieldTokens: {
      bg: { light: '#ffffff', dark: '#242528' }, // color.background.input
      border: { light: '#8c8f97', dark: '#7e8188' }, // color.border.input
      shadow: 'none',
      hoverBg: { light: '#f8f8f8', dark: '#2b2c2f' }, // color.background.input.hovered
      hoverBorder: { light: '#8c8f97', dark: '#7e8188' },
      focusBg: { light: '#ffffff', dark: '#242528' },
      focusBorder: { light: '#4688ec', dark: '#8fb8f6' }, // color.border.focused
    },
    secondaryButton: {
      // ADS default button: neutral.subtle, a 1px color.border, text.subtle
      bg: { light: 'transparent', dark: 'transparent' },
      hover: { light: '#0515240f', dark: '#ceced912' },
      active: { light: '#0b120e24', dark: '#e3e4f21f' },
      border: { light: '#0b120e24', dark: '#e3e4f21f' },
      text: { light: '#505258', dark: '#a9abaf' },
    },
    primaryWeight: 500,
    radius: ['4px', '6px', '8px'], // radius.small / medium / large
    shape: {
      card: '8px',
      popup: '6px',
      button: '6px',
      alert: '8px',
      shadow: 'ads',
      // the focused field's 1px border plus a 1px inset ring: 2px of color.border.focused
      ring: { light: 'inset 0 0 0 1px #4688ec', dark: 'inset 0 0 0 1px #8fb8f6' },
      smoothing: 0.6,
    },
  },

  // Material 3, from @material/web 2.5 (tokens v0.192: md-sys-color, md-ref-palette,
  // md-sys-shape, md-ref-typeface; elevation): the baseline scheme (primary #6750A4 on a tinted
  // surface), Roboto, regular-weight headlines, tonal default buttons (secondary-container),
  // outlined buttons and fields on the outline colour with a 2px primary focus, the navigation
  // indicator (secondary-container) for selection, and M3 elevation. Two choices depart from M3
  // on purpose: buttons use corner-small (8px) instead of corner-full pills, and dialogs and popups
  // stop at corner-medium / corner-small instead of 28px, drawn as squircles.
  material: {
    label: 'Material 3',
    note: 'Material 3: ripples, state layers and the growing focus ring; tonal buttons, Roboto, tinted surfaces.',
    // State layers, the press ripple and the focus ring of @material/web (interaction-material.css
    // and ripple.js); focus ring in the secondary colour (secondary40 / secondary80).
    interaction: 'material',
    focusColor: { light: '#625b71', dark: '#ccc2dc' },
    font: "'Roboto', system-ui, sans-serif", // md-ref-typeface brand / plain
    type: { headingWeight: 400, headingTracking: '0' }, // headline styles are regular weight
    primary: '#6750a4', // primary40
    primaryDark: '#d0bcff', // primary80
    onPrimary: { light: '#ffffff', dark: '#381e72' }, // on-primary: primary100 / primary20
    link: { light: '#6750a4', dark: '#d0bcff' },
    palettes: { red: { light: '#b3261e', dark: '#e46962' } }, // error40; error60 in dark, readable on the dark surface
    gray: {
      // surface-container-low, -high, outline-variant, nv70, outline (light and dark), nv40,
      // on-surface-variant, neutral20, on-surface
      light: ['#f7f2fa', '#ece6f0', '#cac4d0', '#aea9b4', '#938f99', '#79747e', '#605d66', '#49454f', '#322f35', '#1d1b20'],
      dark: ['#211f26', '#36343b', '#49454f', '#605d66', '#79747e', '#86828c', '#938f99', '#cac4d0', '#e7e0ec', '#e6e0e9'],
    },
    bg: {
      // surface, surface-container-low (cards), surface-container, -high, menus (surface-container)
      light: ['#fef7ff', '#f7f2fa', '#f3edf7', '#ece6f0', '#f3edf7'],
      dark: ['#141218', '#1d1b20', '#211f26', '#2b2930', '#211f26'],
    },
    fieldTokens: {
      // outlined text field
      bg: 'transparent',
      border: { light: '#79747e', dark: '#938f99' }, // outline
      shadow: 'none',
      hoverBg: 'transparent',
      hoverBorder: { light: '#1d1b20', dark: '#e6e0e9' }, // on-surface
      focusBg: 'transparent',
      focusBorder: { light: '#6750a4', dark: '#d0bcff' }, // primary
    },
    secondaryButton: {
      // filled tonal button: secondary-container / on-secondary-container
      bg: { light: '#e8def8', dark: '#4a4458' },
      // no colour change on hover or press: the state layer and ripple show it
      hover: { light: '#e8def8', dark: '#4a4458' },
      active: { light: '#e8def8', dark: '#4a4458' },
      text: { light: '#1d192b', dark: '#e8def8' },
    },
    outlineButton: {
      border: { light: '#79747e', dark: '#938f99' }, // outline
      text: { light: '#6750a4', dark: '#d0bcff' }, // primary
    },
    selected: {
      bg: { light: '#e8def8', dark: '#4a4458' }, // secondary-container (navigation indicator)
      text: { light: '#1d192b', dark: '#e8def8' },
    },
    primaryWeight: 500,
    radius: ['4px', '8px', '12px'], // corner-extra-small / small / medium
    shape: {
      card: '12px', // corner-medium
      popup: '8px',
      button: '8px', // corner-small, in place of corner-full
      alert: '12px',
      shadow: 'm3',
      ring: { light: 'inset 0 0 0 1px #6750a4', dark: 'inset 0 0 0 1px #d0bcff' }, // 2px focused outline
      smoothing: 0.8,
    },
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
