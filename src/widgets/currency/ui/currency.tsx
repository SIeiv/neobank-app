import type { FC } from 'react';
import { Card, Heading, Paragraph } from 'neobank-ui-kit';

import bankImage from '@/shared/assets/images/Group.svg';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import { CurrencyItem } from '@/widgets/currency/ui/currency-item';
import { CurrencyOverlay } from '@/widgets/currency/ui/currency-overlay';
import styles from '@/widgets/currency/ui/currency.module.css';

export const Currency: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();

  return (
    <section className={styles.container} style={{ marginTop: marginTopSelect(mode, marginTop) }}>
      <Card style={{ width: '100%', paddingBottom: 72, backgroundColor: '#F4F4F4E5' }}>
        <div className={styles.header}>
          <Heading style={{ margin: 0 }} level={3}>
            Exchange rate in internet bank
          </Heading>
          <Paragraph weight="semibold">Update every 15 minutes, MSC 09.08.2022</Paragraph>
        </div>
        <Paragraph size="large" weight="semibold">
          Currency
        </Paragraph>
        <div className={styles.main}>
          <div className={styles.currencies}>
            <CurrencyItem currency="USD" value={60.78} />
            <CurrencyItem currency="CNY" value={9.08} />
            <CurrencyItem currency="CHF" value={64.78} />
            <CurrencyItem currency="USD" value={60.78} />
            <CurrencyItem currency="JPY" value={0.46} />
            <CurrencyItem currency="TRY" value={3.39} />
          </div>
          <img className={styles.image} src={bankImage} alt="bank image" />
        </div>
        <CurrencyOverlay />
      </Card>
    </section>
  );
};
