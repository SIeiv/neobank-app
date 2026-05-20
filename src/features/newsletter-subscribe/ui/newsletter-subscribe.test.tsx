// NewsletterSubscribe.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NewsletterSubscribe } from '@/features/newsletter-subscribe/ui/newsletter-subscribe';
import { newsletterSubscribeReducer } from '@/features/newsletter-subscribe/model/slice';
import { Status } from '@/shared/types';
import { useAppDispatch, useAppSelector, useScreenMode } from '@/shared/lib/hooks';
import type { RootState } from '@/shared/store';
import type { ComponentProps } from 'react';
import type { Button, EmailIcon, LoadingIcon, Paragraph, SendIcon } from 'neobank-ui-kit';

vi.mock('@/shared/lib/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()) as unknown as typeof useAppDispatch,
  useAppSelector: vi.fn((selector: Parameters<typeof useAppSelector>[0]) =>
    selector({
      newsletterSubscribe: { email: '', status: Status.Idle },
    } as RootState)
  ) as unknown as typeof useAppSelector,
  useScreenMode: vi.fn(() => 'desktop') as unknown as typeof useScreenMode,
}));

vi.mock('neobank-ui-kit', () => ({
  Button: ({ children, onClick }: ComponentProps<typeof Button>) => <button onClick={onClick}>{children}</button>,
  EmailIcon: (_props: ComponentProps<typeof EmailIcon>) => <div data-testid="email-icon" />,
  LoadingIcon: (_props: ComponentProps<typeof LoadingIcon>) => <div data-testid="loading-icon" />,
  SendIcon: (_props: ComponentProps<typeof SendIcon>) => <div data-testid="send-icon" />,
  Paragraph: ({ children }: ComponentProps<typeof Paragraph>) => <p>{children}</p>,
}));

const createStore = (status: Status = Status.Idle, email = '') =>
  configureStore({
    reducer: { newsletterSubscribe: newsletterSubscribeReducer },
    preloadedState: { newsletterSubscribe: { status, email } },
  });

const renderComponent = (status: Status = Status.Idle) => {
  const store = createStore(status);
  const dispatch = vi.fn();

  vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  vi.mocked(useAppSelector).mockReturnValue({ email: 'test@example.com', status });
  render(
    <Provider store={store}>
      <NewsletterSubscribe placeholder="Введите email" />
    </Provider>
  );

  return { dispatch };
};

describe('NewsletterSubscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('должен показать иконку загрузки при статусе Loading', () => {
    renderComponent(Status.Loading);

    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Введите email')).not.toBeInTheDocument();
  });

  it('должен показать сообщение об успешной подписке если пользователь уже подписан', () => {
    localStorage.setItem('newsletterSubscribe', 'true');

    renderComponent(Status.Idle);

    expect(screen.getByText("You are already subscribed to the bank's newsletter")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Введите email')).not.toBeInTheDocument();
  });

  it('должен вызвать dispatch при нажатии на кнопку Subscribe', () => {
    const { dispatch } = renderComponent(Status.Idle);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
