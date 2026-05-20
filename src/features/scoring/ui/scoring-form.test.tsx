import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoringForm } from '@/features/scoring/ui/scoring-form';
import { Status } from '@/shared/types';

import { useAppSelector } from '@/shared/lib/hooks';

vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }));
vi.mock('@/shared/lib/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
  useMarginTopSelect: () => '0px',
}));
const mockedUseAppSelector = useAppSelector as unknown as ReturnType<typeof vi.fn>;

const baseState = {
  gender: { value: '', error: '' },
  maritalStatus: { value: '', error: '' },
  dependentAmount: { value: 0, error: '' },
  passportIssueDate: { value: '', error: '' },
  passportIssueBranch: { value: '', error: '' },
  employmentStatus: { value: '', error: '' },
  employerINN: { value: '', error: '' },
  salary: { value: 0, error: '' },
  position: { value: '', error: '' },
  workExperienceTotal: { value: 0, error: '' },
  workExperienceCurrent: { value: 0, error: '' },
  status: Status.Idle,
};

describe('ScoringForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает спиннер при статусе Loading', () => {
    mockedUseAppSelector.mockReturnValue({ ...baseState, status: Status.Loading });

    render(<ScoringForm marginTop={[0, 0, 0]} />);

    expect(screen.queryByRole('form')).not.toBeInTheDocument();

    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('показывает сообщение об успехе при статусе Ok', () => {
    mockedUseAppSelector.mockReturnValue({ ...baseState, status: Status.Ok });

    render(<ScoringForm marginTop={[0, 0, 0]} />);

    expect(screen.getByText('Wait for a decision on the application')).toBeInTheDocument();
    expect(screen.getByText('The answer will come to your mail within 10 minutes')).toBeInTheDocument();
    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('показывает форму при статусе Idle', () => {
    mockedUseAppSelector.mockReturnValue({ ...baseState, status: Status.Idle });

    render(<ScoringForm marginTop={[0, 0, 0]} />);

    expect(screen.getByText('Continuation of the application')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });
});
