import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuoteDisplay from "./QuoteDisplay";

// Mock the fetch function
const mockFetch = vi.fn();

// Setup global fetch mock
window.fetch = mockFetch;

describe("QuoteDisplay Component", () => {
  const mockQuote = {
    quote: "I am the one who knocks!",
    author: "Walter White",
  };

  beforeEach(() => {
    // Reset mocks before each test
    mockFetch.mockReset();
  });

  it("renders loading state initially", () => {
    // Setup fetch to never resolve (to keep loading state)
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<QuoteDisplay />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays a quote when fetch is successful", async () => {
    // Setup fetch to return a successful response
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve([mockQuote]),
    });

    render(<QuoteDisplay />);

    // Wait for the quote to be displayed
    await waitFor(() => {
      expect(screen.getByText(`"${mockQuote.quote}"`)).toBeInTheDocument();
      expect(screen.getByText(`— ${mockQuote.author}`)).toBeInTheDocument();
    });

    // Verify the button is present
    expect(screen.getByText("Get Another Quote")).toBeInTheDocument();
  });

  it("displays error message when fetch fails", async () => {
    // Setup fetch to return a failed response
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<QuoteDisplay />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch quote/)).toBeInTheDocument();
    });
  });

  it("fetches a new quote when button is clicked", async () => {
    // Setup initial fetch
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve([mockQuote]),
    });

    render(<QuoteDisplay />);

    // Wait for the initial quote to be displayed
    await waitFor(() => {
      expect(screen.getByText(`"${mockQuote.quote}"`)).toBeInTheDocument();
    });

    // Setup second fetch with a different quote
    const newQuote = {
      quote: "Yeah, science!",
      author: "Jesse Pinkman",
    };

    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve([newQuote]),
    });

    // Click the button to fetch a new quote
    fireEvent.click(screen.getByText("Get Another Quote"));

    // Wait for the new quote to be displayed
    await waitFor(() => {
      expect(screen.getByText(`"${newQuote.quote}"`)).toBeInTheDocument();
      expect(screen.getByText(`— ${newQuote.author}`)).toBeInTheDocument();
    });

    // Verify fetch was called twice (initial load + button click)
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
