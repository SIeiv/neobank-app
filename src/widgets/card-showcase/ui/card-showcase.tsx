import type { FC } from 'react';
import { Button, Heading } from 'neobank-ui-kit';

import cardsPic from '@/shared/assets/images/cards.png';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/card-showcase/ui/card-showcase.module.scss';

export const CardShowcase: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();
  const selectedmt = marginTopSelect(mode, marginTop);

  return (
    <section style={{ marginTop: selectedmt }} className={styles.container}>
      <div className={styles.left}>
        <Heading style={{ maxWidth: 609, margin: 0, marginBottom: 36 }} level={mode === 'mobile' ? 2 : 1}>
          Choose the design you like and apply for card right now
        </Heading>
        <Button>Choose the card</Button>
      </div>
      <img className={styles.right} src={cardsPic} alt="cards design" />
    </section>
  );
};
