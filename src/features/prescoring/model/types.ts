import type { Status } from '@/shared/types';

export interface Field {
  value: string;
  error: string | null;
}

export type FieldInState = keyof Omit<InitialState, 'amount' | 'status'>;

export interface FieldPayload {
  fieldName: FieldInState;
  value: string;
}

export interface InitialState {
  status: Status;

  amount: number;

  lastname: Field;
  firstname: Field;
  patronymic: Field;
  term: { value: Term };
  email: Field;
  dateOfBirth: Field;
  passportSeries: Field;
  passportNumber: Field;
}

export const Term = {
  '6 month': '6',
  '12 month': '12',
  '18 month': '18',
  '24 month': '24',
} as const;

export type Term = (typeof Term)[keyof typeof Term];
