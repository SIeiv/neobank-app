import type { Field } from '@/features/prescoring/model/types';

export const calcInputState = (field: Field<unknown>) => {
  if (field.error === null) {
    return 'default';
  } else if (field.error === '') {
    return 'success';
  }
  return 'error';
};
