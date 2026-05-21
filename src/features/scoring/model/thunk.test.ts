import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitScoring } from '@/features/scoring/model/thunk';
import { sendScoring } from '@/features/scoring/api';
import { resetState, validateFields } from '@/features/scoring/model/slice';
import type { AppDispatch, RootState } from '@/shared/store';

vi.mock('@/features/scoring/api', () => ({
  sendScoring: vi.fn(),
}));

const mockedSendScoring = sendScoring as unknown as ReturnType<typeof vi.fn>;

describe('submitScoring thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('не вызывает API если валидация не пройдена', async () => {
    const state = {
      scoring: {
        email: { value: '', error: 'Обязательное поле' },
        phone: { value: '123', error: 'Неверный формат' },
      },
    } as unknown as RootState;

    const dispatch = vi.fn() as unknown as AppDispatch;

    await submitScoring()(dispatch, () => state, undefined);

    expect(dispatch).toHaveBeenCalledWith(validateFields());
    expect(mockedSendScoring).not.toHaveBeenCalled();
  });

  it('при успешном ответе 200 диспатчит resetState', async () => {
    const state = {
      scoring: {
        email: { value: 'test@test.com', error: '' },
        phone: { value: '+79991234567', error: '' },
      },
    } as unknown as RootState;

    mockedSendScoring.mockImplementation(() => {
      return () => Promise.resolve();
    });

    const dispatch = vi.fn((action: unknown) => {
      if (typeof action === 'function') {
        return {
          unwrap: () =>
            Promise.resolve({
              status: 200,
            }),
        };
      }

      return action;
    });

    await submitScoring()(dispatch, () => state, undefined);

    expect(dispatch).toHaveBeenCalledWith(validateFields());
    expect(mockedSendScoring).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(resetState());
  });

  it('если статус ответа не 200 — resetState не вызывается', async () => {
    const state = {
      scoring: {
        email: { value: 'test@test.com', error: '' },
        phone: { value: '+79991234567', error: '' },
      },
    } as unknown as RootState;

    const dispatch = vi.fn((action: unknown) => {
      if (typeof action === 'function') {
        return {
          unwrap: () =>
            Promise.resolve({
              status: 400,
            }),
        };
      }

      return action;
    }) as AppDispatch;

    mockedSendScoring.mockImplementation(() => {
      return () => Promise.resolve();
    });

    await submitScoring()(dispatch, () => state, undefined);

    expect(dispatch).toHaveBeenCalledWith(validateFields());
    expect(mockedSendScoring).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(resetState());
  });
});
