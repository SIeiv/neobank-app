import { validateDate } from '@/shared/lib/utilities';
import type { ValidationResult } from '@/shared/types';

export function validateDateOfBirth(dateOfBirth: string): ValidationResult {
  const validatedDate = validateDate(dateOfBirth);

  if (!validatedDate.isValid) {
    return validatedDate;
  }

  const [yearStr, monthStr, dayStr] = dateOfBirth.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 18) {
    return {
      isValid: false,
      errorMsg: `Клиент должен быть не младше 18 лет. Текущий возраст: ${age} лет`,
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
