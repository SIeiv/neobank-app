/* eslint-disable @hh.ru/rules/no-internal-modules */

import { Route, Routes } from 'react-router-dom';

import { LoanPage } from '@/pages/loan-page';
import { MainPage } from '@/pages/main-page';

export const MainRouter = () => {
  return (
    <Routes>
      {/* для gh-pages */}
      <Route path="/neobank-app/" element={<MainPage />} />
      <Route path="/neobank-app/loan/" element={<LoanPage />} />
    </Routes>
  );
};
