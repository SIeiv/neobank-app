import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrescoringForm } from '@/features/prescoring/ui/customize-card-form';
import { setField } from '@/features/prescoring/model/slice';
import * as hooks from '@/shared/lib/hooks';
import type { RootState } from '@/shared/store';

// ✅ мок хуков
vi.mock('@/shared/lib/hooks', async () => {
  const actual = await vi.importActual<typeof hooks>('@/shared/lib/hooks');
  return {
    ...actual,
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
    useMarginTopSelect: () => 0,
  };
});

const mockedDispatch = vi.fn();

const baseState = {
  prescoring: {
    amount: 100000,
    status: 'idle',
    lastname: { value: '', error: '' },
    firstname: { value: '', error: '' },
    patronymic: { value: '', error: '' },
    email: { value: '', error: '' },
    dateOfBirth: { value: '', error: '' },
    passportSeries: { value: '', error: '' },
    passportNumber: { value: '', error: '' },
    term: { value: '', error: '' },
  },
};

describe('PrescoringForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(hooks.useAppDispatch).mockReturnValue(mockedDispatch);

    vi.mocked(hooks.useAppSelector).mockImplementation((selector: Parameters<typeof hooks.useAppSelector>[0]) =>
      selector(baseState as unknown as RootState)
    );
  });

  it('отображает loader если статус loading', () => {
    vi.mocked(hooks.useAppSelector).mockImplementation((selector: Parameters<typeof hooks.useAppSelector>[0]) =>
      selector({
        ...baseState,
        prescoring: { ...baseState.prescoring, status: 'loading' },
      } as unknown as RootState)
    );

    render(<PrescoringForm applyCardScrollToRef={{ current: null }} />);

    expect(screen.queryByText(/Customize your card/i)).not.toBeInTheDocument();
  });

  it('диспатчит setField при изменении lastname', () => {
    render(<PrescoringForm applyCardScrollToRef={{ current: null }} />);

    const input = screen.getByPlaceholderText('For Example Doe');

    fireEvent.change(input, { target: { value: 'Ivanov' } });

    expect(mockedDispatch).toHaveBeenCalledWith(setField({ fieldName: 'lastname', value: 'Ivanov' }));
  });

  it('диспатчит submitPrescoring при сабмите формы', () => {
    render(<PrescoringForm applyCardScrollToRef={{ current: null }} />);

    const form = screen.getByRole('form') || document.querySelector('form');

    fireEvent.submit(form);

    expect(mockedDispatch).toHaveBeenCalled();
  });
});
