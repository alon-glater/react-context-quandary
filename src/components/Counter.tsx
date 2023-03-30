import React from "react";
import { useCounterContext } from "./counterContext";

export const Counter: React.FC = () => {
  const { counter, increase, decrease } = useCounterContext() ?? {};

  console.log("Counter rendered!");

  return (
    <div className="Counter">
      <h1>{counter}</h1>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
};
