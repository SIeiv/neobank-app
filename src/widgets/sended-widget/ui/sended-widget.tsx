import type { FC } from 'react';
import { Heading, Paragraph } from 'neobank-ui-kit';

import { useMarginTopSelect } from '@/shared/lib/hooks';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/sended-widget/ui/sended-widget.module.scss';

const SendedWidget: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  return (
    <section style={{ marginTop: selectedmt }} className={styles.container}>
      <Heading level={3} style={{ fontWeight: 700 }}>
        The preliminary decision has been sent to your email.
      </Heading>
      <Paragraph weight="semibold">
        In the letter you can get acquainted with the preliminary decision on the credit card.
      </Paragraph>
    </section>
  );
};

export default SendedWidget;
