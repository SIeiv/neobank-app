import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';
import { endpointsBuilder } from '@/shared/lib/utilities';

import type { GetNewsTopHeadlinesRequest, GetNewsTopHeadlinesResponse } from '@/entities/news/api/types';

export const getNewsTopHeadlines = createAsyncThunk(
  'news/getNewsTopHeadlines',
  async (params: Omit<GetNewsTopHeadlinesRequest, 'apiKey'>) => {
    const { data }: { data: GetNewsTopHeadlinesResponse } = await axios.get(
      apiConfig.news.baseUrl +
        endpointsBuilder.withQueryParams<GetNewsTopHeadlinesRequest>('/top-headlines', {
          ...params,
          apiKey: apiConfig.news.apiKey,
        })
    );
    return data;
  }
);
