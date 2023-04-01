import React from "react";
import { CounterProvider } from "./components/counterContext";
import { CounterOne } from "./components/CounterOne";
import { CounterTwo } from "./components/CounterTwo";
import { RenderCounter } from "./components/RenderCounter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <CounterOne />
        <CounterTwo />
        <RenderCounter />
      </CounterProvider>
    </div>
  );
}

export default App;
