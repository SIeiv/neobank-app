import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingIcon } from 'neobank-ui-kit';

const MainPage = lazy(() => import('@/pages/main-page').then((module) => ({ default: module.MainPage })));

const LoanPage = lazy(() => import('@/pages/loan-page').then((module) => ({ default: module.LoanPage })));

const ApplicationPage = lazy(() =>
  import('@/pages/application-page').then((module) => ({ default: module.ApplicationPage }))
);

const NotFoundPage = lazy(() => import('@/pages/not-found-page').then((module) => ({ default: module.NotFoundPage })));

export const MainRouter = () => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Routes>
        {/* для gh-pages */}
        <Route path="/neobank-app/" element={<MainPage />} />
        <Route path="/neobank-app/loan/" element={<LoanPage />} />
        <Route path="/neobank-app/loan/cashback/" element={<LoanPage />} />
        <Route path="/neobank-app/loan/rates/" element={<LoanPage />} />
        <Route path="/neobank-app/loan/faq/" element={<LoanPage />} />
        <Route path="/neobank-app/loan/*" element={<ApplicationPage />} />
        <Route path="/neobank-app/*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
