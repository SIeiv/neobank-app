import type { EmploymentStatus, Gender, MaritalStatus, Position } from '@/features/scoring/model/types';

export interface SendScoringRequest {
  gender: Gender;
  maritalStatus: MaritalStatus;
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: {
    employmentStatus: EmploymentStatus;
    employerINN: string;
    salary: number | '';
    position: Position;
    workExperienceTotal: number | '';
    workExperienceCurrent: number | '';
  };
  account: string;
}
