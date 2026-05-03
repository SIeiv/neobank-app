import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { submitPrescoring } from '@/features/prescoring/api';
import { PRESCORING_CONFIG } from '@/features/prescoring/config';
import { applyValidation } from '@/features/prescoring/lib/applyValidation';
import { validateDateOfBirth } from '@/features/prescoring/lib/validateDateOfBirth';
import { validateEmail } from '@/features/prescoring/lib/validateEmail';
import { validateFirstname } from '@/features/prescoring/lib/validateFirstname';
import { validateLastname } from '@/features/prescoring/lib/validateLastname';
import { validatePassportNumber } from '@/features/prescoring/lib/validatePassportNumber';
import { validatePassportSeries } from '@/features/prescoring/lib/validatePassportSeries';
import { validatePatronymic } from '@/features/prescoring/lib/validatePatronymic';
import { Status } from '@/shared/types';

import type { FieldPayload, InitialState } from '@/features/prescoring/model/types';

const initialState: InitialState = {
  status: Status.Idle,

  amount: PRESCORING_CONFIG.AMOUNT.DEFAULT,

  firstname: {
    value: '',
    error: null,
  },
  lastname: {
    value: '',
    error: null,
  },
  patronymic: {
    value: '',
    error: null,
  },
  term: {
    value: '6',
  },
  email: {
    value: '',
    error: null,
  },
  dateOfBirth: {
    value: '',
    error: null,
  },
  passportSeries: {
    value: '',
    error: null,
  },
  passportNumber: {
    value: '',
    error: null,
  },
};

const prescoringSlice = createSlice({
  name: 'prescoring',
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<number>) {
      if (action.payload >= PRESCORING_CONFIG.AMOUNT.MIN && action.payload <= PRESCORING_CONFIG.AMOUNT.MAX) {
        state.amount = action.payload;
      }
    },
    setField(state, action: PayloadAction<FieldPayload>) {
      state[action.payload.fieldName].value = action.payload.value;
    },
    validateFields(state) {
      applyValidation(state, 'lastname', validateLastname);

      applyValidation(state, 'firstname', validateFirstname);

      applyValidation(state, 'patronymic', validatePatronymic);

      applyValidation(state, 'email', validateEmail);

      applyValidation(state, 'dateOfBirth', validateDateOfBirth);

      applyValidation(state, 'passportSeries', validatePassportSeries);

      applyValidation(state, 'passportNumber', validatePassportNumber);
    },
    resetState: () => initialState,
  },

  extraReducers(builder) {
    builder
      .addCase(submitPrescoring.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(submitPrescoring.fulfilled, (state) => {
        state.status = Status.Ok;
      })
      .addCase(submitPrescoring.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export const { setAmount, setField, validateFields, resetState } = prescoringSlice.actions;
export const prescoringReducer = prescoringSlice.reducer;
