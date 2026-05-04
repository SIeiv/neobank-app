import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { subscribe } from '@/features/newsletter-subscribe/api';
import { Status } from '@/shared/types';

const initialState: { status: Status; email: string } = {
  status: Status.Idle,
  email: '',
};

const newsletterSubscribeSlice = createSlice({
  name: 'newsletterSubscribe',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(subscribe.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.status = Status.Ok;
        localStorage.setItem('newsletterSubscribe', 'true');
      })
      .addCase(subscribe.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export const { setEmail } = newsletterSubscribeSlice.actions;
export const newsletterSubscribeReducer = newsletterSubscribeSlice.reducer;
