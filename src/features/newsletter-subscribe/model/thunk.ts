import { createAsyncThunk } from '@reduxjs/toolkit';

import { subscribe } from '@/features/newsletter-subscribe/api';
import { validateEmail } from '@/features/newsletter-subscribe/lib/validateEmail';
import type { RootState } from '@/shared/store';

export const subscribeConfirm = createAsyncThunk<void, void, { state: RootState }>(
  'newsletterSubscribe/subscribeConfirm',
  async (_, { dispatch, getState }) => {
    const state = getState();
    const validationResult = validateEmail(state.newsletterSubscribe.email);

    if (validationResult.isValid) {
      await dispatch(subscribe({ email: state.newsletterSubscribe.email }));
    } else {
      // eslint-disable-next-line no-alert
      alert(validationResult.errors.toString());
    }
  }
);
