import type { FC } from 'react';
import { Heading } from 'neobank-ui-kit';

import { useMarginTopSelect } from '@/shared/lib/hooks';
import type { ISection } from '@/shared/types';

import { StepItem } from '@/widgets/steps/ui/step-item';
import styles from '@/widgets/steps/ui/steps.module.scss';

export const Steps: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  return (
    <section className={styles.container} style={{ marginTop: selectedmt }}>
      <Heading level={3} className={styles.heading} style={{ fontWeight: 700 }}>
        How to get a card
      </Heading>
      <div className={styles.steps}>
        <StepItem number={1} text="Fill out an online application - you do not need to visit the bank" />
        <StepItem number={2} text="Find out the bank's decision immediately after filling out the application" />
        <StepItem number={3} text="The bank will deliver the card free of charge, wherever convenient, to your city" />
      </div>
    </section>
  );
};
