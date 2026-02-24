# Arco Project Guide

This guide keeps the project setup stable and documents how to customize theme/components in a token-first way.

## 1. Run the Project

- Recommended runtime: Node.js 18 LTS (`.nvmrc`)
- Package manager: Yarn (project default)

```bash
yarn install
yarn dev:site
```

Bun can run scripts too:

```bash
~/.bun/bin/bun run dev:site
```

## 2. Contribute

1. Read `CONTRIBUTING.md`
2. Run `yarn run init`
3. Start docs/dev site with `yarn dev:site`
4. Validate with `yarn eslint`, `yarn stylelint`, `yarn test`

Storybook uses built outputs (`es` / `dist`) and does not hot-reload token changes from source.

```bash
~/.bun/bin/bun run build:es
~/.bun/bin/bun run build:css
NODE_OPTIONS=--openssl-legacy-provider ~/.bun/bin/bun run demo
```

## 3. Theme Customization (Token First)

Edit tokens first, avoid broad CSS overrides.

- Theme package source: `node_modules/@arco-themes/*`
- Active theme is loaded by webpack plugin from local `@arco-themes` automatically.
  - Override explicitly with env var: `ARCO_THEME=@arco-themes/<your-theme> yarn dev:site`
- Site/Storybook also import `~@active-arco-theme/theme.less` so your package styles are applied directly.

- Global primitives: `components/style/theme/global.less`
- Defaults (font/motion): `components/style/theme/default.less`
- Color palette: `components/style/theme/color/colors.less`
- CSS variable mapping: `components/style/theme/css-variables.less`

Geist font is configured via Vercel Font "Get" (web-project path):

- Font link tags:
  - `site/public/index.ejs`
  - `.storybook/preview-head.html`
  - `https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap`
- Font token: `components/style/theme/default.less`
  - `@font-family: Geist, ...`

Use `modifyVars` in your bundler:

```js
modifyVars: {
  'arcoblue-6': '#0A84FF',
  'green-6': '#30D158',
  'orange-6': '#FF9F0A',
  'red-6': '#FF453A',
  'border-radius-small': '6px',
  'border-radius-medium': '10px',
  'border-radius-large': '14px',
}
```

## 4. Component Customization

Adjust component token files before writing extra styles:

- `components/Button/style/token.less`
- `components/Input/style/token.less`
- `components/Card/style/token.less`
- `components/Modal/style/token.less`
- `components/Tabs/style/token.less`

## 5. Squircle.js (Optional)

Use [squircle.js](https://squircle.js.org/) in app-level UI when you want smoother corners, without inline styles.

```tsx
import { Squircle } from '@squircle-js/react';
import './squircle.css';

export function HeroPanel() {
  return <Squircle className="hero-panel">Hello</Squircle>;
}
```

```css
.hero-panel {
  width: 320px;
  height: 180px;
  border-radius: 28px;
}
```

## 6. Rules

- Do: prefer tokens and `token.less` files
- Do: keep docs/examples in English by default
- Do not: write inline styles in components
- Do not: add large CSS overrides when tokens already solve it
