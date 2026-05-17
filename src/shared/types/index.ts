export type ScreenMode = 'desktop' | 'tablet' | 'mobile';

export const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Ok: 'ok',
  Error: 'error',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface ISection {
  marginTop?: [number, number, number];
}

export interface LinkType {
  text: string;
  to: string;
}

export interface DefaultInitialState<T = object> {
  lastUpdatedTime: string | null;
  data: T;
  status: Status;
}

export interface Link {
  text: string;
  to: string;
}

export const Term = {
  '6 month': '6',
  '12 month': '12',
  '18 month': '18',
  '24 month': '24',
} as const;

export type Term = (typeof Term)[keyof typeof Term];

export const ApplicationStage = {
  Presconing: 'presconing',
  Credit: 'credit',
  Sent: 'sent',
};

export type ApplicationStage = (typeof ApplicationStage)[keyof typeof ApplicationStage];

export interface FieldPayload<T> {
  fieldName: keyof T;
  value: string | number;
}

export interface ValidationResult {
  isValid: boolean;
  errorMsg: string;
}
