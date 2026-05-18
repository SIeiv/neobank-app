import type { Status } from '@/shared/types';

export type InitialState = {
  status: Status;
} & Fields;

export interface Scoring {
  gender: Gender;
  maritalStatus: MaritalStatus;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: EmploymentStatus;
  employerINN: string;
  salary: number | '';
  position: Position;
  workExperienceTotal: number | '';
  workExperienceCurrent: number | '';
}

export type Fields = {
  [K in keyof Scoring]: { value: Scoring[K]; error: string | null };
};

export const Gender = {
  Male: 'MALE',
  Famale: 'FAMALE',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const MaritalStatus = {
  Married: 'MARRIED',
  Divorsed: 'DIVORCED',
  Single: 'SINGLE',
  WidowOrWidower: 'WIDOW_WIDOWER',
} as const;

export const MaritalStatusView = {
  MARRIED: 'Married',
  DIVORCED: 'Divorced',
  SINGLE: 'Single',
  WIDOW_WIDOWER: 'Widow (widower)',
} as const;

export type MaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus];

export const EmploymentStatus = {
  Unemployed: 'UNEMPLOYED',
  SelfEmployed: 'SELF_EMPLOYED',
  Employed: 'EMPLOYED',
  BusinessOwner: 'BUSINESS_OWNER',
} as const;

export const EmploymentStatusView = {
  UNEMPLOYED: 'Unemployed',
  SELF_EMPLOYED: 'Self employed',
  EMPLOYED: 'Employed',
  BUSINESS_OWNER: 'Business owner',
} as const;

export type EmploymentStatus = (typeof EmploymentStatus)[keyof typeof EmploymentStatus];

export const Position = {
  Worker: 'WORKER',
  MidManager: 'MID_MANAGER',
  TopManager: 'TOP_MANAGER',
  Owner: 'OWNER',
} as const;

export const PositionView = {
  WORKER: 'Worker',
  MID_MANAGER: 'Mid manager',
  TOP_MANAGER: 'Top manager',
  OWNER: 'Owner',
} as const;

export type Position = (typeof Position)[keyof typeof Position];
