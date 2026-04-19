import type { Status } from '@/shared/types';

export interface CurrencyInitialState {
  lastUpdatedTime: string | null;
  currencies: Currency;
  status: Status;
}

export type Currency = Record<string, CurrencyConversionRates>;

export type CurrencyConversionRates = Record<string, number>;
