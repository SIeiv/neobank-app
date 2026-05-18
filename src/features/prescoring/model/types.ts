import type { Status, Term } from '@/shared/types';

export interface Field<T> {
  value: T;
  error: string | null;
}

export type FieldInState = Omit<InitialState, 'amount' | 'status' | 'isSended'>;

export interface InitialState {
  status: Status;

  amount: number;

  lastname: Field<string>;
  firstname: Field<string>;
  patronymic: Field<string>;
  term: { value: Term };
  email: Field<string>;
  dateOfBirth: Field<string>;
  passportSeries: Field<string>;
  passportNumber: Field<string>;

  isSended: boolean;
}
