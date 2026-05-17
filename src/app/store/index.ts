import { configureStore } from '@reduxjs/toolkit';

import { creditReducer } from '@/entities/credit';
import { currencyReducer } from '@/entities/currency';
import { newsReducer } from '@/entities/news';
import { codeDocumentReducer } from '@/features/code-document';
import { newsletterSubscribeReducer } from '@/features/newsletter-subscribe';
import { prescoringReducer } from '@/features/prescoring';
import { scoringReducer } from '@/features/scoring';
import { documentReducer } from '@/features/send-document';
import { documentSignReducer } from '@/features/sign-document';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    news: newsReducer,
    newsletterSubscribe: newsletterSubscribeReducer,
    prescoring: prescoringReducer,
    credit: creditReducer,
    scoring: scoringReducer,
    document: documentReducer,
    documentSign: documentSignReducer,
    documentCode: codeDocumentReducer,
  },
});
