import { StrictMode, type FC, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

interface IProvider {
  children?: ReactNode | ReactNode[];
}

export const MainProvider: FC<IProvider> = ({ children }) => {
  return (
    <StrictMode>
      <BrowserRouter>{children}</BrowserRouter>
    </StrictMode>
  );
};
