import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HealthCheck from './HealthCheck';

describe('HealthCheck Component', () => {
  it('renders the health check page with correct content', () => {
    render(<HealthCheck />);

    // Check if the main heading is present
    expect(screen.getByText('Health Check')).toBeInTheDocument();

    // Check if the status message is present
    expect(screen.getByText('Status: OK')).toBeInTheDocument();

    // Check if the timestamp is present and in ISO format
    const timestampElement = screen.getByText(/Timestamp:/);
    expect(timestampElement).toBeInTheDocument();

    // Verify the timestamp is in ISO format
    const timestampText = timestampElement.textContent;
    const timestamp = timestampText.split('Timestamp: ')[1];
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });
});
