import type { ValidationResult } from '@/features/prescoring/lib/types';

export const validatePatronymic = (value: string | null | undefined): ValidationResult => {
  // 1. Проверка на пустое значение (если пусто - валидно)
  if (!value || value.trim() === '') {
    return { isValid: true, errorMsg: '' };
  }

  const patronymic = value.trim();

  // 2. Проверка длины (от 2 до 50 символов)
  if (patronymic.length < 2) {
    return { isValid: false, errorMsg: 'Отчество слишком короткое' };
  }
  if (patronymic.length > 50) {
    return { isValid: false, errorMsg: 'Отчество не может быть длиннее 50 символов' };
  }

  return { isValid: true, errorMsg: '' };
};
