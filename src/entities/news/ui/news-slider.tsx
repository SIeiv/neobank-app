import { useEffect, useRef, useState, type FC } from 'react';
import { ArrowIcon, Button, LoadingIcon } from 'neobank-ui-kit';

import { NewsView, type News } from '@/entities/news';
import { newsConfig } from '@/entities/news/config';
import type { Status } from '@/shared/types';

import styles from '@/entities/news/ui/news.module.scss';

interface INewsSlider {
  news: News[];
  status: Status;
}

export const NewsSlider: FC<INewsSlider> = ({ news, status }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [leftButtonState, setLeftButtonState] = useState(true);
  const [rightButtonState, setRightButtonState] = useState(false);

  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setLeftButtonState(false);
    setRightButtonState(false);

    ref.current.scrollTo({
      left: currentPosition,
      behavior: 'smooth',
    });

    if (currentPosition <= 0) {
      setLeftButtonState(true);
    }

    if (currentPosition + ref.current.clientWidth >= ref.current.scrollWidth - 1) {
      setRightButtonState(true);
    }
  }, [currentPosition, news]);

  const updateScroll = (to: 'left' | 'right') => {
    if (!ref.current) {
      return;
    }
    const step = newsConfig.style.newsViewWidth + newsConfig.style.sliderGap + newsConfig.sliderScrollIncrementalOffset;
    setCurrentPosition((prev) => (to === 'left' ? prev - step : prev + step));
  };

  return (
    <div className={styles.sliderContainer}>
      <div ref={ref} className={styles.sliderMainArea} style={{ gap: newsConfig.style.sliderGap }}>
        {status === 'ok' ? (
          news.map((newsItem) => <NewsView {...newsItem} key={`${newsItem.title}_${newsItem.content}`} />)
        ) : (
          <div style={{ margin: 'auto' }}>
            <LoadingIcon size={128} />
          </div>
        )}
      </div>
      <div className={styles.sliderControls}>
        <Button
          disabled={leftButtonState}
          border="rounded"
          style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => {
            !leftButtonState && updateScroll('left');
          }}
        >
          <ArrowIcon direction="left" />
        </Button>
        <Button
          disabled={rightButtonState}
          border="rounded"
          style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => {
            !rightButtonState && updateScroll('right');
          }}
        >
          <ArrowIcon direction="right" />
        </Button>
      </div>
    </div>
  );
};
