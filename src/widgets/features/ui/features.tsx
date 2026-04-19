import type { FC } from 'react';
import { Heading, Paragraph } from 'neobank-ui-kit';

import managerIcon from '@/shared/assets/images/Illustration 2.png';
import { useMarginTopSelect } from '@/shared/lib/hooks';
import type { ISection } from '@/shared/types';
import { featuresWidgetConfig } from '@/widgets/features/config';

import { FeaturesCheck } from '@/widgets/features/ui/features-check';
import styles from '@/widgets/features/ui/features.module.scss';

export const Features: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  return (
    <section style={{ marginTop: selectedmt }} className={styles.container}>
      <img className={styles.left} src={managerIcon} alt="manager" />
      <div className={styles.right}>
        <Heading style={{ marginBlock: 20 }} level={2}>
          We Provide Many Features You Can Use
        </Heading>
        <Paragraph>
          You can explore the features that we provide with fun and have their own functions each feature
        </Paragraph>
        <div>
          {featuresWidgetConfig.features.map((feature) => (
            <FeaturesCheck key={feature} text={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
