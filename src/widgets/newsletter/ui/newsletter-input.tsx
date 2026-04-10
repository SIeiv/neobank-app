import { useRef, type FC } from 'react';
import { Button, EmailIcon, Paragraph, SendIcon } from 'neobank-ui-kit';

import { useScreenMode } from '@/shared/lib/hooks';

import styles from '@/widgets/newsletter/ui/newsletter.module.scss';

interface INewsletterInput {
  placeholder?: string;
}

export const NewsletterInput: FC<INewsletterInput> = ({ placeholder }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mode = useScreenMode();

  return (
    <div
      className={styles.customInput}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      <EmailIcon />
      <input ref={inputRef} type="email" placeholder={placeholder} />
      <Button
        border="rounded"
        style={{ paddingBlock: 0, display: 'flex', alignItems: 'center', height: 45, backgroundColor: '#686DF1' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <SendIcon size={30} />
        </div>
        {mode !== 'mobile' && <Paragraph weight="bold">Subscribe</Paragraph>}
      </Button>
    </div>
  );
};
