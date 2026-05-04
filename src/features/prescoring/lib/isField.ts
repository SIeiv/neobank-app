import type { Field } from '@/features/prescoring/model/types';

export const isField = (obj: unknown): obj is Field => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'value' in obj &&
    'error' in obj &&
    typeof obj.value === 'string' &&
    typeof obj.error === 'string'
  );
};
