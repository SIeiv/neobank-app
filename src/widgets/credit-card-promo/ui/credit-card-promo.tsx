import { useRef, useState, type FC, type RefObject } from 'react';
import { Button, Card, Heading, Paragraph, Tooltip } from 'neobank-ui-kit';

import creditCardImage from '@/shared/assets/images/cardImage1 1.png';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/credit-card-promo/ui/credit-card-promo.module.scss';
import { FeatureItem } from '@/widgets/credit-card-promo/ui/feature-item';

interface ICreditCardPromo extends ISection {
  applyCardScrollToRef: RefObject<HTMLDivElement | null>;
}

// TOOLTIP РАБОТАЕТ НЕАДЕКВАТНО

export const CreditCardPromo: FC<ICreditCardPromo> = ({ marginTop = [0, 0, 0], applyCardScrollToRef }) => {
  const mode = useScreenMode();
  const selectedmt = marginTopSelect(mode, marginTop);

  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null);
  const tooltipContent = useRef('');

  const previewImageElement = <img className={styles.preview} src={creditCardImage} alt="credit card preview" />;

  const scrollToElement = () => {
    const element = applyCardScrollToRef.current;
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Card className={styles.card} style={{ marginTop: selectedmt, width: '100%', paddingBlock: 48 }}>
      <div className={styles.container}>
        <Heading className={styles.heading} level={1} style={{ color: 'white' }}>
          Platinum digital credit card
        </Heading>
        <div className={styles.content}>
          {mode !== 'desktop' && previewImageElement}
          <Paragraph weight="semibold" style={{ maxWidth: 515 }}>
            Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals and transfers without
            commission and interest.
          </Paragraph>
          <div className={styles.featuresList}>
            <Tooltip open={targetElement}>{tooltipContent.current}</Tooltip>
            <FeatureItem
              onPointerEnter={(e) => {
                setTargetElement(e.currentTarget);
                tooltipContent.current = 'When repaying the full debt up to 160 days.';
              }}
              onPointerLeave={() => setTargetElement(null)}
              mainText="Up to 160 days"
              secondaryText="No percent"
            />
            <FeatureItem
              onPointerEnter={(e) => {
                setTargetElement(e.currentTarget);
                tooltipContent.current = 'Over the limit willaccrue percent.';
              }}
              onPointerLeave={() => setTargetElement(null)}
              mainText="Up to 600 000 ₽"
              secondaryText="Credit limit"
            />
            <FeatureItem
              onPointerEnter={(e) => {
                setTargetElement(e.currentTarget);
                tooltipContent.current = 'Promotion valid until December 31, 2022.';
              }}
              onPointerLeave={() => setTargetElement(null)}
              mainText="0 ₽"
              secondaryText="Card service is free"
            />
          </div>
          <Button border="flat" onClick={scrollToElement}>
            Apply for card
          </Button>
        </div>
      </div>
      {mode === 'desktop' && previewImageElement}
    </Card>
  );
};
