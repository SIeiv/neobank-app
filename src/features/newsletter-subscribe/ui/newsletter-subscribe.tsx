import { useEffect, useRef, useState, type FC, type ReactElement } from 'react';
import { Button, EmailIcon, LoadingIcon, Paragraph, SendIcon } from 'neobank-ui-kit';

import { setEmail } from '@/features/newsletter-subscribe/model/slice';
import { subscribeConfirm } from '@/features/newsletter-subscribe/model/thunk';
import { useAppDispatch, useAppSelector, useScreenMode } from '@/shared/lib/hooks';
import { Status } from '@/shared/types';

import styles from '@/features/newsletter-subscribe/ui/newsletter-subscribe.module.scss';

interface INewsletterInput {
  placeholder?: string;
}

export const NewsletterSubscribe: FC<INewsletterInput> = ({ placeholder }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mode = useScreenMode();

  const [isSended, setIsSended] = useState<boolean>(Boolean(localStorage.getItem('newsletterSubscribe')));

  const dispatch = useAppDispatch();

  const { email, status } = useAppSelector((state) => state.newsletterSubscribe);

  const handleOnSendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    void dispatch(subscribeConfirm());
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  useEffect(() => {
    if (status === Status.Ok && localStorage.getItem('newsletterSubscribe') === 'true') {
      setIsSended(true);
    }
  }, [status]);

  const renderSelector = (): ReactElement => {
    if (status === Status.Loading) {
      return <LoadingIcon />;
    }

    if (isSended) {
      return <Paragraph>You are already subscribed to the bank&apos;s newsletter</Paragraph>;
    }
    return (
      <>
        <EmailIcon />
        <input ref={inputRef} onChange={handleOnInputChange} value={email} type="email" placeholder={placeholder} />
        <Button
          border="rounded"
          style={{ paddingBlock: 0, display: 'flex', alignItems: 'center', height: 45, backgroundColor: '#686DF1' }}
          onClick={handleOnSendClick}
        >
          <div>
            <SendIcon size={30} />
          </div>
          {mode !== 'mobile' && <Paragraph weight="bold">Subscribe</Paragraph>}
        </Button>
      </>
    );
  };

  return (
    <div
      className={styles.customInput}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      {renderSelector()}
    </div>
  );
};
