export type CounterUpdater = (counter: number) => void;

export type CounterGroupUpdater = (counterGroup: CounterGroup) => void;

export type CounterGroup = {
  counterOne: number;
  counterTwo: number;
};
