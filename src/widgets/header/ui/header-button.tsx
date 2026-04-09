import type { FC, ReactElement } from 'react';
import { Button } from 'neobank-ui-kit';

interface IHeaderButton {
  onClick: () => void;
  icon: ReactElement;
}

export const HeaderButton: FC<IHeaderButton> = ({ icon, onClick }) => {
  return (
    <Button
      style={{
        height: 50,
        width: 50,
        display: 'flex',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      border="rounded"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
