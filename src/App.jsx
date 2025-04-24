import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuoteDisplay from './components/QuoteDisplay';
import HealthCheck from './components/HealthCheck';
import './App.css';
import { useEffect } from 'react';

function App() {
  // set browser tab title
  useEffect(() => {
    document.title = 'Breaking Bad Quotes';
  }, []);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Breaking Bad Quotes</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<QuoteDisplay />} />
            <Route path="/health" element={<HealthCheck />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
