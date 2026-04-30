import { useState, type FC } from 'react';
import { Button, Card, Heading, Paragraph, Tooltip } from 'neobank-ui-kit';

import creditCardImage from '@/shared/assets/images/cardImage1 1.png';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import styles from '@/widgets/credit-card-promo/ui/credit-card-promo.module.scss';
import { FeatureItem } from '@/widgets/credit-card-promo/ui/feature-item';

// TOOLTIP РАБОТАЕТ НЕАДЕКВАТНО

export const CreditCardPromo: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();
  const selectedmt = marginTopSelect(mode, marginTop);

  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null);

  const previewImageElement = <img className={styles.preview} src={creditCardImage} alt="credit card preview" />;

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
            <Tooltip open={targetElement}>АЛОООО</Tooltip>
            <FeatureItem
              onPointerEnter={(e) => setTargetElement(e.currentTarget)}
              onPointerLeave={() => setTargetElement(null)}
              mainText="Up to 160 days"
              secondaryText="No percent"
            />
            <FeatureItem
              onPointerEnter={(e) => setTargetElement(e.currentTarget)}
              onPointerLeave={() => setTargetElement(null)}
              mainText="Up to 600 000 ₽"
              secondaryText="Credit limit"
            />
            <FeatureItem
              onPointerEnter={(e) => setTargetElement(e.currentTarget)}
              onPointerLeave={() => setTargetElement(null)}
              mainText="0 ₽"
              secondaryText="Card service is free"
            />
          </div>
          <Button border="flat">Apply for card</Button>
        </div>
      </div>
      {mode === 'desktop' && previewImageElement}
    </Card>
  );
};
