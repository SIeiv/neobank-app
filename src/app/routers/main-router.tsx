import { Route, Routes } from 'react-router-dom';

// eslint-disable-next-line @hh.ru/rules/no-internal-modules
import { MainPage } from '@/pages/main-page';

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
