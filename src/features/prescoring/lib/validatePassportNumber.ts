import type { ValidationResult } from '@/features/prescoring/lib/types';

export function validatePassportNumber(number: string): ValidationResult {
  if (!number || number.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'Номер паспорта не может быть пустым',
    };
  }

  const trimmedNumber = number.trim();

  if (trimmedNumber.length !== 6) {
    return {
      isValid: false,
      errorMsg: `Номер паспорта должен состоять из 6 цифр, получено: ${trimmedNumber.length}`,
    };
  }

  const digitRegex = /^\d{6}$/;
  if (!digitRegex.test(trimmedNumber)) {
    return {
      isValid: false,
      errorMsg: 'Номер паспорта должен содержать только 6 цифр',
    };
  }

  // Проверка: номер не может состоять только из нулей
  if (/^0{6}$/.test(trimmedNumber)) {
    return {
      isValid: false,
      errorMsg: 'Недопустимый номер паспорта',
    };
  }

  // Дополнительная проверка для России: номер обычно начинается с определённых цифр
  const firstDigit = parseInt(trimmedNumber[0], 10);

  if (firstDigit === 0 || firstDigit === 1) {
    return {
      isValid: false,
      errorMsg: 'Недопустимая первая цифра номера паспорта',
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
