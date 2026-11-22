import { useEffect, useState } from 'react';
import { Radio, Switch, Typography } from '@arco-design/web-react';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import presetInfo from '../../presets/css/presets.json';
import { Navbar, Hero, Logos, Features, Stats } from './blocks/marketing';
import { Pricing, Testimonials, Faq, Cta, Footer } from './blocks/conversion';
import { Dashboard, FormShowcase, Login, Overlays } from './blocks/app';

type PresetName = 'arco' | keyof typeof presetInfo;

const options: { value: PresetName; label: string; note: string }[] = [
  { value: 'arco', label: 'Arco', note: 'Arco as it ships: no preset, for comparison.' },
  ...Object.entries(presetInfo).map(([value, p]) => ({ value: value as PresetName, ...p })),
];

function readUrl() {
  const q = new URLSearchParams(location.search);
  const preset = (q.get('preset') as PresetName) || 'zinc';
  const mode = q.get('mode');
  const forced = document.documentElement.getAttribute('data-theme');
  const dark = mode
    ? mode === 'dark'
    : forced
      ? forced === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
  return { preset: options.some((o) => o.value === preset) ? preset : 'zinc', dark };
}

export function App() {
  const [{ preset, dark }, setState] = useState(readUrl);

  useEffect(() => {
    const b = document.body;
    if (preset === 'arco') b.removeAttribute('data-arco-preset');
    else b.setAttribute('data-arco-preset', preset);
    if (dark) b.setAttribute('arco-theme', 'dark');
    else b.removeAttribute('arco-theme');
    const q = new URLSearchParams(location.search);
    q.set('preset', preset);
    q.set('mode', dark ? 'dark' : 'light');
    history.replaceState(null, '', `?${q}`);
  }, [preset, dark]);

  const note = options.find((o) => o.value === preset)?.note;

  return (
    <>
      <div className="pg-switcher">
        <div className="pg-switcher-inner">
          <Typography.Text bold className="pg-switcher-title">
            Arco presets
          </Typography.Text>
          <Radio.Group
            type="button"
            value={preset}
            onChange={(v) => setState((s) => ({ ...s, preset: v }))}
            options={options.map((o) => ({ label: o.label, value: o.value }))}
          />
          <Switch
            checked={dark}
            onChange={(v) => setState((s) => ({ ...s, dark: v }))}
            checkedIcon={<IconMoonFill />}
            uncheckedIcon={<IconSunFill />}
            aria-label="Dark mode"
          />
          <Typography.Text type="secondary" className="pg-switcher-note">
            {note}
          </Typography.Text>
        </div>
      </div>

      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Features />
        <Stats />
        <section className="pg-section pg-muted" id="product">
          <div className="pg-container">
            <div className="pg-heading">
              <Typography.Title heading={2}>The app, in the same components</Typography.Title>
              <Typography.Paragraph type="secondary">
                Tables, tabs, forms and overlays: the screens a product is made of.
              </Typography.Paragraph>
            </div>
            <Dashboard />
            <div className="pg-grid-2 pg-mt">
              <FormShowcase />
              <div className="pg-stack">
                <Login />
                <Overlays />
              </div>
            </div>
          </div>
        </section>
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
