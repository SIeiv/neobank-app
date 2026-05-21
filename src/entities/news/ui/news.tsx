import type { FC } from 'react';
import { Card, Paragraph } from 'neobank-ui-kit';

import { newsConfig } from '@/entities/news/config';
import type { News } from '@/entities/news/model/types';
import { cleanText } from '@/shared/lib/utilities';

import styles from '@/entities/news/ui/news.module.scss';

export const NewsView: FC<News> = ({ urlToImage, title, content, url }) => {
  return (
    <a className={styles.link} target="_top" href={url} rel="noopener noreferrer">
      <Card
        style={{
          minWidth: newsConfig.style.newsViewWidth,
          height: 448,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <div className={styles.image} style={{ backgroundImage: `url("${urlToImage}")` }} aria-label="news image"></div>
        <Paragraph className={styles.text} size="large" weight="semibold">
          {title}
        </Paragraph>
        {content && <Paragraph weight="semibold">{cleanText(content)}</Paragraph>}
      </Card>
    </a>
  );
};
