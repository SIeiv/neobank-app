import { useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, LoadingIcon, Paragraph } from 'neobank-ui-kit';

import { confirmCode } from '@/features/code-document';
import surpImage from '@/shared/assets/images/SurpriseImage 1.png';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import { Status, type ISection } from '@/shared/types';
import { OTPInput } from '@/shared/ui/otp-input';

import styles from '@/widgets/code-widget/ui/code-widget.module.scss';

const CHARS_COUNT = 4;

export const CodeWidget: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.documentCode.status);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (status !== Status.Loading && value.length === CHARS_COUNT) {
      void dispatch(confirmCode(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, dispatch]);

  if (status === Status.Ok) {
    return (
      <div className={styles.container} style={{ marginTop: 40, textAlign: 'center' }}>
        <img src={surpImage} alt="surprice image" />
        <Heading level={3} style={{ fontWeight: 700, marginBlock: 30 }}>
          Congratulations! You have completed your new credit card.
        </Heading>
        <Paragraph style={{ marginBottom: 30, marginTop: 0 }}>
          Your credit card will arrive soon. Thank you for choosing us!
        </Paragraph>
        <Button onClick={() => navigate('/neobank-app/')}>View other offers of our bank</Button>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ marginTop: selectedmt }}>
      <Heading level={3} style={{ fontWeight: 700, textAlign: 'center' }}>
        Please enter confirmation code
      </Heading>
      {status === Status.Loading ? (
        <LoadingIcon />
      ) : (
        <OTPInput charsCount={CHARS_COUNT} state={value} setter={setValue} />
      )}
      {status === Status.Error && (
        <Paragraph weight="semibold" style={{ color: '#FF5631' }}>
          Invalid confirmation code
        </Paragraph>
      )}
    </div>
  );
};
