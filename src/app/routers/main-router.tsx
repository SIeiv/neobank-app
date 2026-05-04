import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingIcon } from 'neobank-ui-kit';

const MainPage = lazy(() => import('@/pages/main-page').then((module) => ({ default: module.MainPage })));

const LoanPage = lazy(() => import('@/pages/loan-page').then((module) => ({ default: module.LoanPage })));

export const MainRouter = () => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Routes>
        {/* для gh-pages */}
        <Route path="/neobank-app/" element={<MainPage />} />
        <Route path="/neobank-app/loan/*" element={<LoanPage />} />
      </Routes>
    </Suspense>
  );
};
