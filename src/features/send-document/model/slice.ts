import { createSlice } from '@reduxjs/toolkit';

import { sendDocument } from '@/features/send-document/api';
import { Status } from '@/shared/types';

const initialState: { status: Status } = {
  status: Status.Idle,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(sendDocument.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(sendDocument.fulfilled, (state) => {
        state.status = Status.Ok;
      })
      .addCase(sendDocument.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

// export const {} = documentSlice.actions;

export const documentReducer = documentSlice.reducer;
