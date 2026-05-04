import type { ValidationResult } from '@/features/prescoring/lib/types';

export function validateDateOfBirth(dateOfBirth: string): ValidationResult {
  if (!dateOfBirth || dateOfBirth.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'Дата рождения не может быть пустой',
    };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateOfBirth)) {
    return {
      isValid: false,
      errorMsg: 'Некорректный формат даты. Ожидается YYYY-MM-DD',
    };
  }

  const [yearStr, monthStr, dayStr] = dateOfBirth.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (month < 1 || month > 12) {
    return {
      isValid: false,
      errorMsg: 'Некорректный месяц',
    };
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return {
      isValid: false,
      errorMsg: `Некорректный день для месяца ${month}. Возможные значения: 1-${daysInMonth}`,
    };
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  if (age < 0) {
    return {
      isValid: false,
      errorMsg: 'Дата рождения указана в будущем',
    };
  }

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
