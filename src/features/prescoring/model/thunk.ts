import { createAsyncThunk } from '@reduxjs/toolkit';

import { setCreditList } from '@/entities/credit/model/slice';
import { sendPrescoring } from '@/features/prescoring/api';
import { isField } from '@/shared/lib/utilities/isField';
import type { RootState } from '@/shared/store';
import { ApplicationStage } from '@/shared/types';

import { resetState, setSendedState, validateFields } from '@/features/prescoring/model/slice';

export const submitPrescoring = createAsyncThunk<void, void, { state: RootState }>(
  'prescoring/submit',
  async (_, { dispatch, getState }) => {
    dispatch(validateFields());

    const { prescoring } = getState();

    let isValid = true;
    Object.values(prescoring).forEach((value) => {
      if (isField(value) && value.error !== '') {
        isValid = false;
      }
    });

    if (isValid) {
      const result = await dispatch(sendPrescoring()).unwrap();

      if (result.status === 200) {
        dispatch(resetState());
        dispatch(setCreditList(result.data));
        dispatch(setSendedState(true));
        localStorage.setItem('applicationStage', ApplicationStage.Credit);
        localStorage.setItem('credits', JSON.stringify(result.data));
      }
    }
  }
);
