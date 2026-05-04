import type { FC, InputHTMLAttributes } from 'react';

import styles from '@/features/prescoring/ui/customize-card-form.module.scss';

export const AmountInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className={styles.amountInput} type="number" {...props} />;
};
