import React from "react";
import { CounterProvider } from "./components/counterContext";
import { Counter } from "./components/Counter";
import { RenderCounter } from "./components/RenderCounter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <Counter />
        <RenderCounter />
      </CounterProvider>
    </div>
  );
}

export default App;
