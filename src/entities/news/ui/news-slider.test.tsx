import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewsSlider } from '@/entities/news/ui/news-slider';
import type { News } from '@/entities/news/model/types';
import type { ButtonHTMLAttributes } from 'react';

vi.mock('neobank-ui-kit', () => ({
  Button: ({ children, disabled, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  ),
  LoadingIcon: () => <div data-testid="loading-icon">Loading...</div>,
  ArrowIcon: ({ direction }: { direction: string }) => <span>{direction}</span>,
}));

vi.mock('@/entities/news', () => ({
  NewsView: ({ title }: { title: string }) => <div data-testid="news-item">{title}</div>,
}));

vi.mock('@/entities/news/config', () => ({
  newsConfig: {
    style: {
      newsViewWidth: 300,
      sliderGap: 20,
    },
    sliderScrollIncrementalOffset: 10,
  },
}));

const mockNews: News[] = [
  {
    source: { id: '1', name: 'Source 1' },
    author: 'Author 1',
    title: 'News Title 1',
    description: 'Description 1',
    url: 'https://example.com/1',
    urlToImage: 'https://example.com/image1.jpg',
    publishedAt: '2024-01-01',
    content: 'Content 1',
  },
  {
    source: { id: '2', name: 'Source 2' },
    author: 'Author 2',
    title: 'News Title 2',
    description: 'Description 2',
    url: 'https://example.com/2',
    urlToImage: 'https://example.com/image2.jpg',
    publishedAt: '2024-01-02',
    content: 'Content 2',
  },
];

beforeEach(() => {
  const originalScrollTo = window.HTMLElement.prototype.scrollTo;

  window.HTMLElement.prototype.scrollTo = vi.fn();

  return () => {
    window.HTMLElement.prototype.scrollTo = originalScrollTo;
  };
});

describe('NewsSlider', () => {
  it('должен отображать список новостей когда status === "ok"', () => {
    render(<NewsSlider news={mockNews} status="ok" />);

    const newsItems = screen.getAllByTestId('news-item');

    expect(newsItems).toHaveLength(2);
    expect(screen.getByText('News Title 1')).toBeInTheDocument();
    expect(screen.getByText('News Title 2')).toBeInTheDocument();
  });

  it('должен отображать LoadingIcon когда status !== "ok"', () => {
    render(<NewsSlider news={[]} status="loading" />);

    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('news-item')).not.toBeInTheDocument();
  });

  it('левая кнопка должна быть отключена в начальной позиции', () => {
    render(<NewsSlider news={mockNews} status="ok" />);

    const buttons = screen.getAllByRole('button');
    const leftButton = buttons[0];

    expect(leftButton).toBeDisabled();
    expect(leftButton).toHaveTextContent('left');
  });
});
