import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CardShowcase } from '@/widgets/card-showcase';
import { Currency } from '@/widgets/currency';
import { Features } from '@/widgets/features';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Map } from '@/widgets/map';
import { News } from '@/widgets/news';
import { Newsletter } from '@/widgets/newsletter';

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
          <News marginTop={[48, 48, 48]} />
          <Newsletter marginTop={[64, 64, 64]} />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  </StrictMode>
);
