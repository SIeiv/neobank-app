import { useEffect, useRef, useState, type FC } from 'react';
import { ArrowIcon, Button } from 'neobank-ui-kit';

import type { INews } from '@/shared/types';

import { NewsSliderItem } from '@/widgets/news/ui/news-slider-item';
import styles from '@/widgets/news/ui/news.module.css';

interface INewsSlider {
  news: INews[];
}

export const NewsSlider: FC<INewsSlider> = ({ news }) => {
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
  }, [currentPosition]);

  const updateScroll = (to: 'left' | 'right') => {
    if (!ref.current) {
      return;
    }
    const step = ref.current.clientWidth / 2;
    setCurrentPosition((prev) => (to === 'left' ? prev - step : prev + step));
  };

  return (
    <div className={styles.sliderContainer}>
      <div ref={ref} className={styles.sliderMainArea}>
        {news.map((newsItem, index) => (
          <NewsSliderItem {...newsItem} key={`${newsItem.title}_${newsItem.text}_${index}`} />
        ))}
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
