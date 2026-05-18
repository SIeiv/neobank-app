import { useState, type FC } from 'react';
import { Button, Checkbox, Heading, Link, LoadingIcon, Paragraph } from 'neobank-ui-kit';

import { signDocument } from '@/features/sign-document';
import fileImage from '@/shared/assets/icons/File_dock_duotone.svg';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import { Status, type ISection } from '@/shared/types';

import styles from '@/widgets/signing-widget/ui/signing-widget.module.scss';

export const SigningWidget: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.documentSign.status);

  const [isAgree, setIsAgree] = useState(false);

  if (status === Status.Loading) {
    return <LoadingIcon />;
  }

  if (status === Status.Ok) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 136 }}>
        <Heading level={3} style={{ fontWeight: 700 }}>
          Documents have been successfully signed and sent for approval
        </Heading>
        <Paragraph>Within 10 minutes you will be sent a PIN code to your email for confirmation</Paragraph>
      </div>
    );
  }

  return (
    <div style={{ marginTop: selectedmt }}>
      <div className={styles.header}>
        <Heading level={3} style={{ fontWeight: 700, margin: 0 }}>
          Signing of documents
        </Heading>
        <Paragraph weight="semibold" style={{ margin: 0 }}>
          Step 4 of 5
        </Paragraph>
      </div>
      <Paragraph weight="semibold" size="large" style={{ color: '#4F5665', marginTop: 32 }}>
        Information on interest rates under bank deposit agreements with individuals. Center for Corporate Information
        Disclosure. Information of a professional participant in the securities market. Information about persons under
        whose control or significant influence the Partner Banks are. By leaving an application, you agree to the
        processing of personal data, obtaining information, obtaining access to a credit history, using an analogue of a
        handwritten signature, an offer, a policy regarding the processing of personal data, a form of consent to the
        processing of personal data.
      </Paragraph>
      <div className={styles.offer}>
        <img src={fileImage} alt="file image" />
        <Link to="/neobank-app/credit-card-offer.pdf">Information on your card</Link>
      </div>
      <div className={styles.footer}>
        <Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} text="I agree" />
        <Button
          disabled={!isAgree}
          style={{ paddingInline: 60, paddingBlock: 4 }}
          border="flat"
          onClick={() => {
            void dispatch(signDocument());
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
