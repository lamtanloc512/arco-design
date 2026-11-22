// Squircle corners for Arco surfaces, drawn with Monoco (MIT, https://somonoco.com).
//
// A plain CSS radius past a few pixels reads as a pill or a bubble. The presets keep controls on a
// small radius, and surfaces with a larger one (cards, dialogs, popups, alerts, the FAQ) are drawn
// as squircles: the curve starts earlier and flattens out, so a 12px corner looks calm, not round.
//
//   import { startCorners } from 'path/to/presets/corners.js';
//   useEffect(() => startCorners(), []);   // once, in the app's root, after hydration
//
// Safe to import on the server: nothing touches the DOM until startCorners() runs. With SSR, call
// it from an effect (which runs after hydration), never at import time: Monoco writes inline
// styles on server-rendered elements, and React would report them as a hydration mismatch.
//
// It acts only while <body> has data-arco-preset and the preset sets --preset-corner-smoothing
// above 0. Controls (buttons, inputs, switches, radios) are left alone: clip-path would cut their
// focus ring, and their radius is small enough not to need it.
//
// Monoco cannot follow a CSS border or box-shadow, so on each surface the border is redrawn as an
// SVG stroke on the squircle path, and box-shadows become drop-shadow filters with the fill painted
// as SVG. Everything it sets inline is cleared and redrawn when the preset, the theme or the DOM
// changes, so colours follow dark mode. Mirrors auvyx-ui's corners.js.
import { addCorners, unobserve, Squircle } from '@monokai/monoco';

const SURFACES = [
  '.arco-card',
  '.arco-modal',
  '.arco-drawer',
  '.arco-collapse',
  '.arco-alert',
  '.arco-select-popup',
  '.arco-dropdown-menu',
  '.arco-picker-container',
  '.arco-cascader-popup',
  '.arco-tree-select-popup',
  '.arco-popover-content',
  '.arco-popconfirm-content',
  '.arco-message',
  '.arco-notification',
  '[data-corners]',
].join(',');

// Inline styles set on a surface, restored by clear().
const SET = ['clipPath', 'borderColor', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundRepeat', 'boxShadow', 'filter'];
const TRANSPARENT = /^(transparent|rgba\(0, 0, 0, 0\))$/;
const tracked = new Set();

function clear() {
  for (const el of tracked) {
    unobserve(el);
    for (const k of SET) el.style[k] = '';
  }
  tracked.clear();
}

// Split a computed box-shadow into rings (spread only) and drop shadows.
function shadows(value) {
  const ring = [];
  const drop = [];
  if (!value || value === 'none') return { ring, drop };
  for (const layer of value.split(/,(?![^(]*\))/)) {
    const color = layer.match(/^\s*((?:[a-z-]+\([^)]*\))|#\w+|[a-z]+)/i)?.[1] ?? '';
    if (!color || TRANSPARENT.test(color) || layer.includes('inset')) continue;
    const nums = (layer.slice(layer.indexOf(color) + color.length).match(/-?[\d.]+px/g) || []).map(parseFloat);
    const [x = 0, y = 0, blur = 0, spread = 0] = nums;
    if (!x && !y && !blur && spread > 0) ring.push([spread, color]);
    else if (blur || x || y) drop.push(`drop-shadow(${x}px ${y}px ${blur / 2}px ${color})`);
  }
  return { ring, drop };
}

function apply() {
  clear();
  const body = document.body;
  if (!body?.hasAttribute('data-arco-preset')) return;
  const smoothing = parseFloat(getComputedStyle(body).getPropertyValue('--preset-corner-smoothing'));
  if (!(smoothing > 0)) return;

  // Measure every surface first, then write, so no change is measured.
  const jobs = [];
  for (const el of document.querySelectorAll(SURFACES)) {
    const cs = getComputedStyle(el);
    const radius = parseFloat(cs.borderTopLeftRadius);
    if (!radius) continue;
    const width = parseFloat(cs.borderTopWidth);
    const { ring, drop } = shadows(cs.boxShadow);
    const border =
      width && cs.borderTopStyle !== 'none' && !TRANSPARENT.test(cs.borderTopColor) ? [[width, cs.borderTopColor]] : [];
    jobs.push({ el, radius, border: [...border, ...ring], drop, background: cs.backgroundColor });
  }

  for (const { el, radius, border, drop, background } of jobs) {
    const opts = { borderRadius: radius, smoothing, cornerType: Squircle };
    if (border.length) {
      // The CSS border keeps its width for layout; Monoco draws it on the squircle path.
      Object.assign(el.style, {
        borderColor: 'transparent',
        boxShadow: 'none',
        backgroundOrigin: 'border-box',
        backgroundRepeat: 'no-repeat',
      });
      opts.border = border.length === 1 ? border[0] : border;
    }
    if (drop.length) {
      // clip-path would clip the shadow too: paint the fill as SVG and follow it with filters.
      Object.assign(el.style, { backgroundColor: 'transparent', boxShadow: 'none', filter: drop.join(' ') });
      opts.background = TRANSPARENT.test(background) ? undefined : background;
    } else {
      opts.clip = true;
    }
    addCorners(el, opts);
    tracked.add(el);
  }
}

let queued = false;
function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    if (started) apply();
  });
}

let started = false;

// Starts drawing and keeping corners in step. Idempotent; a no-op without a DOM. Returns a stop
// function that disconnects the observers and clears what was drawn.
export function startCorners() {
  if (started || typeof document === 'undefined') return stopCorners;
  started = true;
  schedule();
  // Preset or theme switched: colours and radius change, so redraw.
  const attrs = new MutationObserver(schedule);
  attrs.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-arco-preset', 'arco-theme', 'class', 'style'],
  });
  observers.push(attrs);
  // Popups, dialogs and messages mount into <body> when they open.
  const added = new MutationObserver((records) => {
    if (records.some((r) => [...r.addedNodes].some((n) => n.nodeType === 1))) schedule();
  });
  added.observe(document.body, { childList: true, subtree: true });
  observers.push(added);
  return stopCorners;
}

const observers = [];

export function stopCorners() {
  for (const o of observers.splice(0)) o.disconnect();
  if (typeof document !== 'undefined') clear();
  started = false;
}

export const arcoCorners = { apply, clear };
