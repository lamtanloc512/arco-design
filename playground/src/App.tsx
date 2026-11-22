import { useEffect, useState } from 'react';
import { Radio, Switch, Typography } from '@arco-design/web-react';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { Navbar, Hero, Logos, Features, Stats } from './blocks/marketing';
import { Pricing, Testimonials, Faq, Cta, Footer } from './blocks/conversion';
import { Dashboard, FormShowcase, Login, Overlays } from './blocks/app';
import { Gallery } from './gallery';
import { startCorners } from '../../presets/corners.js';
import { startRipple } from '../../presets/ripple.js';
import { bodyAttributes, presetOptions, readClientState, type PageState } from './state';

export function App({ initial }: { initial: PageState }) {
  // The first render uses the server's state, so hydration matches; the URL and the viewer's
  // theme are read once the page is live.
  const [state, setState] = useState(initial);
  const { preset, dark, view } = state;

  useEffect(() => {
    setState(readClientState(initial));
    // Effects run after hydration, so Monoco never touches server HTML before React has it.
    const stopCorners = startCorners();
    const stopRipple = startRipple();
    return () => {
      stopCorners();
      stopRipple();
    };
  }, []);

  useEffect(() => {
    const b = document.body;
    b.removeAttribute('data-arco-preset');
    b.removeAttribute('arco-theme');
    for (const [k, v] of Object.entries(bodyAttributes(state))) b.setAttribute(k, v);
    const q = new URLSearchParams(location.search);
    q.set('view', view);
    q.set('preset', preset);
    q.set('mode', dark ? 'dark' : 'light');
    try {
      history.replaceState(null, '', `?${q}`);
    } catch {
      // Sandboxed frames (an embedded preview, about:blank) refuse it; the page works without.
    }
  }, [preset, dark, view]);

  const note = presetOptions.find((o) => o.value === preset)?.note;

  return (
    <>
      <div className="pg-switcher">
        <div className="pg-switcher-inner">
          <Radio.Group
            type="button"
            value={view}
            onChange={(v) => setState((s) => ({ ...s, view: v }))}
            options={[
              { label: 'Components', value: 'components' },
              { label: 'Blocks', value: 'blocks' },
            ]}
            aria-label="View"
          />
          <span className="pg-switcher-sep" />
          <Radio.Group
            type="button"
            value={preset}
            onChange={(v) => setState((s) => ({ ...s, preset: v }))}
            options={presetOptions.map((o) => ({ label: o.label, value: o.value }))}
            aria-label="Preset"
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

      {view === 'components' ? <Gallery /> : <Blocks />}
    </>
  );
}

function Blocks() {
  return (
    <>
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
