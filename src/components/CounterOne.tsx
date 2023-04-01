import React from "react";
import {
  useCounterContext,
  useCounterContextSubscription,
} from "./counterContext";
import { CounterGroup } from "../types";

export const CounterOne: React.FC = () => {
  const { increase, decrease } = useCounterContext() ?? {};

  const counter = useCounterContextSubscription(
    ({ counterOne }: CounterGroup) => counterOne
  );

  console.log("Counter one rendered!");

  return (
    <div className="Counter">
      <h1>{counter}</h1>
      <p>
        This is counter <strong>one</strong>!
      </p>
      <button onClick={increase?.counterOne}>+1</button>
      <button onClick={decrease?.counterOne}>-1</button>
    </div>
  );
};
