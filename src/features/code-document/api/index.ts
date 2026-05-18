import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';

export const confirmCode = createAsyncThunk('codeDocument/confirm', async (params: string) => {
  await axios.post(
    apiConfig.main.baseUrl + apiConfig.main.endpoints.codeDocument(localStorage.getItem('applicationId') ?? ''),
    params,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
});
