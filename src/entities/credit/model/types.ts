import type { Term } from '@/shared/types';

export interface Credit {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: Term;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  image?: string;
}
