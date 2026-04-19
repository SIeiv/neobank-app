import { createSlice } from '@reduxjs/toolkit';

import { getCurrencyConversion } from '@/entities/currency/api';

import type { CurrencyInitialState } from '@/entities/currency/model/types';

const initialState: CurrencyInitialState = {
  lastUpdatedTime: null,
  currencies: {},
  status: 'idle',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCurrencyConversion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrencyConversion.fulfilled, (state, action) => {
        state.status = 'ok';

        const result = { ...action.payload.conversion_rates };
        delete result[action.payload.base_code];
        state.currencies[action.payload.base_code] = result;

        state.lastUpdatedTime = new Date().toLocaleString();
      })
      .addCase(getCurrencyConversion.rejected, (state) => {
        state.status = 'error';
      });
  },
});

// export const {} = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
