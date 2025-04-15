import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the QuoteDisplay component since we've already tested it separately
vi.mock('./components/QuoteDisplay', () => ({
  default: () => <div data-testid="mock-quote-display">Mock Quote Display</div>,
}));

describe('App Component', () => {
  it('renders the header with correct title', () => {
    render(<App />);
    expect(screen.getByText('Breaking Bad Quotes')).toBeInTheDocument();
  });

  it('renders the QuoteDisplay component', () => {
    render(<App />);
    expect(screen.getByTestId('mock-quote-display')).toBeInTheDocument();
  });

  it('has correct structure with header and main elements', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // tests header
    expect(screen.getByRole('main')).toBeInTheDocument(); // tests main
  });
});
