interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];

  if (!email || email.trim().length === 0) {
    return { isValid: false, errors: ['Email не может быть пустым'] };
  }

  const trimmedEmail = email.trim();

  // Проверка максимальной длины (RFC 5321)
  if (trimmedEmail.length > 254) {
    errors.push('Email не может быть длиннее 254 символов');
  }

  // Проверка наличия символа @
  const atIndex = trimmedEmail.indexOf('@');
  if (atIndex === -1) {
    errors.push('Email должен содержать символ "@"');
  } else {
    const localPart = trimmedEmail.slice(0, atIndex); // до @
    const domainPart = trimmedEmail.slice(atIndex + 1); // после @

    // Валидация локальной части (до @)
    if (localPart.length === 0) {
      errors.push('Часть до "@" не может быть пустой');
    } else if (localPart.length > 64) {
      errors.push('Часть до "@" не может быть длиннее 64 символов');
    } else if (!/^[a-zA-Z0-9._%+-]+$/.test(localPart)) {
      errors.push('Часть до "@" содержит недопустимые символы');
    } else if (/^\.|\.$|\.\./.test(localPart)) {
      errors.push('Часть до "@" не может начинаться/заканчиваться на точку или содержать две точки подряд');
    }

    // Валидация домена (после @)
    if (domainPart.length === 0) {
      errors.push('Домен не может быть пустым');
    } else if (!/^[a-zA-Z0-9.-]+$/.test(domainPart)) {
      errors.push('Домен содержит недопустимые символы');
    } else if (!/\.[a-zA-Z]{2,}$/.test(domainPart)) {
      errors.push('Домен должен содержать корректное доменное расширение (например, .com, .ru)');
    } else if (/^-|-$/.test(domainPart)) {
      errors.push('Домен не может начинаться или заканчиваться на дефис');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
