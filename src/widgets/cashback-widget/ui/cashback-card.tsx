import type { FC } from 'react';
import { Card, Heading, Paragraph, type ICard } from 'neobank-ui-kit';

// import styles from "@/widgets/about-widget/ui/about-widget.module.scss";

interface ICashbackCard extends Omit<ICard, 'children'> {
  title: string;
  text: string;
}

export const CashbackCard: FC<ICashbackCard> = ({ text, title, style, ...props }) => {
  return (
    <Card {...props} style={{ width: 406, height: 163, ...style }}>
      <Paragraph style={{ marginBottom: 22 }} size="small" weight="semibold">
        {text}
      </Paragraph>
      <Heading level={3} style={{ fontWeight: 700, fontSize: 36 }}>
        {title}
      </Heading>
    </Card>
  );
};
