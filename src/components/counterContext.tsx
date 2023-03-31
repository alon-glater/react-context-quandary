import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

type CounterUpdater = (counter: number) => void;

type CounterState = {
  subscribe: (callback: CounterUpdater) => void;
  increase: () => void;
  decrease: () => void;
};

const CounterContext = createContext<CounterState | null>(null);

export const useCounterContext = () => useContext(CounterContext);

export const CounterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const subscriberCallbacks = useRef<Array<(counter: number) => void>>([]);
  const counter = useRef(0);

  const publish = (counter: number) => {
    subscriberCallbacks.current.forEach((callback) => {
      callback(counter);
    });
  };

  const increase = () => {
    counter.current++;

    publish(counter.current);
  };

  const decrease = () => {
    counter.current--;

    publish(counter.current);
  };

  const addSubscriber = (callback: CounterUpdater) => {
    subscriberCallbacks.current = [...subscriberCallbacks.current, callback];
  };

  return (
    <CounterContext.Provider
      value={{ subscribe: addSubscriber, increase, decrease }}
    >
      {children}
    </CounterContext.Provider>
  );
};
