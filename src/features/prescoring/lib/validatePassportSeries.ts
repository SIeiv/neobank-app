import type { ValidationResult } from '@/shared/types';

export function validatePassportSeries(series: string): ValidationResult {
  if (!series || series.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'Серия паспорта не может быть пустой',
    };
  }

  const trimmedSeries = series.trim();

  if (trimmedSeries.length !== 4) {
    return {
      isValid: false,
      errorMsg: `Серия паспорта должна состоять из 4 символов, получено: ${trimmedSeries.length}`,
    };
  }

  const digitRegex = /^\d{4}$/;
  if (!digitRegex.test(trimmedSeries)) {
    return {
      isValid: false,
      errorMsg: 'Серия паспорта должна содержать только 4 цифры',
    };
  }

  // Дополнительная проверка: серия не может состоять только из нулей
  if (/^0{4}$/.test(trimmedSeries)) {
    return {
      isValid: false,
      errorMsg: 'Недопустимый номер серии',
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
