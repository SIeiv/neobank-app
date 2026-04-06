import type { FC } from 'react';
import { Heading, Paragraph } from 'neobank-ui-kit';

import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import { newsMock } from '@/shared/mocks';
import type { ISection } from '@/shared/types';

import { NewsSlider } from '@/widgets/news/ui/news-slider';
import styles from '@/widgets/news/ui/news.module.css';

export const News: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();

  return (
    <section className={styles.container} style={{ marginTop: marginTopSelect(mode, marginTop) }}>
      <div className={styles.text}>
        <Heading level={3}>Current news from the world of finance</Heading>
        <Paragraph weight="semibold">
          We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.
        </Paragraph>
      </div>
      <NewsSlider news={newsMock} />
    </section>
  );
};
