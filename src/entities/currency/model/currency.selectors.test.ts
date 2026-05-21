import { describe, expect, it } from 'vitest';
import { selectCurrencyConversionsByCode } from '@/entities/currency/model/currency.selectors';
import { Status } from '@/shared/types';
import type { RootState } from '@/shared/store';

describe('selectCurrencyConversionsByCode', () => {
  const mockState = {
    currency: {
      data: {
        USD: { EUR: 0.9, GBP: 0.8, JPY: 110 },
        EUR: { USD: 1.1, GBP: 0.85 },
      },
      lastUpdatedTime: null,
      status: Status.Idle,
    },
  } as unknown as RootState;

  it('должен фильтровать валюты по списку allowedKeys', () => {
    const result = selectCurrencyConversionsByCode(mockState, 'USD', ['EUR', 'GBP']);
    expect(result).toEqual({ EUR: 0.9, GBP: 0.8 });
    expect(result).not.toHaveProperty('JPY');
  });

  it('должен возвращать пустой объект, если базовая валюта не найдена', () => {
    const result = selectCurrencyConversionsByCode(mockState, 'RUB', ['EUR']);
    expect(result).toEqual({});
  });

  it('должен возвращать пустой объект, если список allowedKeys пуст', () => {
    const result = selectCurrencyConversionsByCode(mockState, 'USD', []);
    expect(result).toEqual({});
  });

  it('должен корректно работать, если в allowedKeys есть лишние ключи', () => {
    const result = selectCurrencyConversionsByCode(mockState, 'EUR', ['USD', 'NON_EXISTENT']);
    expect(result).toEqual({ USD: 1.1 });
  });

  it('мемоизация должна работать при разном порядке в allowedKeys', () => {
    const result1 = selectCurrencyConversionsByCode(mockState, 'USD', ['GBP', 'EUR']);
    const result2 = selectCurrencyConversionsByCode(mockState, 'USD', ['EUR', 'GBP']);

    expect(result1).toBe(result2);
  });
});
