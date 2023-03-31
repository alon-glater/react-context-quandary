import React, { useState } from "react";
import {
  useCounterContext,
  useCounterContextSubscription,
} from "./counterContext";

export const Counter: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const { increase, decrease } = useCounterContext() ?? {};

  useCounterContextSubscription(setCounter);

  console.log("Counter rendered!");

  return (
    <div className="Counter">
      <h1>{counter}</h1>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
};
