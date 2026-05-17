import { type FC, type RefObject, type SubmitEventHandler } from 'react';
import { Button, Card, Heading, Input, LoadingIcon, Paragraph, Range } from 'neobank-ui-kit';

import { PRESCORING_CONFIG } from '@/features/prescoring/config';
import { setAmount, setField } from '@/features/prescoring/model/slice';
import { submitPrescoring } from '@/features/prescoring/model/thunk';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import { calcInputState } from '@/shared/lib/utilities/calcInputState';
import { Term, type ISection } from '@/shared/types';
import { SelectWithTitle } from '@/shared/ui/select-with-title';

import { AmountInput } from '@/features/prescoring/ui/amount-input';
import styles from '@/features/prescoring/ui/customize-card-form.module.scss';

interface IPrescoringForm extends ISection {
  applyCardScrollToRef: RefObject<HTMLDivElement | null>;
}

export const PrescoringForm: FC<IPrescoringForm> = ({ marginTop = [0, 0, 0], applyCardScrollToRef }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  const dispatch = useAppDispatch();
  const { amount, firstname, lastname, dateOfBirth, email, passportNumber, passportSeries, patronymic, status, term } =
    useAppSelector((state) => state.prescoring);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void dispatch(submitPrescoring());
  };

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Card
          style={{
            marginTop: selectedmt,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingIcon size={64} />
        </Card>
      </div>
    );
  }

  return (
    <div ref={applyCardScrollToRef}>
      <Card style={{ marginTop: selectedmt, backgroundColor: 'white', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div className={styles.upper}>
            <div>
              <div className={styles.header}>
                <Heading style={{ fontWeight: 700, margin: 0 }} level={3}>
                  Customize your card
                </Heading>
                <Paragraph style={{ margin: 0 }} weight="semibold">
                  Step 1 of 5
                </Paragraph>
              </div>
              <div className={styles.rangeContainer}>
                <Paragraph style={{ margin: 0, marginBottom: 20 }} weight="semibold">
                  Select amount
                </Paragraph>
                <Range
                  min={PRESCORING_CONFIG.AMOUNT.MIN}
                  max={PRESCORING_CONFIG.AMOUNT.MAX}
                  customValueState={amount}
                  onChange={(e) => {
                    dispatch(setAmount(Number(e.target.value)));
                  }}
                />
              </div>
            </div>
            <div>
              <Paragraph style={{ margin: 0, marginBottom: 16 }} size="large" weight="bold">
                You have chosen the amount
              </Paragraph>
              <AmountInput
                value={amount}
                type="number"
                onChange={(e) => {
                  dispatch(setAmount(Number(e.target.value)));
                }}
              />
            </div>
          </div>
          <div className={styles.lower}>
            <Paragraph style={{ margin: 0 }} size="large" weight="bold">
              Contact Information
            </Paragraph>
            <div className={styles.gridContainer}>
              <Input
                value={lastname.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'lastname', value: e.target.value }));
                }}
                title="Your last name"
                placeholder="For Example Doe"
                required
                state={calcInputState(lastname)}
                errorMsg={lastname.error ?? ''}
              />
              <Input
                value={firstname.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'firstname', value: e.target.value }));
                }}
                title="Your first name"
                placeholder="For Example Jhon"
                required
                state={calcInputState(firstname)}
                errorMsg={firstname.error ?? ''}
              />
              <Input
                value={patronymic.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'patronymic', value: e.target.value }));
                }}
                title="Your patronymic"
                placeholder="For Example Victorovich"
                state={calcInputState(patronymic)}
                errorMsg={patronymic.error ?? ''}
              />
              <SelectWithTitle
                title="Select term"
                value={term.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'term', value: e.target.value }));
                }}
                options={Object.entries(Term).map(([key, value]) => ({ text: key, value }))}
                required
              />

              <Input
                value={email.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'email', value: e.target.value }));
                }}
                type="email"
                title="Your email"
                placeholder="test@gmail.com"
                required
                state={calcInputState(email)}
                errorMsg={email.error ?? ''}
              />
              <Input
                value={dateOfBirth.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'dateOfBirth', value: e.target.value }));
                }}
                type="date"
                title="Your date of birth"
                placeholder="Select Date and Time"
                required
                state={calcInputState(dateOfBirth)}
                errorMsg={dateOfBirth.error ?? ''}
              />
              <Input
                value={passportSeries.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'passportSeries', value: e.target.value }));
                }}
                title="Your passport series"
                placeholder="0000"
                required
                state={calcInputState(passportSeries)}
                errorMsg={passportSeries.error ?? ''}
              />
              <Input
                value={passportNumber.value}
                onChange={(e) => {
                  dispatch(setField({ fieldName: 'passportNumber', value: e.target.value }));
                }}
                title="Your passport number"
                placeholder="000000"
                required
                state={calcInputState(passportNumber)}
                errorMsg={passportNumber.error ?? ''}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button type="submit" style={{ paddingInline: 38 }} border="flat">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
