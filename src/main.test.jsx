import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// Mock react-dom/client
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('Main', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();

    // Setup document body
    document.body.innerHTML = '';
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Clear module cache
    vi.resetModules();
  });

  it('renders app into root element', async () => {
    // Import main (this will execute the script)
    await import('./main');

    // Verify createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));

    // Verify render was called
    const mockRoot = createRoot.mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledTimes(1);

    // Get the rendered JSX from the render call
    const renderedJSX = mockRoot.render.mock.calls[0][0];

    // Verify it's a StrictMode component with App as child
    expect(renderedJSX.type).toBe(StrictMode);
    expect(renderedJSX.props.children.type.name).toBe('App');
  });

  it('logs error if root element is not found', async () => {
    // Mock console.error before importing the module
    const consoleSpy = vi.spyOn(console, 'error');

    // Remove root element
    document.getElementById('root').remove();

    // Import main
    await import('./main');

    // Verify error was logged with correct message
    expect(consoleSpy).toHaveBeenCalledWith(
      'Root element not found! Make sure there is a div with id "root" in your HTML.'
    );

    // Restore console.error
    consoleSpy.mockRestore();
  });
});
