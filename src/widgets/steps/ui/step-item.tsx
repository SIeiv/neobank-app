import type { FC } from 'react';
import { Paragraph } from 'neobank-ui-kit';

import styles from '@/widgets/steps/ui/steps.module.scss';

interface IStepItem {
  number: number;
  text: string;
}

export const StepItem: FC<IStepItem> = ({ number, text }) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.upper}>
        <div className={styles.number}>
          <Paragraph size="large" weight="bold" style={{ margin: 0 }}>
            {number}
          </Paragraph>
        </div>
        <div className={styles.decorativeLine}></div>
      </div>
      <Paragraph style={{ margin: 0, marginTop: 20 }} className={styles.text} weight="semibold">
        {text}
      </Paragraph>
    </div>
  );
};
