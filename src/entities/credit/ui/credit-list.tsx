import type { FC } from 'react';

import type { Credit } from '@/entities/credit/model/types';

import { CreditView } from '@/entities/credit/ui/credit';
import styles from '@/entities/credit/ui/credit.module.scss';

interface ICreditList {
  credits: Credit[];
}

export const CreditList: FC<ICreditList> = ({ credits }) => {
  return (
    <div className={styles.creditList}>
      {credits.map((credit) => (
        <CreditView key={`${credit.requestedAmount} ${credit.totalAmount} ${credit.monthlyPayment}`} {...credit} />
      ))}
    </div>
  );
};
