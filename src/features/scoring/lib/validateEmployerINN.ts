import type { ValidationResult } from '@/shared/types';

export function validateEmployerINN(employerINN: string): ValidationResult {
  if (!employerINN || employerINN.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'ИНН не может быть пустым',
    };
  }

  const trimmedINN = employerINN.trim();

  const pattern = /^\d{12}$/;

  if (!pattern.test(trimmedINN)) {
    return {
      isValid: false,
      errorMsg: 'ИНН должен состоять из 12 цифр',
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
