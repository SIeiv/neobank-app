import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Header } from '@/widgets/header';

import '@/app/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="wrapper">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </div>
  </StrictMode>
);
