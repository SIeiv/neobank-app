import { createSlice } from '@reduxjs/toolkit';

import { getNewsTopHeadlines } from '@/entities/news/api';
import type { DefaultInitialState } from '@/shared/types';

import type { News } from '@/entities/news/model/types';

const initialState: DefaultInitialState<News[]> = {
  lastUpdatedTime: null,
  data: [],
  status: 'idle',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNewsTopHeadlines.pending, (state) => {
        state.status = 'loading';
        state.data = [];
      })
      .addCase(getNewsTopHeadlines.fulfilled, (state, action) => {
        state.status = 'ok';
        state.data = action.payload.articles;
        state.lastUpdatedTime = new Date().toLocaleString();
      })
      .addCase(getNewsTopHeadlines.rejected, (state) => {
        state.status = 'error';
        state.data = [];
      });
  },
});

// export const {} = currencySlice.actions;
export const newsReducer = newsSlice.reducer;
