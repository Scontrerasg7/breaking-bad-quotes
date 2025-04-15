import { useState, useEffect } from 'react';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.breakingbadquotes.xyz/v1/quotes'
      );
      const data = await response.json();
      setQuote(data[0]);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch quote: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="quote-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {quote && !loading && (
        <div className="quote-card">
          <blockquote>
            <p>"{quote.quote}"</p>
          </blockquote>
          <footer>
            <p>— {quote.author}</p>
          </footer>
          <button onClick={fetchRandomQuote}>Get Another Quote</button>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
