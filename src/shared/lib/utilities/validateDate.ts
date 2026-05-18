import type { ValidationResult } from '@/shared/types';

export function validateDate(date: string): ValidationResult {
  if (!date || date.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'Дата обязательна для заполнения',
    };
  }

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(date)) {
    return {
      isValid: false,
      errorMsg: 'Некорректный формат даты. Ожидается формат YYYY-MM-DD',
    };
  }

  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
    return {
      isValid: false,
      errorMsg: 'Некорректная дата',
    };
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  dateObj.setHours(0, 0, 0, 0);

  if (dateObj > currentDate) {
    return {
      isValid: false,
      errorMsg: 'Дата не может быть больше текущей даты',
    };
  }

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  minDate.setHours(0, 0, 0, 0);

  if (dateObj < minDate) {
    return {
      isValid: false,
      errorMsg: 'Дата указана некорректно',
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
