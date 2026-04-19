import type { FC } from 'react';
import { Paragraph } from 'neobank-ui-kit';

import styles from '@/entities/currency/ui/currency.module.scss';

interface ICurrencyItem {
  currency: string;
  value: number;
}

export const CurrencyView: FC<ICurrencyItem> = ({ currency, value }) => {
  return (
    <div className={styles.currencyItem}>
      <Paragraph style={{ color: '#808080' }} size="large" weight="bold">
        {currency}:
      </Paragraph>
      <Paragraph size="large" weight="bold">
        {value}
      </Paragraph>
    </div>
  );
};
