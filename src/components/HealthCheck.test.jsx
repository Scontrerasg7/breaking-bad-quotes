import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HealthCheck from './HealthCheck';

describe('HealthCheck Component', () => {
  it('renders nothing', () => {
    const { container } = render(<HealthCheck />);
    expect(container.firstChild).toBeNull();
  });
});
