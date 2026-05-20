import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { CurrenciesList } from '@/entities/currency/ui/currencies-list';

vi.mock('@/entities/currency/ui/currency', () => ({
  CurrencyView: ({ currency, value }: { currency: string; value: number }) => (
    <div data-testid="currency-view">
      <span data-testid="currency-key">{currency}</span>
      <span data-testid="currency-value">{value}</span>
    </div>
  ),
}));

vi.mock('@/entities/currency/ui/currency.module.scss', () => ({
  default: { currencies: 'currencies' },
}));

const mockCurrencies = {
  USD: 1.23,
  EUR: 0.85,
  GBP: 0.73,
};

describe('CurrenciesList', () => {
  it('должен рендерить корректное количество CurrencyView', () => {
    render(<CurrenciesList currencies={mockCurrencies} />);
    expect(screen.getAllByTestId('currency-view')).toHaveLength(3);
  });

  it('должен рендерить корректные ключи и значения валют', () => {
    render(<CurrenciesList currencies={mockCurrencies} />);

    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('1.23')).toBeInTheDocument();
  });

  it('должен рендерить пустой список при пустом объекте', () => {
    render(<CurrenciesList currencies={{}} />);
    expect(screen.queryAllByTestId('currency-view')).toHaveLength(0);
  });
});
