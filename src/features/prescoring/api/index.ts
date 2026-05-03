import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { isField } from '@/features/prescoring/lib/isField';
import { resetState, validateFields } from '@/features/prescoring/model/slice';
import { apiConfig } from '@/shared/config';
import type { RootState } from '@/shared/store';

import type { SubmitPrescoringRequest } from '@/features/prescoring/api/types';

export const submitPrescoring = createAsyncThunk<void, void, { state: RootState }>(
  'prescoring/submit',
  async (_, { dispatch, getState }) => {
    dispatch(validateFields());

    const { prescoring } = getState();

    let isValid = true;
    Object.values(prescoring).forEach((value) => {
      if (isField(value) && value.error !== '') {
        isValid = false;
      }
    });

    if (isValid) {
      const result = await axios.post(apiConfig.main.baseUrl + apiConfig.main.endpoints.application, {
        amount: prescoring.amount,
        birthdate: prescoring.dateOfBirth.value,
        email: prescoring.email.value,
        firstName: prescoring.firstname.value,
        lastName: prescoring.lastname.value,
        middleName: prescoring.patronymic.value,
        passportNumber: prescoring.passportNumber.value,
        passportSeries: prescoring.passportSeries.value,
        term: Number(prescoring.term.value),
      } satisfies SubmitPrescoringRequest);

      if (result.status === 200) {
        dispatch(resetState());
      }
    }
  }
);
