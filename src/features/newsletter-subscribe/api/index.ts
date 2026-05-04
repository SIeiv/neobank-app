import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';

import type { SubscribeRequest } from '@/features/newsletter-subscribe/api/types';

export const subscribe = createAsyncThunk('newsletterSubscribe/subscribe', async (params: SubscribeRequest) => {
  await axios.post(apiConfig.main.baseUrl + apiConfig.main.endpoints.email, {
    ...params,
  });
});
