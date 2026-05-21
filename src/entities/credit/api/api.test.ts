import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { sendCreditInfo } from '@/entities/credit/api';
import { apiConfig } from '@/shared/config';
import { ApplicationStage } from '@/shared/types';
import type { SetCreditInfoRequest } from '@/entities/credit/api/types';

vi.mock('axios');

describe('sendCreditInfo async thunk', () => {
  const mockParams: SetCreditInfoRequest = {
    applicationId: 12345,
    isInsuranceEnabled: true,
    isSalaryClient: false,
    monthlyPayment: 2000,
    rate: 1000,
    requestedAmount: 200000,
    term: 12,
    totalAmount: 123,
  };

  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('должен отправить POST запрос с корректными параметрами', async () => {
    const mockResponse = {
      status: 200,
      data: {},
    };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    await sendCreditInfo(mockParams)(mockDispatch, mockGetState, undefined);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(apiConfig.main.baseUrl + apiConfig.main.endpoints.credit, mockParams);
  });

  it('должен сохранить applicationStage и applicationId в localStorage при успешном ответе', async () => {
    const mockResponse = {
      status: 200,
      data: {},
    };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    await sendCreditInfo(mockParams)(mockDispatch, mockGetState, undefined);

    expect(localStorage.getItem('applicationStage')).toBe(ApplicationStage.Sent);
    expect(localStorage.getItem('applicationId')).toBe(mockParams.applicationId.toString());
  });

  it('не должен сохранять данные в localStorage при статусе !== 200', async () => {
    const mockResponse = {
      status: 400,
      data: { error: 'Bad Request' },
    };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    await sendCreditInfo(mockParams)(mockDispatch, mockGetState, undefined);

    expect(localStorage.getItem('applicationStage')).toBeNull();
    expect(localStorage.getItem('applicationId')).toBeNull();
  });

  it('должен корректно преобразовать applicationId в строку', async () => {
    const paramsWithNumberId: SetCreditInfoRequest = {
      ...mockParams,
      applicationId: 99999,
    };
    const mockResponse = {
      status: 200,
      data: {},
    };
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    await sendCreditInfo(paramsWithNumberId)(mockDispatch, mockGetState, undefined);

    expect(localStorage.getItem('applicationId')).toBe('99999');
    expect(typeof localStorage.getItem('applicationId')).toBe('string');
  });
});
