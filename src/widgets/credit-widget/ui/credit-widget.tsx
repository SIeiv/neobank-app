import type { FC } from 'react';
import { LoadingIcon } from 'neobank-ui-kit';

import { CreditList } from '@/entities/credit';
import { useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import { Status, type ISection } from '@/shared/types';

export const CreditWidget: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  const { creditList, status } = useAppSelector((state) => state.credit);

  if (status === Status.Loading) {
    return (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <LoadingIcon />
      </div>
    );
  }

  return (
    <section style={{ marginTop: selectedmt }}>
      <CreditList credits={creditList} />
    </section>
  );
};
