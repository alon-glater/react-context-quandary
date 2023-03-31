import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useEffect,
} from "react";
import type { CounterUpdater } from "../types";

type CounterState = {
  subscribe: (callback: CounterUpdater) => void;
  increase: () => void;
  decrease: () => void;
};

const CounterContext = createContext<CounterState | null>(null);

export const useCounterContext = () => useContext(CounterContext);

export const useCounterContextSubscription = (callback: CounterUpdater) => {
  const { subscribe } = useCounterContext() ?? {};

  useEffect(() => {
    return subscribe?.(callback); // Returns the unsub function.
  }, [subscribe, callback]);
};

export const CounterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const subscriberCallbacks = useRef<Set<(counter: number) => void>>(new Set());
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
    subscriberCallbacks.current.add(callback);

    return () => removeSubscriber(callback);
  };

  const removeSubscriber = (callback: CounterUpdater) => {
    subscriberCallbacks.current.delete(callback);
  };

  return (
    <CounterContext.Provider
      value={{
        subscribe: addSubscriber,
        increase,
        decrease,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
