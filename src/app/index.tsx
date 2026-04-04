import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CardShowcase } from '@/widgets/card-showcase';
import { Header } from '@/widgets/header';

import '@/app/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <main className="main">
          <CardShowcase />
        </main>
      </BrowserRouter>
    </div>
  </StrictMode>
);
