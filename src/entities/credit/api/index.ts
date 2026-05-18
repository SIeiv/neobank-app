import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';
import { ApplicationStage } from '@/shared/types';

import type { SetCreditInfoRequest } from '@/entities/credit/api/types';

export const sendCreditInfo = createAsyncThunk('credit/sendCreditInfo', async (params: SetCreditInfoRequest) => {
  const result = await axios.post(apiConfig.main.baseUrl + apiConfig.main.endpoints.credit, {
    ...params,
  });

  if (result.status === 200) {
    localStorage.setItem('applicationStage', ApplicationStage.Sent);
    localStorage.setItem('applicationId', params.applicationId.toString());
  }
});
