import { Button, Heading } from 'neobank-ui-kit';

import cardsPic from '@/shared/assets/images/cards.png';
import { useScreenMode } from '@/shared/lib/hooks';

import styles from '@/widgets/card-showcase/ui/card-showcase.module.css';

// TODO style to classname.
export const CardShowcase = () => {
  const mode = useScreenMode();

  return (
    <section className={styles.container}>
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
