import type { FC } from 'react';
import { CheckIcon, Paragraph } from 'neobank-ui-kit';

import styles from '@/widgets/features/ui/features.module.css';

export const FeaturesCheck: FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.check}>
      <CheckIcon />
      <Paragraph size="small">{text}</Paragraph>
    </div>
  );
};
