import { creditReducer, setCreditList } from '@/entities/credit/model/slice';
import { Status, ApplicationStage, Term } from '@/shared/types';
import { sendCreditInfo } from '@/entities/credit/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Credit } from '@/entities/credit/model/types';

describe('creditSlice', () => {
  const initialState = { status: Status.Idle, creditList: [] };

  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it('должен устанавливать creditList через setCreditList', () => {
    const mockCredits: Credit[] = [
      {
        applicationId: 1,
        isInsuranceEnabled: true,
        isSalaryClient: true,
        monthlyPayment: 1,
        rate: 1,
        requestedAmount: 1,
        term: Term['12 month'],
        totalAmount: 1,
        image: '',
      },
    ];
    const state = creditReducer(initialState, setCreditList(mockCredits));

    expect(state.creditList).toEqual(mockCredits);
  });

  it('должен менять статус на Loading при pending запроса sendCreditInfo', () => {
    const action = { type: sendCreditInfo.pending.type };
    const state = creditReducer(initialState, action);

    expect(state.status).toBe(Status.Loading);
  });

  it('должен менять статус на Ok при успешном выполнении запроса', () => {
    const action = { type: sendCreditInfo.fulfilled.type };
    const state = creditReducer({ ...initialState, status: Status.Loading }, action);

    expect(state.status).toBe(Status.Ok);
  });

  describe('initialState logic', () => {
    it('должен инициализироваться данными из localStorage', async () => {
      const mockCredits = [{ applicationId: 1 }];
      localStorage.setItem('credits', JSON.stringify(mockCredits));
      localStorage.setItem('applicationStage', ApplicationStage.Sent);

      vi.resetModules();

      const { creditReducer: freshReducer } = await import('@/entities/credit/model/slice');

      const state = freshReducer(undefined, { type: '@@INIT' });

      expect(state.creditList).toEqual(mockCredits);
      expect(state.status).toBe(Status.Ok);
    });
  });
});
