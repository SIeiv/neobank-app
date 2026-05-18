import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiConfig } from '@/shared/config';

export const sendDocument = createAsyncThunk('document/send', async () => {
  await axios.post(
    `${apiConfig.main.baseUrl + apiConfig.main.endpoints.document}/${localStorage.getItem('applicationId')}`
  );
});
