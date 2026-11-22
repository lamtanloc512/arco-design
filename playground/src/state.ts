import presetInfo from '../../presets/css/presets.json';

export type PresetName = 'arco' | keyof typeof presetInfo;
export type View = 'components' | 'blocks';
export interface PageState {
  preset: PresetName;
  dark: boolean;
  view: View;
}

export const presetOptions: { value: PresetName; label: string; note: string }[] = [
  { value: 'arco', label: 'Arco', note: "The fork's own stylesheet, no preset: Modern is its default look." },
  // Modern is the fork's default now, so it is the "Arco" entry above, not a preset of its own here.
  ...Object.entries(presetInfo)
    .filter(([value]) => value !== 'modern')
    .map(([value, p]) => ({ value: value as PresetName, ...p })),
];

export const defaultState: PageState = { preset: 'arco', dark: false, view: 'components' };

export function normalize(s: Partial<Record<keyof PageState, unknown>>): PageState {
  const preset = presetOptions.some((o) => o.value === s.preset) ? (s.preset as PresetName) : defaultState.preset;
  const view = s.view === 'blocks' || s.view === 'components' ? s.view : defaultState.view;
  return { preset, dark: s.dark === true, view };
}

// The attributes <body> carries for a state. The server writes them into the HTML, so the first
// paint already has the preset and theme; the client keeps them in step afterwards.
export function bodyAttributes(s: PageState): Record<string, string> {
  const attrs: Record<string, string> = {};
  if (s.preset !== 'arco') attrs['data-arco-preset'] = s.preset;
  if (s.dark) attrs['arco-theme'] = 'dark';
  return attrs;
}

// Client only: what the URL or the viewer's theme asks for. Read after hydration, never during
// render, so the first client render matches the server's HTML.
export function readClientState(fallback: PageState): PageState {
  const q = new URLSearchParams(location.search);
  const mode = q.get('mode');
  const forced = document.documentElement.getAttribute('data-theme');
  const dark = mode
    ? mode === 'dark'
    : forced
      ? forced === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
  return normalize({ preset: q.get('preset') ?? fallback.preset, view: q.get('view') ?? fallback.view, dark });
}
