import { describe, it, expect, beforeEach, vi } from 'vitest';
import { scoringReducer, setField, validateFields, resetState } from '@/features/scoring/model/slice';
import { Status } from '@/shared/types';
import { EmploymentStatus, Gender, MaritalStatus, Position, type InitialState } from '@/features/scoring/model/types';

describe('scoringSlice', () => {
  const initialState: InitialState = {
    status: Status.Idle,
    gender: { value: Gender.Male, error: null },
    maritalStatus: { value: MaritalStatus.Married, error: null },
    dependentAmount: { value: 0, error: null },
    passportIssueDate: { value: '', error: null },
    passportIssueBranch: { value: '', error: null },
    employmentStatus: { value: EmploymentStatus.Unemployed, error: null },
    employerINN: { value: '', error: null },
    salary: { value: '', error: null },
    position: { value: Position.Worker, error: null },
    workExperienceTotal: { value: '', error: null },
    workExperienceCurrent: { value: '', error: null },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('setField', () => {
    it('должен установить значение поля gender', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'gender', value: Gender.Famale }));

      expect(state.gender.value).toBe(Gender.Famale);
    });

    it('должен установить значение поля maritalStatus', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'maritalStatus', value: MaritalStatus.Single }));

      expect(state.maritalStatus.value).toBe(MaritalStatus.Single);
    });

    it('должен установить значение поля dependentAmount', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'dependentAmount', value: 2 }));

      expect(state.dependentAmount.value).toBe(2);
    });

    it('должен установить значение поля passportIssueDate', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'passportIssueDate', value: '2020-01-01' }));

      expect(state.passportIssueDate.value).toBe('2020-01-01');
    });

    it('должен установить значение поля passportIssueBranch', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'passportIssueBranch', value: '123-456' }));

      expect(state.passportIssueBranch.value).toBe('123-456');
    });

    it('должен установить значение поля employmentStatus', () => {
      const state = scoringReducer(
        initialState,
        setField({ fieldName: 'employmentStatus', value: EmploymentStatus.Employed })
      );

      expect(state.employmentStatus.value).toBe(EmploymentStatus.Employed);
    });

    it('должен установить значение поля employerINN', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'employerINN', value: '1234567890' }));

      expect(state.employerINN.value).toBe('1234567890');
    });

    it('должен установить значение поля salary', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'salary', value: '50000' }));

      expect(state.salary.value).toBe('50000');
    });

    it('должен установить значение поля position', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'position', value: Position.TopManager }));

      expect(state.position.value).toBe(Position.TopManager);
    });

    it('должен установить значение поля workExperienceTotal', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'workExperienceTotal', value: '10' }));

      expect(state.workExperienceTotal.value).toBe('10');
    });

    it('должен установить значение поля workExperienceCurrent', () => {
      const state = scoringReducer(initialState, setField({ fieldName: 'workExperienceCurrent', value: '5' }));

      expect(state.workExperienceCurrent.value).toBe('5');
    });

    it('должен установить пустое значение поля', () => {
      const stateWithValue = {
        ...initialState,
        employerINN: { value: '1234567890', error: null },
      };

      const state = scoringReducer(stateWithValue, setField({ fieldName: 'employerINN', value: '' }));

      expect(state.employerINN.value).toBe('');
    });
  });

  describe('validateFields', () => {
    it('должен установить ошибки для пустых обязательных полей', () => {
      const state = scoringReducer(initialState, validateFields());

      expect(state.passportIssueDate.error).not.toBeNull();
      expect(state.passportIssueBranch.error).not.toBeNull();
      expect(state.employerINN.error).not.toBeNull();
    });

    it('должен сбросить ошибки для полей без валидации', () => {
      const stateWithErrors = {
        ...initialState,
        dependentAmount: { value: 0, error: 'ошибка' },
        salary: { value: '' as number | '', error: 'ошибка' },
        workExperienceTotal: { value: '' as number | '', error: 'ошибка' },
        workExperienceCurrent: { value: '' as number | '', error: 'ошибка' },
      };

      const state = scoringReducer(stateWithErrors, validateFields());

      expect(state.dependentAmount.error).toBe('');
      expect(state.salary.error).toBe('');
      expect(state.workExperienceTotal.error).toBe('');
      expect(state.workExperienceCurrent.error).toBe('');
    });

    it('должен не устанавливать ошибки для валидных полей', () => {
      const validState = {
        ...initialState,
        passportIssueDate: { value: '2020-01-01', error: null },
        passportIssueBranch: { value: '123-456', error: null },
        employerINN: { value: '123456789012', error: null },
      };

      const state = scoringReducer(validState, validateFields());

      expect(state.passportIssueDate.error).toBe('');
      expect(state.passportIssueBranch.error).toBe('');
      expect(state.employerINN.error).toBe('');
    });

    it('должен сбросить ошибку после исправления поля passportIssueDate', () => {
      let state = scoringReducer(initialState, validateFields());
      expect(state.passportIssueDate.error).not.toBeNull();

      state = scoringReducer(state, setField({ fieldName: 'passportIssueDate', value: '2020-01-01' }));

      state = scoringReducer(state, validateFields());
      expect(state.passportIssueDate.error).toBe('');
    });

    it('должен сбросить ошибку после исправления поля passportIssueBranch', () => {
      let state = scoringReducer(initialState, validateFields());
      expect(state.passportIssueBranch.error).not.toBeNull();

      state = scoringReducer(state, setField({ fieldName: 'passportIssueBranch', value: '123-456' }));

      state = scoringReducer(state, validateFields());
      expect(state.passportIssueBranch.error).toBe('');
    });

    it('должен сбросить ошибку после исправления поля employerINN', () => {
      let state = scoringReducer(initialState, validateFields());
      expect(state.employerINN.error).not.toBeNull();

      state = scoringReducer(state, setField({ fieldName: 'employerINN', value: '123456789043' }));

      state = scoringReducer(state, validateFields());
      expect(state.employerINN.error).toBe('');
    });
  });

  describe('resetState', () => {
    it('должен сбросить состояние к начальному', () => {
      const modifiedState = {
        ...initialState,
        status: Status.Ok,
        gender: { value: Gender.Famale, error: null },
        salary: { value: 100000, error: null },
      };

      const state = scoringReducer(modifiedState, resetState());

      expect(state.status).toBe(Status.Idle);
      expect(state.gender.value).toBe(Gender.Male);
      expect(state.salary.value).toBe('');
    });

    it('должен сбросить все поля формы', () => {
      const modifiedState = {
        ...initialState,
        passportIssueDate: { value: '2020-01-01', error: 'ошибка' },
        passportIssueBranch: { value: '123-456', error: 'ошибка' },
        employerINN: { value: '123456789012', error: null },
        salary: { value: 50000, error: null },
      };

      const state = scoringReducer(modifiedState, resetState());

      expect(state.passportIssueDate).toEqual({ value: '', error: null });
      expect(state.passportIssueBranch).toEqual({ value: '', error: null });
      expect(state.employerINN).toEqual({ value: '', error: null });
      expect(state.salary).toEqual({ value: '', error: null });
    });

    it('должен сбросить все ошибки', () => {
      const modifiedState = {
        ...initialState,
        passportIssueDate: { value: '', error: 'ошибка даты' },
        passportIssueBranch: { value: '', error: 'ошибка отделения' },
        employerINN: { value: '', error: 'ошибка ИНН' },
      };

      const state = scoringReducer(modifiedState, resetState());

      expect(state.passportIssueDate.error).toBeNull();
      expect(state.passportIssueBranch.error).toBeNull();
      expect(state.employerINN.error).toBeNull();
    });
  });
});
