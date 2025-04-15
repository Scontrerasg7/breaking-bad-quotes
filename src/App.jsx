import QuoteDisplay from "./components/QuoteDisplay";
import "./App.css";

function App() {
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
