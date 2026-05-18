import type { FC } from 'react';
import { CheckIcon, ErrorIcon, Paragraph } from 'neobank-ui-kit';

import styles from '@/entities/credit/ui/credit.module.scss';

interface ICreditCondition {
  text: string;
  condition: boolean;
}

export const CreditCondition: FC<ICreditCondition> = ({ text, condition }) => {
  return (
    <div className={styles.creditCondition}>
      <Paragraph style={{ margin: 0 }} weight="semibold">
        {text}
      </Paragraph>
      {condition ? <CheckIcon /> : <ErrorIcon />}
    </div>
  );
};
