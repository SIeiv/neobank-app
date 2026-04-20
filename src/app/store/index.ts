import { configureStore } from '@reduxjs/toolkit';

import { currencyReducer } from '@/entities/currency';
import { newsReducer } from '@/entities/news';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
