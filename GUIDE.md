# Arco Project Guide

This guide keeps the project setup stable and documents how to customize theme/components in a token-first way.

## 1. Run the Project

- Recommended runtime: Node.js 18 LTS (`.nvmrc`)
- Package manager: Bun

```bash
bun install
bun run dev:site
```

Bun can run scripts too:

```bash
~/.bun/bin/bun run dev:site
```

## 2. Contribute

1. Read `CONTRIBUTING.md`
2. Run `bun run init`
3. Start docs/dev site with `bun run dev:site`
4. Validate with `bun run eslint`, `bun run stylelint`, `bun run test`

Storybook uses built outputs (`es` / `dist`) and does not hot-reload token changes from source.

```bash
~/.bun/bin/bun run build:es
~/.bun/bin/bun run build:css
NODE_OPTIONS=--openssl-legacy-provider ~/.bun/bin/bun run demo
```

## 3. Use This Fork As Your Own Package

Recommended approach: publish under your scope, then alias it back to `@arco-design/web-react` in app projects.
This avoids mass-renaming imports across the codebase.

1. Change root package name in `package.json`:

```json
{
  "name": "@your-scope/web-react"
}
```

2. Build locally:

```bash
bun run build
```

3. Publish:

```bash
PATH="$HOME/.bun/bin:$PATH" bun publish --ignore-scripts --access public
```

4. In your next project, install your package but keep Arco import path:

```bash
bun add @arco-design/web-react@npm:@your-scope/web-react@2.66.10
```

Now your code can keep:

```ts
import { Button } from '@arco-design/web-react';
```

and it will resolve to your forked package.

## 4. Theme Customization (Token First)

Edit tokens first, avoid broad CSS overrides.

- Theme package source: `node_modules/@arco-themes/*`
- Active theme is loaded by webpack plugin from local `@arco-themes` automatically.
  - Override explicitly with env var: `ARCO_THEME=@arco-themes/<your-theme> bun run dev:site`
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

## 5. Component Customization

Adjust component token files before writing extra styles:

- `components/Button/style/token.less`
- `components/Input/style/token.less`
- `components/Card/style/token.less`
- `components/Modal/style/token.less`
- `components/Tabs/style/token.less`

## 6. Squircle.js (Optional)

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

## 7. Rules

- Do: prefer tokens and `token.less` files
- Do: keep docs/examples in English by default
- Do not: write inline styles in components
- Do not: add large CSS overrides when tokens already solve it
