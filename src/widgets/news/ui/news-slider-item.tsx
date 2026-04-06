import type { FC } from 'react';
import { Card, Paragraph } from 'neobank-ui-kit';

import type { INews } from '@/shared/types';

export const NewsSliderItem: FC<INews> = ({ img, text, title }) => {
  return (
    <Card style={{ minWidth: 320, height: 448, backgroundColor: 'white' }}>
      <img src={img} alt="news image" />
      <Paragraph>{title}</Paragraph>
      <Paragraph>{text}</Paragraph>
    </Card>
  );
};
