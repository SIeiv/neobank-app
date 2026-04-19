import type { FC } from 'react';

import type { CurrencyConversionRates } from '@/entities/currency/model/types';

import { CurrencyView } from '@/entities/currency/ui/currency';
import styles from '@/entities/currency/ui/currency.module.scss';

interface ICurrencyList {
  currencies: CurrencyConversionRates;
}

export const CurrenciesList: FC<ICurrencyList> = ({ currencies }) => {
  return (
    <div className={styles.currencies}>
      {Object.entries(currencies).map(([key, value]) => (
        <CurrencyView key={`${key}_${value}`} currency={key} value={value} />
      ))}
    </div>
  );
};
