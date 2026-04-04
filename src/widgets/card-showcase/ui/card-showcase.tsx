import type { FC } from 'react';
import { Button, Heading } from 'neobank-ui-kit';

import cardsPic from '@/shared/assets/images/cards.png';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/card-showcase/ui/card-showcase.module.css';

// TODO style to classname.
export const CardShowcase: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();

  return (
    <section style={{ marginTop: marginTopSelect(mode, marginTop) }} className={styles.container}>
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
