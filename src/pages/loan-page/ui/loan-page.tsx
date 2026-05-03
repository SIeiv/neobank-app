import { useRef } from 'react';

import { PrescoringForm } from '@/features/prescoring';
import { LoanRouter } from '@/pages/loan-page/routers';
import { Tabs } from '@/shared/ui/tabs';
import { CreditCardPromo } from '@/widgets/credit-card-promo';
import { Steps } from '@/widgets/steps';

const tabs = [
  { text: 'About card', to: '/neobank-app/loan/' },
  { text: 'Rates and conditions', to: '/neobank-app/loan/rates' },
  { text: 'Cashback', to: '/neobank-app/loan/cashback' },
  { text: 'FAQ', to: '/neobank-app/loan/faq' },
];

export const LoanPage = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CreditCardPromo marginTop={[20, 20, 20]} applyCardScrollToRef={targetRef} />
      <div style={{ marginTop: 36, marginBottom: 40 }}>
        <Tabs links={tabs} />
      </div>
      <LoanRouter />
      <Steps marginTop={[96, 96, 96]} />
      <PrescoringForm marginTop={[44, 44, 44]} applyCardScrollToRef={targetRef} />
    </>
  );
};
