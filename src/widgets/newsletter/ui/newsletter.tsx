import type { FC } from 'react';
import { Heading } from 'neobank-ui-kit';

import { NewsletterSubscribe } from '@/features/newsletter-subscribe';
import { useMarginTopSelect } from '@/shared/lib/hooks';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/newsletter/ui/newsletter.module.scss';

export const Newsletter: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  return (
    <section className={styles.container} style={{ marginTop: selectedmt }}>
      <div className={styles.headings}>
        <Heading style={{ color: '#EB801D' }} level={4}>
          Support
        </Heading>
        <Heading style={{ fontWeight: 700 }} level={3}>
          Subscribe Newsletter & get
        </Heading>
        <Heading level={3}>Bank News</Heading>
      </div>

      <NewsletterSubscribe placeholder="Your Email" />
    </section>
  );
};
