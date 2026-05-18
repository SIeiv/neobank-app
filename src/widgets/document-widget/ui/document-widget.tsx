import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Dialog, Heading, LoadingIcon, Paragraph, Table } from 'neobank-ui-kit';

import { resetState as resetCredit } from '@/entities/credit';
import { resetState as resetPrescoring } from '@/features/prescoring';
import { sendDocument } from '@/features/send-document';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import { ApplicationStage, Status, type ISection } from '@/shared/types';
import { TableMock } from '@/widgets/document-widget/mock';

import styles from '@/widgets/document-widget/ui/document-widget.module.scss';

export const DocumentWidget: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isAgree, setIsAgree] = useState(false);

  const [isDenyInitActive, setIsDenyInitActive] = useState(false);
  const [isDeniedActive, setIsDeniedActive] = useState(false);

  const status = useAppSelector((state) => state.document.status);

  if (status === Status.Loading) {
    return <LoadingIcon />;
  }

  if (status === Status.Ok) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 136 }}>
        <Heading level={3} style={{ fontWeight: 700 }}>
          Documents are formed
        </Heading>
        <Paragraph>Documents for signing will be sent to your email</Paragraph>
      </div>
    );
  }

  return (
    <div>
      <Dialog header="Deny application" activeState={isDenyInitActive} setter={setIsDenyInitActive}>
        <Paragraph style={{ marginTop: 16, marginBottom: 35 }} weight="semibold">
          You exactly sure, you want to cancel this application?
        </Paragraph>
        <div className={styles.dialog1Footer}>
          <Button
            border="flat"
            style={{ backgroundColor: '#D93737CC', paddingInline: 28, paddingBlock: 12 }}
            onClick={() => {
              setIsDenyInitActive(false);
              setIsDeniedActive(true);
              localStorage.setItem('applicationStage', ApplicationStage.Presconing);
              localStorage.setItem('applicationId', '');
              localStorage.setItem('credit', '');
              dispatch(resetCredit());
              dispatch(resetPrescoring());
            }}
          >
            Deny
          </Button>
          <Button
            disabled={!isAgree}
            border="flat"
            style={{ paddingInline: 28, paddingBlock: 12 }}
            onClick={() => {
              setIsDenyInitActive(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>

      <Dialog header="Deny application" activeState={isDeniedActive} setter={setIsDeniedActive}>
        <Paragraph style={{ marginTop: 16, marginBottom: 35 }} weight="semibold">
          Your application has been deny!
        </Paragraph>
        <div className={styles.dialog1Footer}>
          <Button
            disabled={!isAgree}
            border="flat"
            style={{ paddingInline: 28, paddingBlock: 12 }}
            onClick={() => {
              void navigate('/neobank-app/', { replace: true });
            }}
          >
            Go home
          </Button>
        </div>
      </Dialog>

      <Card style={{ backgroundColor: 'white', width: '100%', marginTop: selectedmt }}>
        <div className={styles.header}>
          <Heading level={3} style={{ fontWeight: 700, margin: 0 }}>
            Payment Schedule
          </Heading>
          <Paragraph weight="semibold" style={{ margin: 0 }}>
            Step 3 of 5
          </Paragraph>
        </div>
        <div className={styles.table}>
          <Table {...TableMock} />
        </div>
        <div className={styles.footer}>
          <Button
            border="flat"
            style={{ backgroundColor: '#D93737CC', paddingInline: 28, paddingBlock: 12 }}
            onClick={() => {
              setIsDenyInitActive(true);
            }}
          >
            Deny
          </Button>
          <div className={styles.send}>
            <Checkbox
              checked={isAgree}
              onChange={(e) => setIsAgree(e.target.checked)}
              text="I agree with the payment schedule"
            />
            <Button
              disabled={!isAgree}
              border="flat"
              style={{ paddingInline: 28, paddingBlock: 12 }}
              onClick={() => {
                void dispatch(sendDocument());
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
