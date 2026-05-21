import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitPrescoring } from '@/features/prescoring/model/thunk';

import { sendPrescoring } from '@/features/prescoring/api';
import { resetState, setSendedState, validateFields } from '@/features/prescoring/model/slice';
import { setCreditList } from '@/entities/credit/model/slice';
import { ApplicationStage } from '@/shared/types';
import type { Credit } from '@/entities/credit/model/types';
import type { AppDispatch, RootState } from '@/shared/store';

vi.mock('@/features/prescoring/api', () => ({
  sendPrescoring: vi.fn(),
}));

const mockedSendPrescoring = sendPrescoring as unknown as ReturnType<typeof vi.fn>;

describe('submitPrescoring thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('не вызывает API если валидация не пройдена', async () => {
    const state = {
      prescoring: {
        field1: { value: '123', error: 'Обязательное поле' },
      },
    } as unknown as RootState;

    const dispatch = vi.fn() as AppDispatch;

    await submitPrescoring()(dispatch, () => state, undefined);

    expect(dispatch).toHaveBeenCalledWith(validateFields());
    expect(mockedSendPrescoring).not.toHaveBeenCalled();
  });

  it('при успешном ответе 200 диспатчит данные и пишет в localStorage', async () => {
    const credits: Credit[] = [
      {
        applicationId: 1,
        isInsuranceEnabled: true,
        isSalaryClient: true,
        monthlyPayment: 1,
        rate: 1,
        requestedAmount: 1,
        term: '6',
        totalAmount: 1,
        image: '',
      },
    ];

    const state = {
      prescoring: {
        field1: { value: '123', error: '' },
      },
    } as unknown as RootState;

    mockedSendPrescoring.mockImplementation(() => {
      return () => Promise.resolve();
    });

    const dispatch = vi.fn((action: unknown) => {
      if (typeof action === 'function') {
        return {
          unwrap: () =>
            Promise.resolve({
              status: 200,
              data: credits,
            }),
        };
      }

      return action;
    }) as AppDispatch;

    await submitPrescoring()(dispatch, () => state, undefined);

    expect(dispatch).toHaveBeenCalledWith(resetState());
    expect(dispatch).toHaveBeenCalledWith(setCreditList(credits));
    expect(dispatch).toHaveBeenCalledWith(setSendedState(true));

    expect(localStorage.getItem('applicationStage')).toBe(ApplicationStage.Credit);
    expect(localStorage.getItem('credits')).toBe(JSON.stringify(credits));
  });

  it('если статус ответа не 200 — состояние не изменяется', async () => {
    const state: RootState = {
      prescoring: {
        field1: { value: '123', error: '' },
      },
    } as unknown as RootState;

    const dispatch = vi.fn() as AppDispatch;

    mockedSendPrescoring.mockReturnValue(() => ({
      unwrap: () =>
        Promise.resolve({
          status: 400,
          data: [],
        }),
    }));

    await submitPrescoring()(dispatch, () => state, undefined);

    expect(dispatch).not.toHaveBeenCalledWith(resetState());
    expect(dispatch).not.toHaveBeenCalledWith(setCreditList(expect.anything() as Credit[]));
    expect(dispatch).not.toHaveBeenCalledWith(setSendedState(true));

    expect(localStorage.getItem('applicationStage')).toBeNull();
    expect(localStorage.getItem('credits')).toBeNull();
  });
});
