import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/store';

export const selectCurrencyConversionsByCode = createSelector(
  [
    (state: RootState) => state.currency.data,
    (_state: RootState, baseCurrencyCode: string) => baseCurrencyCode,
    (_state: RootState, _baseCurrencyCode: string, allowedKeys: string[]) => allowedKeys.slice().sort().join(','),
  ],
  (items, baseCurrencyCode, allowedKeysString) => {
    if (!items[baseCurrencyCode]) {
      return {};
    }

    const allowedKeys = allowedKeysString.split(',');
    const keysSet = new Set(allowedKeys);

    return Object.fromEntries(Object.entries(items[baseCurrencyCode]).filter(([key]) => keysSet.has(key)));
  }
);
