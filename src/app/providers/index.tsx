import { StrictMode, type FC, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/app/store';

interface IProvider {
  children?: ReactNode | ReactNode[];
}

export const MainProvider: FC<IProvider> = ({ children }) => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    </StrictMode>
  );
};
