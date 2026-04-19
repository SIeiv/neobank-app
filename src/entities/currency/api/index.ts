import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';

import type { GetCurrencyConversionRequest, GetCurrencyConversionResponse } from '@/entities/currency/api/types';

export const getCurrencyConversion = createAsyncThunk(
  'currency/getCurrencyConversion',
  async (params: GetCurrencyConversionRequest) => {
    const { data }: { data: GetCurrencyConversionResponse } = await axios.get(
      apiConfig.currency.baseUrlWithSecret + apiConfig.currency.endpoints.conversion(params.currencyCode),
      {}
    );
    return data;
  }
);
