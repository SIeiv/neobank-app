import type { FieldInState, InitialState } from '@/features/prescoring/model/types';

import type { ValidationResult } from '@/features/prescoring/lib/types';

export const applyValidation = (
  state: InitialState,
  fieldName: FieldInState,
  validateFn: (s: string) => ValidationResult
) => {
  if ('error' in state[fieldName]) {
    const validationResult = validateFn(state[fieldName].value);
    state[fieldName].error = validationResult.errorMsg;
  }
};
