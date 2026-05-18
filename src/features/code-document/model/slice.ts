import { createSlice } from '@reduxjs/toolkit';

import { confirmCode } from '@/features/code-document/api';
import { Status } from '@/shared/types';

const initialState: { status: Status } = {
  status: Status.Idle,
};

const codeDocumentSlice = createSlice({
  name: 'codeDocument',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(confirmCode.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(confirmCode.fulfilled, (state) => {
        state.status = Status.Ok;
      })
      .addCase(confirmCode.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

// export const {} = codeDocumentSlice.actions;

export const codeDocumentReducer = codeDocumentSlice.reducer;
