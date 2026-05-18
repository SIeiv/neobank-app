import type { ValidationResult } from '@/shared/types';

export function validatePassportIssueBranch(passportIssueBranch: string): ValidationResult {
  if (!passportIssueBranch || passportIssueBranch.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'Код подразделения не может быть пустым',
    };
  }

  const pattern = /^\d{3}-\d{3}$/;

  if (!pattern.test(passportIssueBranch.trim())) {
    return {
      isValid: false,
      errorMsg: 'Код подразделения должен состоять из 6 цифр в формате XXX-XXX (например, 123-456)',
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
