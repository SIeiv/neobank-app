import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { sendCreditInfo } from '@/entities/credit/api';
import { ApplicationStage, Status } from '@/shared/types';

import type { Credit } from '@/entities/credit/model/types';

const initialState: { status: Status; creditList: Credit[] } = {
  status: localStorage.getItem('applicationStage') === ApplicationStage.Sent ? Status.Ok : Status.Idle,
  creditList: (JSON.parse(localStorage.getItem('credits')!) as Credit[]) ?? [],
};

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    setCreditList(state, action: PayloadAction<Credit[]>) {
      state.creditList = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(sendCreditInfo.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(sendCreditInfo.fulfilled, (state) => {
        state.status = Status.Ok;
      })
      .addCase(sendCreditInfo.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export const { setCreditList, resetState } = creditSlice.actions;
export const creditReducer = creditSlice.reducer;
