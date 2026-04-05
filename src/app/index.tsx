import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CardShowcase } from '@/widgets/card-showcase';
import { Currency } from '@/widgets/currency/ui/currency';
import { Features } from '@/widgets/features';
import { Header } from '@/widgets/header';
import { Map } from '@/widgets/map';

import '@/app/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <main className="main">
          <CardShowcase marginTop={[132, 96, 96]} />
          <Features marginTop={[112, 112, 96]} />
          <Currency marginTop={[48, 48, 48]} />
          <Map marginTop={[48, 48, 48]} />
        </main>
      </BrowserRouter>
    </div>
  </StrictMode>
);
