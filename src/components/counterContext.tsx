import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import type { CounterGroupUpdater, CounterGroup } from "../types";

type CounterState = {
  subscribe: (callback: CounterGroupUpdater) => void;
  increase: { counterOne: () => void; counterTwo: () => void };
  decrease: { counterOne: () => void; counterTwo: () => void };
};

const CounterContext = createContext<CounterState | null>(null);

export const useCounterContext = () => useContext(CounterContext);

export const useCounterContextSubscription = <T,>(
  selector: (counterGroup: CounterGroup) => T
): T | undefined => {
  const [state, setState] = useState<T | undefined>();
  const { subscribe } = useCounterContext() ?? {};

  const callback = (counterGroup: CounterGroup) => {
    setState(selector(counterGroup));
  };

  useEffect(() => {
    return subscribe?.(callback); // Returns the unsub function.
  }, [subscribe, callback]);

  return state;
};

export const CounterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const subscriberCallbacks = useRef<Set<CounterGroupUpdater>>(new Set());
  const counterGroup = useRef<CounterGroup>({
    counterOne: 0,
    counterTwo: 0,
  });

  const publish = (counterGroup: CounterGroup) => {
    subscriberCallbacks.current.forEach((callback) => {
      callback(counterGroup);
    });
  };

  const increaseCounterOne = () => {
    counterGroup.current = {
      ...counterGroup.current,
      counterOne: counterGroup.current.counterOne + 1,
    };

    publish(counterGroup.current);
  };

  const increaseCounterTwo = () => {
    counterGroup.current = {
      ...counterGroup.current,
      counterTwo: counterGroup.current.counterTwo + 1,
    };

    publish(counterGroup.current);
  };

  const decreaseCounterOne = () => {
    counterGroup.current = {
      ...counterGroup.current,
      counterOne: counterGroup.current.counterOne - 1,
    };

    publish(counterGroup.current);
  };

  const decreaseCounterTwo = () => {
    counterGroup.current = {
      ...counterGroup.current,
      counterTwo: counterGroup.current.counterTwo - 1,
    };

    publish(counterGroup.current);
  };

  const increase = {
    counterOne: increaseCounterOne,
    counterTwo: increaseCounterTwo,
  };

  const decrease = {
    counterOne: decreaseCounterOne,
    counterTwo: decreaseCounterTwo,
  };

  const addSubscriber = (callback: CounterGroupUpdater) => {
    subscriberCallbacks.current.add(callback);

    callback(counterGroup.current); // Publish the latest state to the new sub.

    return () => removeSubscriber(callback);
  };

  const removeSubscriber = (callback: CounterGroupUpdater) => {
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
