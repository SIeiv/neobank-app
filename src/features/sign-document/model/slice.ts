import { createSlice } from '@reduxjs/toolkit';

import { signDocument } from '@/features/sign-document/api';
import { Status } from '@/shared/types';

const initialState: { status: Status } = {
  status: Status.Idle,
};

const documentSignSlice = createSlice({
  name: 'documentSign',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(signDocument.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(signDocument.fulfilled, (state) => {
        state.status = Status.Ok;
      })
      .addCase(signDocument.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

// export const {} = documentSignSlice.actions;

export const documentSignReducer = documentSignSlice.reducer;
