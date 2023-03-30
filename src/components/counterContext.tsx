import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type CounterState = {
  counter: number;
  increase: () => void;
  decrease: () => void;
};

const CounterContext = createContext<CounterState | null>(null);

export const useCounterContext = () => useContext(CounterContext);

export const CounterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter((previousCounter) => previousCounter + 1);
  };

  const decrease = () => {
    setCounter((previousCounter) => previousCounter - 1);
  };

  return (
    <CounterContext.Provider value={{ counter, increase, decrease }}>
      {children}
    </CounterContext.Provider>
  );
};
