import type { FC } from 'react';
import { Heading } from 'neobank-ui-kit';

import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import { NewsletterInput } from '@/widgets/newsletter/ui/newsletter-input';
import styles from '@/widgets/newsletter/ui/newsletter.module.scss';

export const Newsletter: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();
  return (
    <section className={styles.container} style={{ marginTop: marginTopSelect(mode, marginTop) }}>
      <div className={styles.headings}>
        <Heading style={{ color: '#EB801D' }} level={4}>
          Support
        </Heading>
        <Heading style={{ fontWeight: 700 }} level={3}>
          Subscribe Newsletter & get
        </Heading>
        <Heading level={3}>Bank News</Heading>
      </div>

      <NewsletterInput placeholder="Your Email" />
    </section>
  );
};
