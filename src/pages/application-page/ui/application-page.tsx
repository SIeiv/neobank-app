import { Navigate, useLocation } from 'react-router-dom';

import { ApplicationRouter } from '@/pages/application-page/routers';
import { ApplicationStage } from '@/shared/types';

export const ApplicationPage = () => {
  const location = useLocation();
  const pageApplicationId = location.pathname.split('/')[3];

  const isPrescoringSended = localStorage.getItem('applicationStage') === ApplicationStage.Sent;
  const applicationId = localStorage.getItem('applicationId');

  if (!isPrescoringSended || pageApplicationId !== applicationId) {
    return <Navigate to="/neobank-app/loan/" replace />;
  }

  return (
    <>
      <ApplicationRouter />
    </>
  );
};
