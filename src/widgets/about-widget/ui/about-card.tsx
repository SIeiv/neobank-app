import type { FC } from 'react';
import { Card, Heading, Paragraph, type ICard } from 'neobank-ui-kit';

import styles from '@/widgets/about-widget/ui/about-widget.module.scss';

interface IAboutCard extends Omit<ICard, 'children'> {
  icon: string;
  title: string;
  text: string;
}

export const AboutCard: FC<IAboutCard> = ({ icon, text, title, style, ...props }) => {
  return (
    <Card {...props} style={{ height: 236, ...style }}>
      <img src={icon} alt="card icon" className={styles.cardImage} />
      <Heading level={3} style={{ fontWeight: 700 }}>
        {title}
      </Heading>
      <Paragraph weight="semibold">{text}</Paragraph>
    </Card>
  );
};
