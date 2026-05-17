import { useEffect, type FC, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Heading, Input, LoadingIcon, Paragraph } from 'neobank-ui-kit';

import { setField } from '@/features/scoring/model/slice';
import { submitScoring } from '@/features/scoring/model/thunk';
import {
  EmploymentStatus,
  EmploymentStatusView,
  Gender,
  MaritalStatus,
  MaritalStatusView,
  Position,
  PositionView,
} from '@/features/scoring/model/types';
import { useAppDispatch, useAppSelector, useMarginTopSelect } from '@/shared/lib/hooks';
import { calcInputState } from '@/shared/lib/utilities/calcInputState';
import { Status, type ISection } from '@/shared/types';
import { SelectWithTitle } from '@/shared/ui/select-with-title';

import styles from '@/features/scoring/ui/scoring-form.module.scss';

export const ScoringForm: FC<ISection> = ({ marginTop = [0, 0, 0] }) => {
  const selectedmt = useMarginTopSelect(marginTop);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    gender,
    dependentAmount,
    employerINN,
    employmentStatus,
    maritalStatus,
    passportIssueBranch,
    passportIssueDate,
    position,
    salary,
    status,
    workExperienceCurrent,
    workExperienceTotal,
  } = useAppSelector((state) => state.scoring);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void dispatch(submitScoring());
  };

  useEffect(() => {
    let timeout: number;
    if (status === Status.Ok) {
      timeout = setTimeout(() => {
        void navigate('/neobank-app/', { replace: true });
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [status, navigate]);

  if (status === Status.Loading) {
    return <LoadingIcon />;
  }

  if (status === Status.Ok) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 136 }}>
        <Heading level={3} style={{ fontWeight: 700 }}>
          Wait for a decision on the application
        </Heading>
        <Paragraph>The answer will come to your mail within 10 minutes</Paragraph>
      </div>
    );
  }

  return (
    <Card style={{ backgroundColor: 'white', width: '100%', marginTop: selectedmt }}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <Heading style={{ fontWeight: 700, margin: 0 }} level={3}>
            Continuation of the application
          </Heading>
          <Paragraph style={{ margin: 0 }} weight="semibold">
            Step 2 of 5
          </Paragraph>
        </div>
        <div className={styles.mainInfo}>
          <div style={{ maxWidth: 'calc(33% - 8px)', width: '100%' }}>
            <SelectWithTitle
              title="What's your gender"
              options={Object.entries(Gender).map(([key, value]) => ({ text: key, value }))}
              value={gender.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'gender', value: e.target.value }));
              }}
            ></SelectWithTitle>
          </div>
          <div style={{ maxWidth: 'calc(33% - 8px)', width: '100%' }}>
            <SelectWithTitle
              title="Your marital status"
              options={Object.values(MaritalStatus).map((value) => ({ text: MaritalStatusView[value], value }))}
              value={maritalStatus.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'maritalStatus', value: e.target.value }));
              }}
            ></SelectWithTitle>
          </div>
          <div style={{ maxWidth: 'calc(33% - 4px)', width: '100%' }}>
            <Input
              title="Your number of dependents"
              type="number"
              value={dependentAmount.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'dependentAmount', value: Number(e.target.value) }));
              }}
              state={calcInputState(dependentAmount)}
              errorMsg={dependentAmount.error ?? ''}
            ></Input>
          </div>

          <div style={{ maxWidth: 'calc(50% - 8px)', width: '100%' }}>
            <Input
              required
              title="Date of issue of the passport"
              type="date"
              placeholder="Select Date and Time"
              value={passportIssueDate.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'passportIssueDate', value: e.target.value }));
              }}
              state={calcInputState(passportIssueDate)}
              errorMsg={passportIssueDate.error ?? ''}
            ></Input>
          </div>
          <div style={{ maxWidth: 'calc(50% - 8px)', width: '100%' }}>
            <Input
              required
              title="Division code"
              placeholder="000-000"
              value={passportIssueBranch.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'passportIssueBranch', value: e.target.value }));
              }}
              state={calcInputState(passportIssueBranch)}
              errorMsg={passportIssueBranch.error ?? ''}
            ></Input>
          </div>
        </div>
        <div className={styles.employment}>
          <Paragraph size="large" style={{ marginBlock: 32 }} weight="bold">
            Employment
          </Paragraph>
          <div className={styles.employmentGrid}>
            <SelectWithTitle
              required
              title="Your employment status"
              options={Object.values(EmploymentStatus).map((value) => ({ text: EmploymentStatusView[value], value }))}
              value={employmentStatus.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'employmentStatus', value: e.target.value }));
              }}
            ></SelectWithTitle>
            <Input
              title="Your employer INN"
              required
              type="number"
              placeholder="000000000000"
              value={employerINN.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'employerINN', value: e.target.value }));
              }}
              state={calcInputState(employerINN)}
              errorMsg={employerINN.error ?? ''}
            ></Input>
            <Input
              title="Your salary"
              required
              type="number"
              placeholder="For example 100 000"
              value={salary.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'salary', value: Number(e.target.value) }));
              }}
              state={calcInputState(salary)}
              errorMsg={salary.error ?? ''}
            ></Input>
            <SelectWithTitle
              title="Your position"
              options={Object.values(Position).map((value) => ({ text: PositionView[value], value }))}
              required
              value={position.value}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'position', value: e.target.value }));
              }}
            ></SelectWithTitle>
            <Input
              title="Your work experience total"
              required
              placeholder="For example 10"
              value={workExperienceTotal.value}
              type="number"
              min={0}
              max={99}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'workExperienceTotal', value: Number(e.target.value) }));
              }}
            ></Input>
            <Input
              title="Your work experience current"
              required
              placeholder="For example 2"
              value={workExperienceCurrent.value}
              type="number"
              min={0}
              max={99}
              onChange={(e) => {
                dispatch(setField({ fieldName: 'workExperienceCurrent', value: Number(e.target.value) }));
              }}
            ></Input>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" style={{ paddingInline: 38 }} border="flat">
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
};
