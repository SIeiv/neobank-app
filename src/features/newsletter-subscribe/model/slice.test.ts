// newsletterSubscribeSlice.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { newsletterSubscribeReducer, setEmail } from '@/features/newsletter-subscribe';
import { subscribe } from '@/features/newsletter-subscribe/api';
import { Status } from '@/shared/types';

describe('newsletterSubscribeSlice', () => {
  const initialState = {
    status: Status.Idle,
    email: '',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('должен установить email в состояние', () => {
    const email = 'test@example.com';
    const state = newsletterSubscribeReducer(initialState, setEmail(email));

    expect(state.email).toBe(email);
  });

  it('должен установить статус Loading при начале подписки', () => {
    const state = newsletterSubscribeReducer(initialState, { type: subscribe.pending.type });

    expect(state.status).toBe(Status.Loading);
  });

  it('должен установить статус Ok и сохранить в localStorage при успешной подписке', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const state = newsletterSubscribeReducer(
      { ...initialState, status: Status.Loading },
      { type: subscribe.fulfilled.type }
    );

    expect(state.status).toBe(Status.Ok);
    expect(setItemSpy).toHaveBeenCalledWith('newsletterSubscribe', 'true');
  });

  it('должен установить статус Error при ошибке подписки', () => {
    const state = newsletterSubscribeReducer(
      { ...initialState, status: Status.Loading },
      { type: subscribe.rejected.type }
    );

    expect(state.status).toBe(Status.Error);
  });
});
