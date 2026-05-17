import type { Credit } from '@/entities/credit/model/types';

export interface SendPrescoringRequest {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  birthdate: string;
  passportSeries: string;
  passportNumber: string;
}

export type SendPrescoringResponse = Credit[];
