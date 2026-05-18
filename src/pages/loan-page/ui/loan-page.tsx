import { useRef } from 'react';

import { PrescoringForm } from '@/features/prescoring';
import { LoanRouter } from '@/pages/loan-page/routers';
import { useAppSelector } from '@/shared/lib/hooks';
import { Status } from '@/shared/types';
import { Tabs } from '@/shared/ui/tabs';
import { CreditCardPromo } from '@/widgets/credit-card-promo';
import { CreditWidget } from '@/widgets/credit-widget';
import SendedWidget from '@/widgets/sended-widget/ui/sended-widget';
import { Steps } from '@/widgets/steps';

const tabs = [
  { text: 'About card', to: '/neobank-app/loan/' },
  { text: 'Rates and conditions', to: '/neobank-app/loan/rates' },
  { text: 'Cashback', to: '/neobank-app/loan/cashback' },
  { text: 'FAQ', to: '/neobank-app/loan/faq' },
];

export const LoanPage = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const isPrescoringSended = useAppSelector((state) => state.prescoring.isSended);
  const creditStatus = useAppSelector((state) => state.credit.status);

  const applicationWidgetSelector = () => {
    if (creditStatus === Status.Ok) {
      return <SendedWidget marginTop={[44, 44, 44]} />;
    }

    if (isPrescoringSended) {
      return <CreditWidget marginTop={[44, 44, 44]} />;
    }
    return <PrescoringForm marginTop={[44, 44, 44]} applyCardScrollToRef={targetRef} />;
  };

  return (
    <>
      <CreditCardPromo marginTop={[20, 20, 20]} applyCardScrollToRef={targetRef} />
      <div style={{ marginTop: 36, marginBottom: 40 }}>
        <Tabs links={tabs} />
      </div>
      <LoanRouter />
      <Steps marginTop={[96, 96, 96]} />
      {applicationWidgetSelector()}
    </>
  );
};
