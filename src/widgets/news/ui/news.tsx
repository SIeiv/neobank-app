import { useEffect, type FC } from 'react';
import { Heading, Paragraph } from 'neobank-ui-kit';

import { getNewsTopHeadlines } from '@/entities/news';
import { NewsSlider } from '@/entities/news/ui/news-slider';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import type { ISection } from '@/shared/types';
import { newsWidgetConfig } from '@/widgets/news/config';

import styles from '@/widgets/news/ui/news.module.scss';

export const News: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  const dispatch = useAppDispatch();

  const news = useAppSelector((state) => state.news.data);
  const newsStatus = useAppSelector((state) => state.news.status);

  useEffect(() => {
    void dispatch(getNewsTopHeadlines({ country: 'us', category: 'business', pageSize: 30 }));

    const newsUpdateInterval = setInterval(() => {
      void dispatch(getNewsTopHeadlines({ country: 'us', category: 'business', pageSize: 30 }));
    }, newsWidgetConfig.updateInterval);

    return () => {
      clearInterval(newsUpdateInterval);
    };
  }, [dispatch]);

  return (
    <section className={styles.container} style={{ marginTop: selectedmt }}>
      <div className={styles.text}>
        <Heading level={3}>Current news from the world of finance</Heading>
        <Paragraph weight="semibold">
          We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.
        </Paragraph>
      </div>
      <NewsSlider news={news} status={newsStatus} />
    </section>
  );
};
