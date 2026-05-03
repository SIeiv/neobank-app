import type { ValidationResult } from '@/features/prescoring/lib/types';

export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      errorMsg: 'Email не может быть пустым',
    };
  }

  if (email.length > 254) {
    return {
      isValid: false,
      errorMsg: 'Email не может быть длиннее 254 символов',
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMsg: 'Некорректный формат email',
    };
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length > 64) {
    return {
      isValid: false,
      errorMsg: 'Локальная часть email не может быть длиннее 64 символов',
    };
  }

  if (domain.startsWith('.') || domain.endsWith('.')) {
    return {
      isValid: false,
      errorMsg: 'Домен не может начинаться или заканчиваться на точку',
    };
  }

  return {
    isValid: true,
    errorMsg: '',
  };
}
