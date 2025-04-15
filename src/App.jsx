import QuoteDisplay from "./components/QuoteDisplay";
import "./App.css";
import { useEffect } from "react";

function App() {
  // set browser tab title
  useEffect(() => {
    document.title = "Breaking Bad Quotes";
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Breaking Bad Quotes</h1>
      </header>
      <main>
        <QuoteDisplay />
      </main>
    </div>
  );
}

export default App;
