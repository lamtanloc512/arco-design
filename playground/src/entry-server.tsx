// Server entry: renders the page to HTML with renderToString. Nothing here may touch window or
// document; corners.js (Monoco) is client-only and is not imported.
import { renderToString } from 'react-dom/server';
import { Root } from './Root';
import { bodyAttributes, normalize, type PageState } from './state';

export function render(input: Partial<PageState>) {
  const state = normalize(input);
  const html = renderToString(<Root initial={state} />);
  return { html, state, bodyAttributes: bodyAttributes(state) };
}
