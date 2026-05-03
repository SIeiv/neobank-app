import { configureStore } from '@reduxjs/toolkit';

import { currencyReducer } from '@/entities/currency';
import { newsReducer } from '@/entities/news';
import { newsletterSubscribeReducer } from '@/features/newsletter-subscribe';
import { prescoringReducer } from '@/features/prescoring';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    news: newsReducer,
    newsletterSubscribe: newsletterSubscribeReducer,
    prescoring: prescoringReducer,
  },
});
