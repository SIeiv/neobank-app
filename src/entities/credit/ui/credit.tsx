import type { FC } from 'react';
import { Button, Card, Paragraph } from 'neobank-ui-kit';

import { sendCreditInfo } from '@/entities/credit/api';
import type { Credit } from '@/entities/credit/model/types';
import creditDefaultImage from '@/shared/assets/images/SurpriseImage 1.png';
import { useAppDispatch } from '@/shared/lib/hooks';
import { formatNumber } from '@/shared/lib/utilities/formatNumber';

import { CreditCondition } from '@/entities/credit/ui/credit-condition';
import styles from '@/entities/credit/ui/credit.module.scss';

export const CreditView: FC<Credit> = ({
  isInsuranceEnabled,
  isSalaryClient,
  monthlyPayment,
  rate,
  requestedAmount,
  term,
  totalAmount,
  image,
  applicationId,
}) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    void dispatch(
      sendCreditInfo({
        applicationId,
        isInsuranceEnabled,
        isSalaryClient,
        monthlyPayment,
        rate,
        requestedAmount,
        term: Number(term),
        totalAmount,
      })
    );
  };

  return (
    <Card style={{ backgroundColor: 'white', textAlign: 'center' }}>
      <img className={styles.image} src={image || creditDefaultImage} alt="credit image" />
      <div className={styles.text}>
        <Paragraph weight="semibold" style={{ margin: 0 }}>
          Requested amount: {formatNumber(requestedAmount)} ₽
        </Paragraph>
        <Paragraph weight="semibold" style={{ margin: 0 }}>
          Total amount: {formatNumber(totalAmount)} ₽
        </Paragraph>
        <Paragraph weight="semibold" style={{ margin: 0 }}>
          For {term} months
        </Paragraph>
        <Paragraph weight="semibold" style={{ margin: 0 }}>
          Monthly payment: {formatNumber(monthlyPayment)} ₽
        </Paragraph>
        <Paragraph weight="semibold" style={{ margin: 0 }}>
          Your rate: {rate}%
        </Paragraph>
        <CreditCondition text="Insurance included" condition={isInsuranceEnabled} />
        <CreditCondition text="Salary client" condition={isSalaryClient} />
      </div>
      <Button onClick={handleOnClick} style={{ marginTop: 90, paddingInline: 48 }} border="flat">
        Select
      </Button>
    </Card>
  );
};
