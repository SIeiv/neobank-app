import { type FC } from 'react';
import { Paragraph } from 'neobank-ui-kit';

import styles from '@/widgets/currency/ui/currency.module.scss';

interface IOverlay {
  state: boolean;
  handler: (v: boolean) => void;
}

export const CurrencyOverlay: FC<IOverlay> = ({ state, handler }) => {
  const handleOnClick = () => {
    handler(true);
  };

  if (state) {
    return <></>;
  }

  return (
    <button onClick={handleOnClick} className={styles.currencyOverlay}>
      <Paragraph style={{ margin: 32, color: 'white' }} size="large" weight="bold">
        All courses
      </Paragraph>
    </button>
  );
};
