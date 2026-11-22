import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { App } from './App';
import type { PageState } from './state';

export function Root({ initial }: { initial: PageState }) {
  return (
    <ConfigProvider locale={enUS}>
      <App initial={initial} />
    </ConfigProvider>
  );
}
