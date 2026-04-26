import { createSlice } from '@reduxjs/toolkit';

import { getNewsTopHeadlines } from '@/entities/news/api';
import { Status, type DefaultInitialState } from '@/shared/types';

import type { News } from '@/entities/news/model/types';

const initialState: DefaultInitialState<News[]> = {
  lastUpdatedTime: null,
  data: [],
  status: Status.Idle,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNewsTopHeadlines.pending, (state) => {
        state.status = Status.Loading;
        state.data = [];
      })
      .addCase(getNewsTopHeadlines.fulfilled, (state, action) => {
        state.status = Status.Ok;
        state.data = action.payload.articles;
        state.lastUpdatedTime = new Date().toLocaleString();
      })
      .addCase(getNewsTopHeadlines.rejected, (state) => {
        state.status = Status.Error;
        state.data = [];
      });
  },
});

// export const {} = currencySlice.actions;
export const newsReducer = newsSlice.reducer;
