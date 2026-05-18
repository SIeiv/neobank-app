import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';

export const signDocument = createAsyncThunk('documentSign/sign', async () => {
  await axios.post(
    apiConfig.main.baseUrl + apiConfig.main.endpoints.signDocument(localStorage.getItem('applicationId') ?? '')
  );
});
