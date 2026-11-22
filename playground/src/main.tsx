import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import '@arco-design/web-react/dist/css/arco.css';
import '../../presets/css/all.css';
import '../../presets/corners.js';
import './app.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
