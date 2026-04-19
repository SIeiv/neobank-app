import { useState } from 'react';
import { Paragraph } from 'neobank-ui-kit';

import styles from '@/widgets/currency/ui/currency.module.scss';

export const CurrencyOverlay = () => {
  const [isActive, setIsActive] = useState(true);

  const handleOnClick = () => {
    setIsActive(false);
  };

  if (!isActive) {
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
