import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { validateEmployerINN } from '@/features/scoring/lib/validateEmployerINN';
import { validatePassportIssueBranch } from '@/features/scoring/lib/validatePassportIssueBranch';
import { validateDate } from '@/shared/lib/utilities';
import { applyValidation } from '@/shared/lib/utilities/applyValidation';
import { Status, type FieldPayload } from '@/shared/types';

import { submitScoring } from '@/features/scoring/model/thunk';
import {
  EmploymentStatus,
  Gender,
  MaritalStatus,
  Position,
  type InitialState,
  type Scoring,
} from '@/features/scoring/model/types';

const initialState: InitialState = {
  status: Status.Idle,

  gender: {
    value: Gender.Male,
    error: null,
  },
  maritalStatus: {
    value: MaritalStatus.Married,
    error: null,
  },
  dependentAmount: {
    value: 0,
    error: null,
  },
  passportIssueDate: {
    value: '',
    error: null,
  },
  passportIssueBranch: {
    value: '',
    error: null,
  },

  employmentStatus: {
    value: EmploymentStatus.Unemployed,
    error: null,
  },
  employerINN: {
    value: '',
    error: null,
  },
  salary: {
    value: '',
    error: null,
  },
  position: {
    value: Position.Worker,
    error: null,
  },
  workExperienceTotal: {
    value: '',
    error: null,
  },
  workExperienceCurrent: {
    value: '',
    error: null,
  },
};

const scoringSlice = createSlice({
  name: 'scoring',
  initialState,
  reducers: {
    setField(state, action: PayloadAction<FieldPayload<Scoring>>) {
      state[action.payload.fieldName].value = action.payload.value;
    },

    validateFields(state) {
      applyValidation(state, 'passportIssueDate', validateDate);

      applyValidation(state, 'passportIssueBranch', validatePassportIssueBranch);

      applyValidation(state, 'employerINN', validateEmployerINN);

      state.dependentAmount.error = '';
      state.salary.error = '';
      state.workExperienceTotal.error = '';
      state.workExperienceCurrent.error = '';
    },

    resetState: () => initialState,
  },

  extraReducers(builder) {
    builder
      .addCase(submitScoring.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(submitScoring.fulfilled, (state) => {
        state.status = Status.Ok;
      })
      .addCase(submitScoring.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export const { resetState, setField, validateFields } = scoringSlice.actions;

export const scoringReducer = scoringSlice.reducer;
