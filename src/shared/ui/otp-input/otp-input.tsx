import { useEffect, type Dispatch, type FC, type SetStateAction } from 'react';
import { Paragraph } from 'neobank-ui-kit';

import styles from '@/shared/ui/otp-input/otp-input.module.scss';

export interface IOTPInput {
  charsCount: number;

  state: string;
  setter: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}

export const OTPInput: FC<IOTPInput> = ({ charsCount, setter, state, disabled }) => {
  const cellElements = [];
  for (let i = 0; i < charsCount; i++) {
    const isFilled = state.length > i;
    cellElements[i] = (
      <div key={i} className={`${styles.cell} ${isFilled ? styles.filled : ''}`}>
        {isFilled ? (
          <Paragraph size="large" weight="bold">
            {state[i]}
          </Paragraph>
        ) : (
          <div className={styles.noChar}></div>
        )}
      </div>
    );
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isDigit = /^\d$/.test(e.key);

      if (!disabled) {
        if (isDigit && state.length < charsCount) {
          setter((prev) => prev + e.key);
        }

        if (e.key === 'Backspace' && state.length) {
          setter((prev) => prev.slice(0, prev.length - 1));
        }
      }
    };

    window.removeEventListener('keydown', handleKeyDown);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.length, charsCount, disabled, setter]);

  return <div className={styles.container}>{cellElements}</div>;
};
