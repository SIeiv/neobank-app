import { createRoot } from 'react-dom/client';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { MainProvider } from '@/app/providers';
import { MainRouter } from '@/app/routers';
import '@/app/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <MainProvider>
    <Header />
    <main className="main">
      <MainRouter />
    </main>
    <Footer />
  </MainProvider>
);
