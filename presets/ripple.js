// Material 3 press ripple for Arco, after @material/web 2.5 (ripple/internal/ripple.js).
//
//   import { startRipple } from 'path/to/presets/ripple.js';
//   useEffect(() => startRipple(), []);   // once, in the app root, after hydration
//
// Acts only while the body's preset sets --preset-ripple: 1 (interaction: 'material'); the
// ::after layer it grows is styled by interaction-material.css. It adds no elements: it sets a
// size variable and a data-md-pressed attribute on the pressed element and animates the
// pseudo-element with the Web Animations API, so React's DOM is left as it is. Safe to import on
// the server; nothing runs until startRipple().
const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

const HOSTS = [
  '.arco-btn:not(.arco-btn-loading):not(.arco-btn-disabled)',
  '.arco-menu-item:not(.arco-menu-disabled)',
  '.arco-menu-inline-header',
  '.arco-menu-pop-header',
  '.arco-dropdown-menu-item:not(.arco-dropdown-menu-item-disabled)',
  '.arco-select-option:not(.arco-select-option-disabled)',
  '.arco-cascader-list-item:not(.arco-cascader-list-item-disabled)',
  '.arco-tabs-header-title:not(.arco-tabs-header-title-disabled)',
  '.arco-pagination-item:not(.arco-pagination-item-prev):not(.arco-pagination-item-next):not(.arco-pagination-item-disabled)',
  '.arco-collapse-item-header:not(.arco-collapse-item-header-disabled)',
  '.arco-anchor-link-title',
  '.arco-tag-checkable',
].join(',');

const presses = new WeakMap(); // element -> { started, animation }

function enabled() {
  return getComputedStyle(document.body).getPropertyValue('--preset-ripple').trim() === '1';
}

function grow(el, event) {
  const { width, height, left, top } = el.getBoundingClientRect();
  const maxDim = Math.max(width, height);
  const softEdge = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
  const initial = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
  const maxRadius = Math.sqrt(width ** 2 + height ** 2) + PADDING;
  const scale = (maxRadius + softEdge) / initial;

  const from = event ? { x: event.clientX - left, y: event.clientY - top } : { x: width / 2, y: height / 2 };
  const start = { x: from.x - initial / 2, y: from.y - initial / 2 };
  const end = { x: (width - initial) / 2, y: (height - initial) / 2 };

  presses.get(el)?.animation?.cancel();
  el.style.setProperty('--md-ripple-size', `${initial}px`);
  el.setAttribute('data-md-pressed', '');
  let animation = null;
  if (el.animate) {
    try {
      animation = el.animate(
        {
          transform: [
            `translate(${start.x}px, ${start.y}px) scale(1)`,
            `translate(${end.x}px, ${end.y}px) scale(${scale})`,
          ],
        },
        { pseudoElement: '::after', duration: PRESS_GROW_MS, easing: EASING_STANDARD, fill: 'forwards' }
      );
    } catch {
      // No pseudo-element animation here: the layer still shows, without the growth.
    }
  }
  presses.set(el, { started: performance.now(), animation });
}

function release(el) {
  const press = presses.get(el);
  if (!press) return;
  presses.delete(el);
  const wait = Math.max(0, MINIMUM_PRESS_MS - (performance.now() - press.started));
  setTimeout(() => {
    if (!presses.has(el)) el.removeAttribute('data-md-pressed'); // fades over 375ms (CSS)
  }, wait);
}

let started = false;
let pressed = null;

const onPointerDown = (e) => {
  if (e.button !== 0 || !(e.target instanceof Element) || !enabled()) return;
  const host = e.target.closest(HOSTS);
  if (!host) return;
  pressed = host;
  grow(host, e);
};
const onPointerEnd = () => {
  if (pressed) release(pressed);
  pressed = null;
};
// Keyboard activation (Enter / Space) fires click with detail 0: ripple from the centre.
const onClick = (e) => {
  if (e.detail !== 0 || !(e.target instanceof Element) || !enabled()) return;
  const host = e.target.closest(HOSTS);
  if (!host) return;
  grow(host, null);
  release(host);
};

/** Starts the ripple (client only, idempotent). Returns a stop function. */
export function startRipple() {
  if (started || typeof document === 'undefined') return stopRipple;
  started = true;
  document.addEventListener('pointerdown', onPointerDown, true);
  for (const t of ['pointerup', 'pointercancel', 'dragstart']) document.addEventListener(t, onPointerEnd, true);
  document.addEventListener('click', onClick, true);
  return stopRipple;
}

export function stopRipple() {
  if (typeof document === 'undefined') return;
  document.removeEventListener('pointerdown', onPointerDown, true);
  for (const t of ['pointerup', 'pointercancel', 'dragstart']) document.removeEventListener(t, onPointerEnd, true);
  document.removeEventListener('click', onClick, true);
  started = false;
}
