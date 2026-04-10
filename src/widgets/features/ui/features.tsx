import type { FC } from 'react';
import { Heading, Paragraph } from 'neobank-ui-kit';

import managerIcon from '@/shared/assets/images/Illustration 2.png';
import { useScreenMode } from '@/shared/lib/hooks';
import { marginTopSelect } from '@/shared/lib/utilities';
import type { ISection } from '@/shared/types';

import { FeaturesCheck } from '@/widgets/features/ui/features-check';
import styles from '@/widgets/features/ui/features.module.scss';

// TODO set Rubik font
export const Features: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const mode = useScreenMode();

  return (
    <section style={{ marginTop: marginTopSelect(mode, marginTop) }} className={styles.container}>
      <img className={styles.left} src={managerIcon} alt="manager" />
      <div className={styles.right}>
        <Heading style={{ marginBlock: 20 }} level={2}>
          We Provide Many Features You Can Use
        </Heading>
        <Paragraph>
          You can explore the features that we provide with fun and have their own functions each feature
        </Paragraph>
        <div>
          <FeaturesCheck text="Powerfull online protection." />
          <FeaturesCheck text="Cashback without borders." />
          <FeaturesCheck text="Personal design" />
          <FeaturesCheck text="Work anywhere in the world" />
        </div>
      </div>
    </section>
  );
};
