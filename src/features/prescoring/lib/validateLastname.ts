import type { ValidationResult } from '@/shared/types';

export function validateLastname(surname: string): ValidationResult {
  // Проверка на пустое значение
  if (!surname || surname.trim().length === 0) {
    return {
      isValid: false,
      errorMsg: 'Фамилия не может быть пустой',
    };
  }

  // Проверка минимальной длины
  if (surname.trim().length < 2) {
    return {
      isValid: false,
      errorMsg: 'Фамилия должна содержать минимум 2 символа',
    };
  }

  // Проверка максимальной длины
  if (surname.trim().length > 50) {
    return {
      isValid: false,
      errorMsg: 'Фамилия не может содержать более 50 символов',
    };
  }

  // Проверка на допустимые символы (буквы, пробелы, дефисы)
  const surnameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
  if (!surnameRegex.test(surname)) {
    return {
      isValid: false,
      errorMsg: 'Фамилия может содержать только буквы, пробелы, дефисы и апострофы',
    };
  }

  // Проверка на наличие цифр
  if (/\d/.test(surname)) {
    return {
      isValid: false,
      errorMsg: 'Фамилия не может содержать цифры',
    };
  }

  // Успешная валидация
  return {
    isValid: true,
    errorMsg: '',
  };
}
