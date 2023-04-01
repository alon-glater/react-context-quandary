import React from "react";
import {
  useCounterContext,
  useCounterContextSubscription,
} from "./counterContext";
import { CounterGroup } from "../types";

export const CounterTwo: React.FC = () => {
  const { increase, decrease } = useCounterContext() ?? {};

  const counter = useCounterContextSubscription(
    ({ counterTwo }: CounterGroup) => counterTwo * 2
  );

  console.log("Counter two rendered!");

  return (
    <div className="Counter">
      <h1>{counter}</h1>
      <p>
        This is counter <strong>two</strong>!
      </p>
      <button onClick={increase?.counterTwo}>+1</button>
      <button onClick={decrease?.counterTwo}>-1</button>
    </div>
  );
};
