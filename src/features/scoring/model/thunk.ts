import { createAsyncThunk } from '@reduxjs/toolkit';

import { sendScoring } from '@/features/scoring/api';
import { isField } from '@/shared/lib/utilities/isField';
import type { RootState } from '@/shared/store';

import { resetState, validateFields } from '@/features/scoring/model/slice';

export const submitScoring = createAsyncThunk<void, void, { state: RootState }>(
  'scoring/submit',
  async (_, { dispatch, getState }) => {
    dispatch(validateFields());

    const { scoring } = getState();

    let isValid = true;
    Object.values(scoring).forEach((value) => {
      if (isField(value) && value.error !== '') {
        isValid = false;
      }
    });

    if (isValid) {
      const result = await dispatch(sendScoring()).unwrap();

      if (result.status === 200) {
        dispatch(resetState());
      }
    }
  }
);
