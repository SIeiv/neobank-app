import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';

import { apiConfig } from '@/shared/config';
import type { RootState } from '@/shared/store';

import type { SendScoringRequest } from '@/features/scoring/api/types';

export const sendScoring = createAsyncThunk<{ data: SendScoringRequest; status: number }, void, { state: RootState }>(
  'scoring/send',
  async (_, { getState }) => {
    const { scoring } = getState();
    const { data, status }: AxiosResponse<SendScoringRequest> = await axios.put(
      `${apiConfig.main.baseUrl + apiConfig.main.endpoints.scoring}/${localStorage.getItem('applicationId') ?? ''}`,
      {
        account: '11223344556677889900',
        dependentAmount: scoring.dependentAmount.value,
        employment: {
          employerINN: scoring.employerINN.value,
          employmentStatus: scoring.employmentStatus.value,
          position: scoring.position.value,
          salary: scoring.salary.value,
          workExperienceCurrent: scoring.workExperienceCurrent.value,
          workExperienceTotal: scoring.workExperienceTotal.value,
        },
        gender: scoring.gender.value,
        maritalStatus: scoring.maritalStatus.value,
        passportIssueBranch: scoring.passportIssueBranch.value,
        passportIssueDate: scoring.passportIssueDate.value,
      } satisfies SendScoringRequest
    );
    return { data, status };
  }
);
