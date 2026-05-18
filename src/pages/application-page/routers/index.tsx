import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingIcon } from 'neobank-ui-kit';

const ScoringForm = lazy(() => import('@/features/scoring').then((module) => ({ default: module.ScoringForm })));

const DocumentWidget = lazy(() =>
  import('@/widgets/document-widget').then((module) => ({ default: module.DocumentWidget }))
);

const SigningWidget = lazy(() =>
  import('@/widgets/signing-widget').then((module) => ({ default: module.SigningWidget }))
);

const CodeWidget = lazy(() => import('@/widgets/code-widget').then((module) => ({ default: module.CodeWidget })));

export const ApplicationRouter = () => {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Routes>
        <Route path=":applicationId/document/sign" element={<SigningWidget marginTop={[104, 104, 104]} />} />
        <Route path=":applicationId/document" element={<DocumentWidget marginTop={[24, 24, 24]} />} />
        <Route path=":applicationId/code" element={<CodeWidget marginTop={[104, 104, 104]} />} />
        <Route path=":applicationId" element={<ScoringForm marginTop={[24, 24, 24]} />} />
      </Routes>
    </Suspense>
  );
};
