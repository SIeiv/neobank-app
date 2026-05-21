import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NewsView } from '@/entities/news/ui/news';

vi.mock('neobank-ui-kit', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Paragraph: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
}));

const defaultProps = {
  source: { id: '1', name: 'Test Source' },
  author: 'Test Author',
  title: 'Test News Title',
  description: 'Test description',
  url: 'https://example.com/news',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2024-01-01',
  content: 'Test content [+100 chars]',
};

describe('NewsView', () => {
  it('должен рендерить ссылку с корректным href и атрибутами безопасности', () => {
    render(<NewsView {...defaultProps} />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', 'https://example.com/news');
    expect(link).toHaveAttribute('target', '_top');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('должен отображать заголовок и очищенный контент', () => {
    render(<NewsView {...defaultProps} />);

    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('не должен рендерить параграф с контентом если content отсутствует', () => {
    render(<NewsView {...defaultProps} content="" />);

    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });
});
