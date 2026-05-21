// prescoringSlice.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  prescoringReducer,
  setAmount,
  setField,
  validateFields,
  resetState,
  setSendedState,
} from '@/features/prescoring/model/slice';
import { PRESCORING_CONFIG } from '@/features/prescoring/config';
import { Status } from '@/shared/types';
import type { InitialState } from '@/features/prescoring/model/types';

describe('prescoringSlice', () => {
  const initialState: InitialState = {
    status: Status.Idle,
    amount: PRESCORING_CONFIG.AMOUNT.DEFAULT,
    isSended: false,
    firstname: { value: '', error: null },
    lastname: { value: '', error: null },
    patronymic: { value: '', error: null },
    term: { value: '6' },
    email: { value: '', error: null },
    dateOfBirth: { value: '', error: null },
    passportSeries: { value: '', error: null },
    passportNumber: { value: '', error: null },
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('setAmount', () => {
    it('должен установить сумму в допустимом диапазоне', () => {
      const validAmount = PRESCORING_CONFIG.AMOUNT.MIN + 10000;
      const state = prescoringReducer(initialState, setAmount(validAmount));

      expect(state.amount).toBe(validAmount);
    });

    it('не должен установить сумму ниже минимальной', () => {
      const state = prescoringReducer(initialState, setAmount(PRESCORING_CONFIG.AMOUNT.MIN - 1));

      expect(state.amount).toBe(PRESCORING_CONFIG.AMOUNT.DEFAULT);
    });

    it('не должен установить сумму выше максимальной', () => {
      const state = prescoringReducer(initialState, setAmount(PRESCORING_CONFIG.AMOUNT.MAX + 1));

      expect(state.amount).toBe(PRESCORING_CONFIG.AMOUNT.DEFAULT);
    });

    it('должен установить минимальную сумму', () => {
      const state = prescoringReducer(initialState, setAmount(PRESCORING_CONFIG.AMOUNT.MIN));

      expect(state.amount).toBe(PRESCORING_CONFIG.AMOUNT.MIN);
    });

    it('должен установить максимальную сумму', () => {
      const state = prescoringReducer(initialState, setAmount(PRESCORING_CONFIG.AMOUNT.MAX));

      expect(state.amount).toBe(PRESCORING_CONFIG.AMOUNT.MAX);
    });
  });

  describe('setField', () => {
    it('должен установить значение поля firstname', () => {
      const state = prescoringReducer(initialState, setField({ fieldName: 'firstname', value: 'Иван' }));

      expect(state.firstname.value).toBe('Иван');
    });

    it('должен установить значение поля email', () => {
      const state = prescoringReducer(initialState, setField({ fieldName: 'email', value: 'test@example.com' }));

      expect(state.email.value).toBe('test@example.com');
    });

    it('должен конвертировать числовое значение в строку', () => {
      const state = prescoringReducer(initialState, setField({ fieldName: 'passportSeries', value: 1234 }));

      expect(state.passportSeries.value).toBe('1234');
    });

    it('должен установить значение поля term', () => {
      const state = prescoringReducer(initialState, setField({ fieldName: 'term', value: '12' }));

      expect(state.term.value).toBe('12');
    });

    it('должен установить пустое значение поля', () => {
      const stateWithValue = {
        ...initialState,
        firstname: { value: 'Иван', error: null },
      };

      const state = prescoringReducer(stateWithValue, setField({ fieldName: 'firstname', value: '' }));

      expect(state.firstname.value).toBe('');
    });
  });

  describe('validateFields', () => {
    it('должен установить ошибки для пустых полей', () => {
      const state = prescoringReducer(initialState, validateFields());

      expect(state.firstname.error).not.toBeNull();
      expect(state.lastname.error).not.toBeNull();
      expect(state.email.error).not.toBeNull();
      expect(state.dateOfBirth.error).not.toBeNull();
      expect(state.passportSeries.error).not.toBeNull();
      expect(state.passportNumber.error).not.toBeNull();
    });

    it('должен не устанавливать ошибки для валидных полей', () => {
      const validState = {
        ...initialState,
        firstname: { value: 'Иван', error: null },
        lastname: { value: 'Иванов', error: null },
        patronymic: { value: 'Иванович', error: null },
        email: { value: 'test@example.com', error: null },
        dateOfBirth: { value: '1990-01-01', error: null },
        passportSeries: { value: '4234', error: null },
        passportNumber: { value: '423456', error: null },
      };

      const state = prescoringReducer(validState, validateFields());

      expect(state.firstname.error).toBe('');
      expect(state.lastname.error).toBe('');
      expect(state.email.error).toBe('');
      expect(state.dateOfBirth.error).toBe('');
      expect(state.passportSeries.error).toBe('');
      expect(state.passportNumber.error).toBe('');
    });

    it('должен сбросить ошибку после исправления поля', () => {
      let state = prescoringReducer(initialState, validateFields());
      expect(state.firstname.error).not.toBeNull();

      state = prescoringReducer(state, setField({ fieldName: 'firstname', value: 'Иван' }));

      state = prescoringReducer(state, validateFields());
      expect(state.firstname.error).toBe('');
    });
  });

  describe('resetState', () => {
    it('должен сбросить состояние к начальному', () => {
      const modifiedState = {
        ...initialState,
        amount: PRESCORING_CONFIG.AMOUNT.MAX,
        status: Status.Ok,
        firstname: { value: 'Иван', error: null },
      };

      const state = prescoringReducer(modifiedState, resetState());

      expect(state.amount).toBe(PRESCORING_CONFIG.AMOUNT.DEFAULT);
      expect(state.status).toBe(Status.Idle);
      expect(state.firstname.value).toBe('');
    });

    it('должен сбросить все поля формы', () => {
      const modifiedState = {
        ...initialState,
        firstname: { value: 'Иван', error: 'ошибка' },
        lastname: { value: 'Иванов', error: 'ошибка' },
        email: { value: 'test@example.com', error: null },
      };

      const state = prescoringReducer(modifiedState, resetState());

      expect(state.firstname).toEqual({ value: '', error: null });
      expect(state.lastname).toEqual({ value: '', error: null });
      expect(state.email).toEqual({ value: '', error: null });
    });
  });

  describe('setSendedState', () => {
    it('должен установить isSended в true', () => {
      const state = prescoringReducer(initialState, setSendedState(true));

      expect(state.isSended).toBe(true);
    });

    it('должен установить isSended в false', () => {
      const stateWithSended = { ...initialState, isSended: true };
      const state = prescoringReducer(stateWithSended, setSendedState(false));

      expect(state.isSended).toBe(false);
    });
  });
});
