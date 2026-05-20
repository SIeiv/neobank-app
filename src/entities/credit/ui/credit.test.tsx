import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { AppDispatch } from '@/shared/store';
import { CreditView } from '@/entities/credit/ui/credit';
import { sendCreditInfo } from '@/entities/credit/api';
import { formatNumber } from '@/shared/lib/utilities/formatNumber';
import * as hooks from '@/shared/lib/hooks';
import { Term } from '@/shared/types';
import type { Credit } from '@/entities/credit/model/types';

vi.mock('@/entities/credit/api', () => ({
  sendCreditInfo: vi.fn(() => ({ type: 'credit/sendCreditInfo' })),
}));

vi.mock('@/shared/lib/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('@/entities/credit/ui/credit-condition', () => ({
  CreditCondition: ({ text, condition }: { text: string; condition: boolean }) => (
    <div data-testid="credit-condition">
      {text}: {condition ? 'Yes' : 'No'}
    </div>
  ),
}));

vi.mock('neobank-ui-kit', () => ({
  Card: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={style}>{children}</div>
  ),
  Paragraph: ({
    children,
    weight,
    style,
  }: {
    children: React.ReactNode;
    weight?: string;
    style?: React.CSSProperties;
  }) => (
    <p style={style} data-weight={weight}>
      {children}
    </p>
  ),
  Button: ({
    children,
    onClick,
    style,
    border,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
    border?: string;
  }) => (
    <button onClick={onClick} style={style} data-border={border}>
      {children}
    </button>
  ),
}));

vi.mock('@/shared/assets/images/SurpriseImage 1.png', () => ({
  default: 'default-credit-image.png',
}));

const mockCredit = {
  applicationId: 1,
  isInsuranceEnabled: true,
  isSalaryClient: false,
  monthlyPayment: 15000,
  rate: 5.5,
  requestedAmount: 500000,
  term: Term['24 month'],
  totalAmount: 540000,
  image: 'test-image.png',
} satisfies Credit;

describe('CreditView', () => {
  const mockDispatch = vi.fn() as AppDispatch;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);
  });

  it('должен корректно отображать финансовую информацию по кредиту', () => {
    render(<CreditView {...mockCredit} />);

    expect(screen.getByText(`Requested amount: ${formatNumber(mockCredit.requestedAmount)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`Total amount: ${formatNumber(mockCredit.totalAmount)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`Monthly payment: ${formatNumber(mockCredit.monthlyPayment)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`Your rate: ${mockCredit.rate}%`)).toBeInTheDocument();
    expect(screen.getByText(`For ${mockCredit.term} months`)).toBeInTheDocument();
  });

  it('должен отображать переданное изображение, либо дефолтное если изображение не передано', () => {
    const { rerender } = render(<CreditView {...mockCredit} />);

    expect(screen.getByAltText('credit image')).toHaveAttribute('src', mockCredit.image);

    rerender(<CreditView {...mockCredit} image={undefined} />);

    expect(screen.getByAltText('credit image')).toHaveAttribute('src', 'default-credit-image.png');
  });

  it('должен отображать условия кредита с корректными пропсами', () => {
    render(<CreditView {...mockCredit} />);

    const conditions = screen.getAllByTestId('credit-condition');

    expect(conditions[0]).toHaveTextContent('Insurance included: Yes');
    expect(conditions[1]).toHaveTextContent('Salary client: No');
  });

  it('должен вызывать dispatch с корректными данными при клике на кнопку', () => {
    render(<CreditView {...mockCredit} />);

    fireEvent.click(screen.getByRole('button', { name: /select/i }));

    expect(mockDispatch as ReturnType<typeof vi.fn>).toHaveBeenCalledTimes(1);
    expect(sendCreditInfo).toHaveBeenCalledWith({
      applicationId: mockCredit.applicationId,
      isInsuranceEnabled: mockCredit.isInsuranceEnabled,
      isSalaryClient: mockCredit.isSalaryClient,
      monthlyPayment: mockCredit.monthlyPayment,
      rate: mockCredit.rate,
      requestedAmount: mockCredit.requestedAmount,
      term: Number(mockCredit.term),
      totalAmount: mockCredit.totalAmount,
    });
  });
});
