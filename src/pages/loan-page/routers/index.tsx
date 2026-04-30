import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingIcon } from 'neobank-ui-kit';

const AboutWidget = lazy(() => import('@/widgets/about-widget').then((module) => ({ default: module.AboutWidget })));

const CashbackWidget = lazy(() =>
  import('@/widgets/cashback-widget').then((module) => ({ default: module.CashbackWidget }))
);

const FaqWidget = lazy(() => import('@/widgets/faq-widget').then((module) => ({ default: module.FaqWidget })));

const RatesWidget = lazy(() => import('@/widgets/rates-widget').then((module) => ({ default: module.RatesWidget })));

export const LoanRouter = () => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Routes>
        <Route path="/" element={<AboutWidget />} />
        <Route path="cashback/" element={<CashbackWidget />} />
        <Route path="rates/" element={<RatesWidget />} />
        <Route path="faq/" element={<FaqWidget />} />
      </Routes>
    </Suspense>
  );
};
