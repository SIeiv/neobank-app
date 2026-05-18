import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';

import { apiConfig } from '@/shared/config';
import type { RootState } from '@/shared/store';

import type { SendPrescoringResponse, SendPrescoringRequest } from '@/features/prescoring/api/types';

export const sendPrescoring = createAsyncThunk<
  { data: SendPrescoringResponse; status: number },
  void,
  { state: RootState }
>('prescoring/send', async (_, { getState }) => {
  const { prescoring } = getState();
  const { data, status }: AxiosResponse<SendPrescoringResponse> = await axios.post(
    apiConfig.main.baseUrl + apiConfig.main.endpoints.application,
    {
      amount: prescoring.amount,
      birthdate: prescoring.dateOfBirth.value,
      email: prescoring.email.value,
      firstName: prescoring.firstname.value,
      lastName: prescoring.lastname.value,
      middleName: prescoring.patronymic.value,
      passportNumber: prescoring.passportNumber.value,
      passportSeries: prescoring.passportSeries.value,
      term: Number(prescoring.term.value),
    } satisfies SendPrescoringRequest
  );
  return { data, status };
});
