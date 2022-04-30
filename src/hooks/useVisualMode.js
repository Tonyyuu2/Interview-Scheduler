import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  //function that either replaces the current state with a new state or adds the new state on top of the previous state
  const transition = (newMode, replace = false) => {
    setHistory((prev) =>
      replace
        ? [...prev.slice(0, prev.length - 1), newMode]
        : [...prev, newMode]
    ); //gets rid of last element in array then runs line 15
  };
  //function that goes back to the previous state
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        return prev.slice(0, prev.length - 1);
      });
    }
  };

  return { transition, mode: history[history.length - 1], back };
}
