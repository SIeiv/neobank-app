/* eslint-disable */
import type { ValidationResult } from '@/shared/types';

export const applyValidation = (state: any, fieldName: string, validateFn: (s: string) => ValidationResult) => {
  if ('error' in state[fieldName]) {
    const validationResult = validateFn(state[fieldName].value);
    state[fieldName].error = validationResult.errorMsg;
  }
};
