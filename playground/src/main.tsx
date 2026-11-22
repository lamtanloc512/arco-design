// Client entry. With server HTML in #root it hydrates (the SSR path); with an empty #root, as in
// `npm run dev`, it renders from scratch.
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Arco's stylesheet comes from the published package of the same version; presets load after it.
import '@arco-design/web-react/dist/css/arco.css';
import '../../presets/css/all.css';
import './app.css';
import { Root } from './Root';
import { defaultState, normalize, type PageState } from './state';

declare global {
  interface Window {
    __PAGE_STATE__?: Partial<PageState>;
  }
}

const container = document.getElementById('root')!;
const initial = normalize(window.__PAGE_STATE__ ?? defaultState);
const app = (
  <StrictMode>
    <Root initial={initial} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app, {
    onRecoverableError(error) {
      console.error('[hydration]', error);
    },
  });
} else {
  createRoot(container).render(app);
}
