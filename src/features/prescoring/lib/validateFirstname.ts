import type { ValidationResult } from '@/shared/types';

export function validateFirstname(name: string): ValidationResult {
  // Проверка на пустое значение
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      errorMsg: 'Имя не может быть пустым',
    };
  }

  // Проверка минимальной длины
  if (name.trim().length < 2) {
    return {
      isValid: false,
      errorMsg: 'Имя должно содержать минимум 2 символа',
    };
  }

  // Проверка максимальной длины
  if (name.trim().length > 50) {
    return {
      isValid: false,
      errorMsg: 'Имя не может содержать более 50 символов',
    };
  }

  // Проверка на допустимые символы (буквы, пробелы, дефисы)
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      errorMsg: 'Имя может содержать только буквы, пробелы, дефисы и апострофы',
    };
  }

  // Проверка на наличие цифр
  if (/\d/.test(name)) {
    return {
      isValid: false,
      errorMsg: 'Имя не может содержать цифры',
    };
  }

  // Успешная валидация
  return {
    isValid: true,
    errorMsg: '',
  };
}
